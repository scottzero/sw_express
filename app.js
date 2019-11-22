//Requirements
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const indexRouter = require('./routes/index');
const forecastRouter = require('./routes/api/v1/forecast');
const favoritesRouter = require('./routes/api/v1/favorites');
const app = express();
//Exress.uses
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/',indexRouter);
app.use('/api/v1/forecast',forecastRouter.router);//endpoint for forecasts
app.use('/api/v1/favorites',favoritesRouter);//endpoint for favorites
//Exports
module.exports = app;
