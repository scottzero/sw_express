var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
var indexRouter = require('./routes/index');
var forecastRouter = require('./routes/api/v1/forecast'); //require forecast controller
var favoritesRouter = require('./routes/api/v1/favorites'); //require forecast controller
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/',indexRouter);
app.use('/api/v1/forecast',forecastRouter);//endpoint for forecasts
app.use('/api/v1/favorites',favoritesRouter);//endpoint for favorites
module.exports = app;
