"use strict";

var WorkareaController = require('../controllers/workareasController');

var express = require('express'),
router = express.Router();

router.get('/workareas/search', WorkareaController.search);

module.exports = router;
