var express = require('express');
var router = express.Router();

//router.use('/service', require('./service'));
router.use('/study', require('./study'));
router.use('/service', require('./service'));

module.exports = router;
