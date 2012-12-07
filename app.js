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



app.get('/', function(req, res){

	res.render('index.html', { });

});

app.get('/blog', function(req, res){

	res.render('blog.html', { });

});

app.get('/registry', function(req, res){

	res.render('registry.html', { });

});

app.get('/docs', function(req, res){

	res.render('docs.html', { });

});

app.get('/about', function(req, res){

	res.render('about.html', { });

});



app.listen(process.env.PORT || process.env.VCAP_APP_PORT || 3000);

/*
var data = { url: "/about" };
var broken = new nunjucks.Template("{% if url.indexOf('/about')==0 %} selected {% endif %}");
console.log(broken.render(data));
//TypeError: String.prototype.indexOf called on null or undefined

var works = new nunjucks.Template("{% if url == '/about' %} selected {% endif %}");
console.log(works.render(data));
*/

