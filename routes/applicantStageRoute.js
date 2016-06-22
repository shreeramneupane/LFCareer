"use strict";

var express = require('express'),
router = express.Router();

var ApplicantStageController = require('../controllers/applicantStageController');

router.get('/applicants/:applicant_id/timeline', ApplicantStageController.index);
router.get('/applicants/:applicant_id/stages', ApplicantStageController.listStage);

module.exports = router;
