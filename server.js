var path = require('path');
var Promise = require('promise');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var request = require('request');
// var scheduler = require('./scheduler.js');
var path = require('path');
var app = express();

// Database setup
var Sequelize = require('sequelize'),
		connection;
if (process.env.JAWSDB_URL) {
		connection = new Sequelize(process.env.JAWSDB_URL);
} else {
		connection = new Sequelize('facts_db', 'root', '', {
				host: 'localhost',
				dialect: 'mysql',
				port: '3306'
		});
}

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.use(session({ secret: 'app', cookie: { maxAge: 60000 }}));

app.use(bodyParser.urlencoded({
	extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var users_controllers = require('./controllers/users_controller.js');
var categories_controllers = require('./controllers/categories_controller.js');
var facts_controllers = require('./controllers/facts_controller.js');

app.use('/', users_controllers);
app.use('/', categories_controllers);
app.use('/', facts_controllers);

// have heroku select the port otherwise use port 3000 locally
var port = process.env.PORT || 3000;
app.listen(port);
