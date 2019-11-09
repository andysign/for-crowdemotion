var express = require('express');
var router = express.Router();

/* GET homepage. */
router.get('/', function(req, res, next){
	res.send('SimpleAPIbackend, use /something to call the API');
});

module.exports = router;
