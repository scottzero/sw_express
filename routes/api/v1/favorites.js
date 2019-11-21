var env = require('dotenv').config();
const fetch = require('node-fetch');
var express = require('express');
const app = express();
var router= express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

async function getUser(key){
  let users = await database('users').where('api_key', key);
  return (users[0].id);
}
async function getFaves(key){
  let u_id = await getUser(key);
  let location = await database('favorites').where('user_id', u_id);
  // let result = [];
  var faves = location.map(x => x.location)
  return console.log(faves);
   // result.push(i.location);
  // return console.log(result);
}

router.get("/", (request, response) => {
  getFaves(request.body.api_key)
});
module.exports = router;
