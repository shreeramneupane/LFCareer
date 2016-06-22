"use strict";

var express = require('express'),
router = express.Router();

var ApplicantStageController = require('../controllers/applicantStageController');

router.get('/applicants/:applicant_id/timeline', ApplicantStageController.timeline);
router.get('/applicants/:applicant_id/stages', ApplicantStageController.index);

module.exports = router;
