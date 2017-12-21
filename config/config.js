const env = process.env.NODE_ENV;
let config = {};

switch (env) {
case 'production':
    config = require('./config.production');
    break;
case 'test':
    config = require('./config.test');
    break;
case 'dev':
default:
    config = require('./config.dev');
    break;
}

module.exports = config;
