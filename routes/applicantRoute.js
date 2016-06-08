"use strict";

var StageController = require('../controllers/applicantsController');

var express = require('express'),
router = express.Router();

router.get('/applicants', StageController.index);
router.post('/applicants', StageController.create);
router.put('/applicants/:id', StageController.update);

module.exports = router;
