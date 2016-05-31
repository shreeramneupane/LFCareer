"use strict";

var JobsController = require('../controllers/jobsController');

var express = require('express'),
router = express.Router();

router.get('/jobs', JobsController.index);
router.get('/jobs/:id', JobsController.show);
router.post('/jobs', JobsController.create);
router.put('/jobs/:id', JobsController.update);

module.exports = router;
