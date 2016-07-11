"use strict";

var express = require('express'),
router = express.Router();

var ApplicantStageController = require('../controllers/applicantStageController');
var ApplicantStageReviewController = require('../controllers/applicantStageReviewController');
var ApplicantStageInterviewController = require('../controllers/applicantStageInterviewController');

router.get('/applicants/:applicant_id/timeline', ApplicantStageController.timeline);
router.get('/applicants/:applicant_id/stages', ApplicantStageController.index);
router.post('/applicants/:applicant_id/stages', ApplicantStageController.create);
router.post('/applicant_stage_reviews', ApplicantStageReviewController.create);
router.put('/applicant_stage_interviews/:id', ApplicantStageInterviewController.update);
router.get('/applicant_stage_interviews/:id/interview_response', ApplicantStageInterviewController.interviewResponse);

module.exports = router;
