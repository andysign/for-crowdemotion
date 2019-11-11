var express = require('express');
var routerDefault = express.Router();
var router = express.Router();

routerDefault.get('/get-project', function(req, res, next) { // /get-project/:extProjectId
	require('../bc-get-project').getProject().then(function(r){
		res.json(JSON.parse(r));
	});
});

router.get('/get-project/:extProjectId', function(req, res, next) {
	var extProjectId = req.params.extProjectId;
	require('../bc-get-project').getProject(extProjectId).then(function(r){
		res.json(JSON.parse(r));
	});
});

module.exports.routerDefault = routerDefault;
module.exports.router = router;
