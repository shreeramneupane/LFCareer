"use strict";

var ApplicantsController = require('../controllers/applicantsController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var express = require('express'),
router = express.Router();

router.get('/applicants', ApplicantsController.index);
router.get('/applicants/:id', ApplicantsController.show);
router.post('/applicants', ApplicantsController.create);
router.post('/applicants/upload', multipartMiddleware, ApplicantsController.upload_files);
router.put('/applicants/:id', ApplicantsController.update);

module.exports = router;
