const request = require('supertest');
const createServer = require('../../server');
const {createMockedRepo, createAuthenticatedRequest} = require('../helpers');


describe('/api/users', () => {
    let server, methods = [];

    it('200 on get user by id', (done) => {
        methods.push(['getUserByAuth', {foo: 'bar', id: 6}]);
        methods.push(['getUserById', {foo: 'bar', id: 6}]);

        createServer(createMockedRepo(...methods))
            .then(({server: appServer}) => {
                server = appServer;

                createAuthenticatedRequest(server, (req) => {
                    req.get('/api/users/6')
                        .expect(200, {
                            user: {foo: 'bar', id: 6}
                        }, done);
                });
            });
    });

    it('404 when user doesn\'t exist', (done) => {
        methods.push(['getUserByAuth', {foo: 'bar', id: 6}]);
        methods.push(['getUserById', null]);

        createServer(createMockedRepo(...methods))
            .then(({server: appServer}) => {
                server = appServer;

                createAuthenticatedRequest(server, (req) => {
                    req.get('/api/users/6')
                        .expect(404, done);
                });
            });
    });

    it('403 when user not allowed', (done) => {
        methods.push(['getUserById', {foo: 'bar'}]);

        createServer(createMockedRepo(...methods))
            .then(({server: appServer}) => {
                server = appServer;

                request(server)
                    .get('/api/users/6')
                    .expect(403, done);
            });
    });

    afterEach(function (done) {
        server.close(done);
    });
});
