var express = require('express');
var router = express.Router();

/* GET homepage. */
router.get('/', function(req, res, next){
	res.send('SimpleAPIbackend.\nUse /api-endpoint to call the backend');
});

module.exports = router;
