const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const apiResponse = require('./helpers/apiResponse');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const jwtInCookie = require('jwt-in-cookie');
jwtInCookie.configure({ secret: process.env.JWT_SECRET });

// REMOVE ME - populateDB
// const {populateDB} = require('./models/setup_deleteMe');
// populateDB();
const db = require('./models/index');
db.sequelize
  // sync with logging, replace authenticate() with sync bc it includes authenticate
  // connection.sync({logging: console.log})
  // db.sync({logging: console.log})?
  .authenticate()
  .then(() => console.log('Connection to database established successfully.'))
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsConfig = {
  origin: true,
  credentials: true,
};

//To allow cross-origin requests
app.use(cors(corsConfig));

//Route Prefixes
app.use('/api/', apiRouter);
app.use('/', indexRouter);

// throw 404 if URL not found
app.all('*', function (req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found');
});

app.use((err, req, res) => {
  if (err.name == 'UnauthorizedError') {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;
