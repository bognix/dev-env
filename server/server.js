const express = require('express');
const { server: serverConfig, redis: redisConfig } = require('../config/config');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');
const getApiRouter = require('./api');
const redis = require('redis');
const client = redis.createClient();
const RedisStore = require('connect-redis')(session);
const compression = require('compression');
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(session({
    store: new RedisStore({
        client, host: redisConfig.host, port: redisConfig.port, ttl: redisConfig.ttl
    }),
    secret: serverConfig.sessionSecret,
    resave: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
app.use(compression({ threshold: 0 }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

const createServer = (repo) => {
    return new Promise((resolve) => {
        passport.deserializeUser(function (id, done) {
            repo.getUserById(id)
                .then((user) => done(null, user))
                .catch((err) => done(err, {}));
        });

        passport.use(new LocalStrategy(
            (username, password, done) => {
                repo.getUserByAuth({ username, password })
                    .then((user) => {
                        if (user) return done(null, user);
                        return done(null, false, {
                            message: 'Incorrect username or password'
                        });
                    })
                    .catch(done);
            }
        ));

        app.use('/assets/', express.static('dist'));
        app.use('/api', getApiRouter(passport, repo));
        app.all(['/login', '/app/*', '/app', '/logout'], (req, res) => {
            res.sendFile('app.html', { root: path.join(__dirname, '..', 'dist') });
        });
        app.all('/', (req, res) => {
            res.redirect('/app');
        });
        app.all('/*', (req, res) => {
            res.sendStatus(404);
        });


        const server = app.listen(serverConfig.port, () => resolve({
            app, server
        }));
    });
};

module.exports = createServer;
