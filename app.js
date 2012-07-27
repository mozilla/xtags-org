var path = require('path'),
	_ = require('underscore'),
	express = require('express'),
	app = express.createServer(),
	Settings = require('settings');

var config = new Settings(require('./config'));



app.disable('view cache');
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || process.env.VCAP_APP_PORT || 3000);
