
var should = require('chai').should();
var api = require ('../server');
var request = require('supertest')(api);
var Superhero = require('../app/models/superhero');
var factory = require('./services/superheroFactory.js');

describe('Superhero API',function() {
    describe('First Test', function() {
        it('Works', function(done) {
            request
                .get('/api')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({'message': "hooray! welcome to our api!"}, done);
        });
    });
    describe('List superheroes', function() {
        beforeEach(function(done) {
            Superhero.remove().exec(function(res){ done(); });
        });
        it('empty list', function(done) {
            request
                .get('/api/superheroes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({}, done);
        });
        it('list all registered superheroes', function(done) {
            factory.createMany('superhero', 5, function(err, superheroes) {
                request
                    .get('/api/superheroes')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if(err) throw err;
                        res.body.should.have.length(5);
                        done();
                    });
            });
        });
    });
});


