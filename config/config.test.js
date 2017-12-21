module.exports = {
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'voyager',
        password: process.env.DB_PASSWORD || 'qybKUJ1jZ9y7',
        database: process.env.DB_DATABASE ||'trip_planner'
    },
    server: {
        port: process.env.SERVER_PORT || 9999,
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
