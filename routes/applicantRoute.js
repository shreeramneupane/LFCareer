"use strict";

var express = require('express'),
router = express.Router(),
multipart = require('connect-multiparty'),
multipartMiddleware = multipart();

var ApplicantsController = require('../controllers/applicantsController');

router.get('/applicants', ApplicantsController.index);
router.post('/applicants', ApplicantsController.create);
router.put('/applicants/:id', ApplicantsController.update);
router.post('/applicants/:applicant_id/documents', multipartMiddleware, ApplicantsController.create_document);

module.exports = router;
