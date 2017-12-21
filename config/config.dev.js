module.exports = {
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'secret',
        database: process.env.DB_DATABASE ||'devdb'
    },
    server: {
        port: process.env.SERVER_PORT || 5555,
        host: process.env.SERVER_HOST || '127.0.0.1',
        sessionSecret: 'speak no evil'
    },
    redis: {
        port: process.env.REDIS_PORT || 6379,
        ttl: 60 * 60 * 24, // one day
        host: 'localhost'
    },
    env: 'development'
};
