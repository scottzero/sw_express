//Requirements
const env = require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const router= express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

// var router = express.Router();
// this function will return our google api coordinates
async function fetchAsync(city) {
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GOOGLE_API_KEY}`);
  let posts = await response.json();
  return posts; //change names
}

// function that returns the lat long coords
async function coordinates(city){
  var data = await fetchAsync(city)
  var coords = data.results[0].geometry.location
  return coords;
};

// pass the coords into a darksky function
async function darksky(city){//create for each method to handle list of locations
  var x = await coordinates(city);
    let response = await fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${x.lat},${x.lng}`);
    let weather = await response.json();
    return weather;
};

router.get("/", (request, response) => {
    database('users').where('api_key', request.body.api_key)
     .then(users => {
       if (users.length) {
         darksky(request.query.location)
         .then(data => response.status(200).send(data))
         .catch(reason => response.send(reason.message));
       } else {
         response.status(401).json({
           error: `Could not find user with api-key ${request.body.api_key}`
         });
       }
     })
     .catch(error => {
       response.status(500).json({ error });
     });
});
//Exports
module.exports ={
  router,
  darksky
};
