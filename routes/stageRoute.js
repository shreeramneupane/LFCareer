;(function () {
    "use strict";

    var StageController = require('../controllers/stageController');

    var express = require('express'),
    router = express.Router();

    router.get('/stages', StageController.index);
    router.get('/stages/:id', StageController.show);
    router.post('/stages', StageController.create);
    router.put('/stages/:id', StageController.update);

    module.exports = router;
})();
