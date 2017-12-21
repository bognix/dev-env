const request = require('supertest');
const createServer = require('../server');

describe('server', () => {
    let server;

    beforeEach(function (done) {
        createServer().then(({server: appServer}) => {
            server = appServer;
            done();
        });
    });

    afterEach(function (done) {
        server.close(done);
    });

    it('responds to /', (done) => {
        request(server)
            .get('/')
            .expect(302, done);
    });

    it('404 everything else', (done) => {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});
