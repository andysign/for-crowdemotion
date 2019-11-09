var express = require('express');
var router = express.Router();

router.get('/get-all-countries', function(req, res, next){
	require('../bc-get-all-countries').getAllCountries().then(function(r){
		res.json(JSON.parse(r));
	}).catch(function(){next(require('http-errors')(400));});
});

module.exports = router;
