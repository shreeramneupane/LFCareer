var express = require('express');
var app = express();

var port = 5000;
//require('./routes')(app);

app.use(require('./routes'));

app.listen(port);
