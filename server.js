//scotch.io
//adrianmejia

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var router = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/herolist');

//console.log(process.env);

require('./routes/heroroutes')(router);
app.use('/api', router);

app.listen(3000, function() {
	console.log('server started');
});
