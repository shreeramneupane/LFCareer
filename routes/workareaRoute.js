"use strict";

var express = require('express'),
router = express.Router();

var WorkareaController = require('../controllers/workareasController');

router.get('/workareas/search', WorkareaController.search);

module.exports = router;
