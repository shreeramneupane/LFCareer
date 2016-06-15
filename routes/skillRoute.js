"use strict";

var express = require('express'),
router = express.Router();

var SkillController = require('../controllers/skillsController');

router.get('/skills/search', SkillController.search);

module.exports = router;
