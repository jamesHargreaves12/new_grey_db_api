var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Model = require('./api/models/newGreyDbModel'), //created model loading here
  bodyParser = require('body-parser'),
  config = require('./config');

  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.db[app.settings.env]);  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
  next()
})

var routes = require('./api/routes/newGreyDbRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('New Grey RESTful API server started on: ' + port);
