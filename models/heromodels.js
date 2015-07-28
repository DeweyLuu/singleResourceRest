
var mongoose = require('mongoose');

var heroSchema = mongoose.Schema({
	name: String,
	weapon: String,
	strength: Number
});

module.exports = mongoose.model('Hero', heroSchema);
