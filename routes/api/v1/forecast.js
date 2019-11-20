var env = require('dotenv').config();
const fetch = require('node-fetch');
var express = require('express');
const app = express();
var router= express.Router();

// var router = express.Router();
// this function will return our google api coordinates
async function fetchAsync(city) {
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GOOGLE_API_KEY}`);
  let posts = await response.json();
  return posts;
}

// function that returns the lat long coords
async function coordinates(city){
  var data = await fetchAsync(city)  //invoke the function
  var coords = data.results[0].geometry.location
return coords;
};

// pass the coords into a darksky function
async function darksky(city){
  var x = await coordinates(city);
    let response = await fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${x.lat},${x.lng}`);
    let weather = await response.json();
    return weather;
};
router.get("/", (request, response) => {
  darksky(request.query.location)
  .then(data => response.send(data))
  .catch(reason => response.send(reason.message))
});

module.exports = router;
