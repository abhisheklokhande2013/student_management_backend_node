const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//port
const port = process.env.PORT || 8080;

//database configuration
const mongoose = require('./config/database');
const users = require('./routes/users');
const students = require('./routes/students');

var jwt = require('jsonwebtoken');
const app = express();

app.use(function(req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization,X-Access-Token,x-access-token'
  );
  next();
});

// jwt secret token
app.set('secretKey', 'restapi');

// connection to mongodb
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(logger('dev'));
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.get('/', function(req, res) {
  res.json({ Application: 'Student Management System APIs' });
});

// public route
app.use('/users', users);
// private route
app.use('/students', validateUser, students);

//To access 'students' routes we have defined middleware to validate user
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(
    err,
    decoded
  ) {
    if (err) {
      res.json({ status: 'error', message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// intialise server
app.listen(port, (req, res) => {
  console.log(`Server is running on ${port} port.`);
});
