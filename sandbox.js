const fetch = require('node-fetch');

// this function will return our google api coordinates
async function fetchAsync() {
  let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=denver,CO&key=AIzaSyAlLNOLsxFHy8B6WJ7p0LoiNfMCDomBcJg');
  let posts = await response.json();
  return posts;
}

// This is how we use our async function
fetchAsync()
    .then(data => console.log(data.results[0].geometry))
    .catch(reason => console.log(reason.message))
