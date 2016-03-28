var express = require('express');
var app = express();

var databaseConfig = require('./knexfile');
require('knex')(databaseConfig[app.settings.env]);

app.use(require('./routes'));

var port = 5000;

app.listen(port);
