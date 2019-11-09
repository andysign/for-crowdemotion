var express = require('express');
var logger = require('morgan');

var app = express();

// log only 4xx and 5xx responses to console
app.use(logger('dev', {
	skip: function (req, res) { return res.statusCode < 400 }
}));
app.use(express.json());

app.get('/', function (req, res, next) {
	res.send('Index Page!\n');
});
app.get('/auth', function (req, res, next) {
	require('./bc-get-auth-token').getAuth().then(function(r){
		res.json({"accessToken":r});
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));// res.send('Page Not Found\n 404!\n');
});

module.exports = app;
