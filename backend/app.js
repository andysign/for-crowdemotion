var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var auth = require('basic-auth');

var adminUsername = 'admin'; // Use curl with Authorization: header
var adminPassword = 'password'; // Basic YWRtaW46cGFzc3dvcmQ

var restricted = function (req, res, next) {
	var obj = auth(req);
	if (!obj || obj.name!==adminUsername || obj.pass!==adminPassword) {
		next(createError(401)); //res.set('WWW-Authenticate','Basic realm=""');
	}
	next();
}

var adminUsername = 'admin'; // Use curl with Authorization: header
var adminPassword = 'password'; // Basic YWRtaW46cGFzc3dvcmQ

// app definition
var app = express();

// view engine setup
app.set('json spaces', 40);

// log only 4xx and 5xx responses to console
app.use(logger('dev', {skip: function (req, res){return res.statusCode<400}}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); //use querystring to parse

// routes definitions
var indexRouter = require('./routes/index');
var getAllCountriesRouter = require('./routes/get-all-countries');
var getAllProjectsRouter = require('./routes/get-all-projects');
var getProjectRouterDefault = require('./routes/get-project').routerDefault;
var getProjectRouter = require('./routes/get-project').router;
var updateProjectRouter = require('./routes/update-project');
var attributesRouterDefault=require('./routes/get-all-attributes').routerDefault
var attributesRouter=require('./routes/get-all-attributes').router;

// start
app.get('/', indexRouter);
/*
app.get('/auth', function (req, res, next) {
	require('./bc-get-auth-token').getAuth().then(function(r){
		res.json({"accessToken":r});
	});
});
*/
app.post('/login', function (req, res, next) {
	var obj = req.body;
	if (!obj || obj.username!==adminUsername || obj.password!==adminPassword) {
		next(createError(401));
	}
	var bfr = new Buffer.from(obj.username+":"+obj.password).toString('base64');
	res.json({AuthorizationBasic: bfr}); // YWRtaW46cGFzc3dvcmQ=
});
// start private by setting up the restricted middleware
app.use(restricted);
app.get('/get-all-countries', getAllCountriesRouter);
app.get('/get-all-projects', getAllProjectsRouter);
app.get('/get-project', getProjectRouterDefault);
app.get('/get-project/:extProjectId', getProjectRouter);
app.post('/update-project/:extProjectId', updateProjectRouter);
app.get('/get-all-attributes', attributesRouterDefault);
app.get('/get-all-attributes/:countryCode/:languageCode', attributesRouter);

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
