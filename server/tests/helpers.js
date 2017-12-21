const request = require('supertest');


const repoMock = {
    getUserByAuth: () => Promise.resolve(),
    getUserById: () => Promise.resolve(),
    getRoleByName: () => Promise.resolve()
};


const createMockedRepo = (...methods) => {
    methods.forEach(([method, returnValue]) => {
        repoMock[method] = () => Promise.resolve(returnValue);
    });

    return repoMock;
};

const createAuthenticatedRequest = (server, done) => {
    const authenticatedRequest = request.agent(server);

    authenticatedRequest
        .post('/api/login')
        .send({username: 'foo', password: 'bar'})
        .end(function(error) {
            if (error) {
                throw error;
            }
            done(authenticatedRequest);
        });
};

module.exports = {
    createMockedRepo,
    createAuthenticatedRequest
};
