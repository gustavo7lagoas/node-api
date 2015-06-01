
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
    describe('Creates superheroes', function() {
        beforeEach(function(done) {
            Superhero.remove().exec(function(res) { done(); });
        });
        it('create one superheroes', function(done) {
            request
                .post('/api/superheroes')
                .set('Accept', 'application/x-www-form-urlencoded')
                .send({
                    'name' : 'batman',
                    'power' : 'money',
                    'age' : 25
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) throw err;
                    res.body.should.be.deep.equal( { message : 'Superhero created!'} );
                    done();
                });
        });
    });
    describe('Get specific superhero', function() {
        beforeEach(function(done) {
            Superhero.remove().exec(function(res) { done(); });
        });
        it('get a specific superhero', function(done) {
            factory.create('superhero', function(err, superhero) {
                var superhero_id = superhero.id;
                request
                    .get('/api/superheroes/' + superhero_id)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) throw err;
                        res.body.name.should.be.equal(superhero.name);
                        done();
                    });
            });
        });
    });
    describe('Updates a specific superhero', function() {
        beforeEach(function(done) {
            Superhero.remove().exec(function(res) { done(); });
        });
        it('updates', function(done) {
            factory.create('superhero', function(err, superhero) {
                var updatedSuperHero = superhero;
                updatedSuperHero.name = 'batman';
                request
                    .put('/api/superheroes/' + superhero.id)
                    .set('Accept', 'application/x-www-form-urlencoded')
                    .send(updatedSuperHero)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.be.deep.equal({ message: 'Superhero updated!' });
                        done();
                    });
            });
        });
    });
    describe('Deletes a superhero', function() {
        beforeEach(function(done) {
            Superhero.remove().exec(function(res) { done(); });
        });
        it('deletes', function(done) {
            factory.create('superhero', function(err, superhero) {
                request
                    .delete('/api/superheroes/' + superhero.id)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.be.deep.equal({ message: 'Successfully deleted' });
                        done();
                    });
            });
        });
    });
});


