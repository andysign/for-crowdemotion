var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var auth = require('basic-auth');

var adminUsername = 'admin'; // Use curl with Authorization: header
var adminPassword = 'password'; // Basic YWRtaW46cGFzc3dvcmQ

// routes definitions
var indexRouter = require('./routes/index');

// app definition
var app = express();

// view engine setup
app.set('json spaces', 40);

// log only 4xx and 5xx responses to console
app.use(logger('dev', {skip: function (req, res){return res.statusCode<400}}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); //use querystring to parse

app.get('/', indexRouter);
app.get('/auth', function (req, res, next) {
	require('./bc-get-auth-token').getAuth().then(function(r){
		res.json({"accessToken":r});
	});
});
app.post('/login', function (req, res, next) {
	var obj = req.body;
	if (!obj || obj.username!==adminUsername || obj.password!==adminPassword) {
		next(createError(401));
	}
	var bfr = new Buffer.from(obj.username+":"+obj.password).toString('base64');
	res.json({AuthorizationBasic: bfr}); // YWRtaW46cGFzc3dvcmQ=
});
app.get('/profile', function (req, res, next) {
	var obj = auth(req);
	if (!obj || obj.name!==adminUsername || obj.pass!==adminPassword) {
		next(createError(401));
	}
	res.send('Access granted');
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
