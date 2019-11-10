var express = require('express');
var router = express.Router();

router.get('/get-all-projects', function(req, res, next) {
	require('../bc-get-all-projects').getAllProjects().then(function(r){
		res.json(JSON.parse(r));
	});
});

module.exports = router;
