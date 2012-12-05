var path = require('path'),
	express = require('express'),
	app = express(),
	Settings = require('settings'),
	nunjucks = require('nunjucks');

var config = new Settings(require('./config'));


app.disable('view cache');
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('app/views'));
env.express(app);

app.get('/|/news|/registry|/docs|/about', function(req, res) {
  res.render('index.html');
});

app.listen(process.env.PORT || process.env.VCAP_APP_PORT || 3000);
