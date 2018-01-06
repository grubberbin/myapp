var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var dev_location = require('../models/device_receive');


router.get('/', dev_location.showIndex);

router.post('/',dev_location.locationHandle);

module.exports = router;
