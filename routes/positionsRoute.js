"use strict";

var express = require('express'),
router = express.Router();

var PositionsController = require('../controllers/positionsController');

router.get('/positions', PositionsController.index);
router.get('/positions/:id', PositionsController.show);
router.post('/positions', PositionsController.create);
router.put('/positions/:id', PositionsController.update);

module.exports = router;
