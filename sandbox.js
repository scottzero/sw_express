const fetch = require('node-fetch');

// this function will return our google api coordinates
async function fetchAsync() {
  let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=denver,CO&key=AIzaSyAlLNOLsxFHy8B6WJ7p0LoiNfMCDomBcJg');
  let posts = await response.json();
  return posts;
}

// function that returns the lat long coords
async function coordinates(){
  var data = await fetchAsync()  //invoke the function
  var coords = data.results[0].geometry.location
return coords;
};

// pass the coords into a darksky function
async function darksky(){
  var x = await coordinates();
    let response = await fetch(`https://api.darksky.net/forecast/a8575d384c0eee696e336415e7548404/${x.lat},${x.lng}`);
    let weather = await response.json();
    return console.log(weather);
};

module.exports = darksky();
