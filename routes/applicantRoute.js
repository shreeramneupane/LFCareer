"use strict";

var express = require('express'),
router = express.Router(),
multipart = require('connect-multiparty'),
multipartMiddleware = multipart();

var ApplicantsController = require('../controllers/applicantsController');
var ApplicantDocumentsController = require('../controllers/applicantDocumentsController');

router.get('/applicants', ApplicantsController.index);
router.get('/applicants/:id', ApplicantsController.show);
router.post('/applicants', ApplicantsController.create);
router.put('/applicants/:id', ApplicantsController.update);
router.post('/applicants/:applicant_id/documents', multipartMiddleware, ApplicantDocumentsController.create);
router.get('/applicants/:applicant_id/documents/', multipartMiddleware, ApplicantDocumentsController.show);

module.exports = router;
