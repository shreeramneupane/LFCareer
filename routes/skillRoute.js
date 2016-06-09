"use strict";

var SkillController = require('../controllers/skillsController');

var express = require('express'),
router = express.Router();

router.get('/skills/search', SkillController.search);

module.exports = router;
