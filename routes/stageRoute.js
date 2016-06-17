"use strict";

var express = require('express'),
router = express.Router();

var StageController = require('../controllers/stageController');

router.get('/stages', StageController.index);
router.get('/stages/:id', StageController.show);
router.post('/stages', StageController.create);
router.put('/stages/:id', StageController.update);

module.exports = router;
