"use strict";

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var ApplicantsController = require('../controllers/applicantsController');

var express = require('express'),
router = express.Router();

router.post('/applicants/upload', multipartMiddleware, ApplicantsController.upload_files);

module.exports = router;
