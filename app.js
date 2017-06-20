// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Connect to the MongoDB
mongoose.connect('mongodb://localhost:27017/test');

// Create Express application
var app = module.exports = express();


var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));   

routes = require('./routes/index')
app.use('/api', routes);




// Use environment defined port or 2001
var port = process.env.PORT || 2001;

// Start the server
app.listen(port);
console.log('Insert getat on port ' + port);