const db = require('./db');
const { server: serverConfig, env } = require('../config/config');
const winston = require('winston');
const createServer = require('./server');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (env !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

db.connect()
    .then((repo) => {
        logger.info("Connected to DB. Starting server...");

        return createServer(repo);
    }).then(({app}) => {
        const errorHandler = (err, req, res) => {
            logger.error(err);
            res.sendStatus(500);
        };
        app.use(errorHandler);

        logger.info("Server started successfully, running on port " + serverConfig.port + ".");

        app.on('close', () => {
            db.disconnect();
        });
    });
