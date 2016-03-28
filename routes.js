var ApplicantController = require('./controllers/ApplicantController');

var express = require('express'),
router = express.Router();

router.get('/', ApplicantController.Index);
router.get('/applicants/index', ApplicantController.Index);

router.get('/list', ApplicantController.List);

router.get('/show', ApplicantController.Show);

module.exports = router;
