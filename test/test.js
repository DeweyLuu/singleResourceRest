process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var Hero = require('../models/heromodels');

chai.use(chaihttp);

describe('hero api', function() {

	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('should create new hero', function(done) {
		chai.request('localhost:3000')
			.post('/api/heros')
			.send({'name': 'batman'})
			.end(function(err, res) {
				expect(err).to.equal(null);
				expect(res.body.name).to.equal('batman');
				done();
			});
	});

	it('should get array of heros', function(done){
		chai.request('localhost:3000')
			.get('/api/heros')
			.end(function(err, res) {
				expect(err).to.equal(null);
				expect(typeof res.body).to.equal('object');
				expect(Array.isArray(res.body)).to.equal(true);
				done();
			});
	});

	it('should update a hero', function(done) {
		var test = new Hero({'name': 'test'});
		var id = this.test._id;
		chai.request('localhost:3000')
			.put('api/heros/' + id)
			.send({'name': 'test hero'})
			.end(function(err, res) {
				expect(err).to.equal(null);
				expect(res.body.msg).to.equal('pass');
				done();
			});
	});

	it('should delete a hero', function(done) {
		var test = new Hero({'name': 'test'});
		chai.request('localhost:3000')
			.del('/api/heros/' + this.test._id)
			.end(function(err, res) {
				expect(err).to.equal(null);
				expect(res.body.msg).to.equal('pass');
				done();
			})
	})

});
