var express = require('express');
var routerDefault = express.Router();
var router = express.Router();

routerDefault.get('/get-all-attributes', function(req, res, next) {
	require('../bc-get-all-attributes').getAllAttributes().then(function (r){
		res.json(JSON.parse(r));
	});
});

router.get('/get-all-attributes/:countryCode/:languageCode',function(req,res,next){
	var cC = req.params.countryCode;
	var lC = req.params.languageCode;
	require('../bc-get-all-attributes').getAllAttributes(cC,lC).then(function(r){
		res.json(JSON.parse(r));
	});
});

module.exports.routerDefault = routerDefault;
module.exports.router = router;
