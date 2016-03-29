var applicantsController = require('./controllers/applicantsController');

var express = require('express');
var router = express.Router();

// Applicant
router.get('/applicants', applicantsController.Index);
router.post('/applicant', applicantsController.Create);


// Position

module.exports = router;
