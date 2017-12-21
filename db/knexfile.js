const {db} = require('../config/config');

module.exports = {
    dev: {
        client: 'mysql',
        connection: {
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database,
            charset: 'utf8'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database,
            charset: 'utf8'
        }
    }
};
