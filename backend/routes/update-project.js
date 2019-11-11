var express = require('express');
var router = express.Router();

router.post('/update-project/:extProjectId', function(req, res, next) { // '/update-project/:extProjectId'
	var extProjectId = req.params.extProjectId;
	var prj = extProjectId;
	var body = req.body;
	require('../bc-update-project').updateProject(prj, body).then(function(r){
		res.json(r);
	});
});

module.exports = router;
