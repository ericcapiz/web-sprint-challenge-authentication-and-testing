const request = require('supertest')

const db = require('../data/dbConfig');
const server = require('./server');

describe('end point tests', function() {
    describe('POST /register and POST /login', function() {
        beforeAll(async() => {
                await db('users').truncate();
            });
            //test1
        test('POST /auth/register - should return status 201', function() {
                return request(server)
                    .post('/api/auth/register')
                    .send({ username: "test", password: "testing123" })
                    .then(res => {
                        expect(res.status).toBe(201);
                    });
            });
            //test2
        test(' POST /auth/register - res.type should match json', function() {
                return request(server)
                    .post('/api/auth/register')
                    .send({ username: "testagain", password: "testagain123" })
                    .then(res => {
                        expect(res.type).toMatch(/json/i);
                    });
            });
            //test3
        test('POST /auth/login - should return status 200', function() {
                return request(server).post('/api/auth/login').send({ username: 'test1', password: 'password' }).then(res => {
                    expect(res.status).toBe(200);
                });
            });
            //test4
        test(' POST /auth/login - res.type should match json"', function() {
                return request(server)
                    .post('/api/auth/login')
                    .send({ username: "tesoncemore", password: "testagain123" })
                    .then(res => {
                        expect(res.type).toMatch(/json/i);
                    });
            });
    });
});