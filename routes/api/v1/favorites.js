const env = require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const router= express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const forecast = require('./forecast')


async function getUser(key){
  let users = await database('users').where('api_key', key);
  return (users[0].id);
}
async function getFaves(key){
  let u_id = await getUser(key);
  let location = await database('favorites').where('user_id', u_id);
  var faves = await location.map(x => x.location)
  return await forecast.darksky(faves[0]);
}

router.get("/", (request, response) => {
  getFaves(request.body.api_key)
  .then(data => response.status(200).send(data)) //sends to render out data
  .catch(reason => response.send(reason.message));
});
module.exports = router;
