"use strict";

var express = require('express'),
router = express.Router();

var ApplicantStageController = require('../controllers/applicantStageController');
var ApplicantStageReviewController = require('../controllers/applicantStageReviewController');

router.get('/applicants/:applicant_id/timeline', ApplicantStageController.timeline);
router.get('/applicants/:applicant_id/stages', ApplicantStageController.index);
router.post('/applicants/:applicant_id/stages', ApplicantStageController.create);
router.post('/applicant_stages/:applicant_stage_id/review', ApplicantStageReviewController.create);

module.exports = router;
