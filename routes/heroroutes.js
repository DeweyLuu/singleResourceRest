
var express = require('express');
var bodyParser = require('body-parser');

var Hero = require('../models/heromodels');

module.exports = function(router) {
	router.use(bodyParser.json());

	router.get('/heros', function(req, res) {
		Hero.find({}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}
			res.json(data);
		});
	});

	router.get('/heros/:hero', function(req, res) {
		console.log(typeof req.params.hero);
		/*
		Hero.find({}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}
			res.json(data);
		});
		*/
	});

	router.post('/heros', function(req, res) {
		var newHero = new Hero(req.body);
		newHero.save(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}
			res.json(data);
		});
	});

	router.put('/heros/:id', function(req, res) {
		var newHero = req.body;
		Hero.update({'_id': req.params.id}, newHero, function(err,data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}
			res.json({msg: 'edited son!'});
		});
	});

	router.delete('/heros/:id', function(req, res) {
		Hero.remove({'_id': req.params.id}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}
			res.json({msg: 'deleted son!'});
		})
	})
};
