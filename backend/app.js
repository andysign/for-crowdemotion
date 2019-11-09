var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');

var app = express();

// view engine setup
app.set('json spaces', 40);

// log only 4xx and 5xx responses to console
app.use(logger('dev', {skip: function (req, res){return res.statusCode<400}}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV === 'development' ? err : '|';
	// render the error page
	res.status(err.status || 500);
	// console.log(res.locals);
	res.send('ERROR:'+err.status+':'+res.locals.error);
});

module.exports = app;
