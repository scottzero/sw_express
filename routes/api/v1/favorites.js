var env = require('dotenv').config();
const fetch = require('node-fetch');
var express = require('express');
const app = express();
var router= express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
