//Requirements
const env = require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const router= express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const forecast = require('./forecast')
//Functions
  async function getUser(key){
    let users = await database('users').where('api_key', key);
    return (users[0].id);
  }

  const faveArr = (f) => {
    const promises = f.map(async (eachFave) => {
      return {
          name: eachFave,
          myValue: await forecast.darksky(eachFave)
      }
  });
  return Promise.all(promises);
}

  async function getFaves(key){
    let u_id = await getUser(key);
    let location = await database('favorites').where('user_id', u_id);//returns array of favorite locations
    var faves = await location.map(x => x.location)
    let x = await faveArr(faves);
    return x;
};//end getFaves

  router.get("/", (request, response) => {
  database('users').where('api_key', request.body.api_key)
  .then(users=> {
  if(users.length){
    getFaves(request.body.api_key)
    .then(data => response.status(200).send(data)) //sends to render out data
    .catch(reason => response.send(reason.message));
  }else{
    response.status(401).json({
      error: 'could not find user with that api key'
    });
  }
})
.catch(error => {
  response.status(500).json({ error });
  });
});

router.post('/', (request, response) => {
  database('users').where('api_key', request.body.api_key)
  .then(users=> {
    database('favorites').insert({location: request.body.location, user_id: users[0].id},"id")
    .then(favorite => response.status(201).send(`message: ${request.body.location} has been added to your favorites`))
    .catch(error => response.status(500).send( error));
    });
});

router.delete('/', (request,response) =>{
  database('users').where('api_key', request.body.api_key)
  .then(users => {
    database('favorites').where('user_id', `${users[0].id}`).del("location", request.body.location)
    .then(res => response.status(204).send('status 204'))
    .catch(error => response.status(500).send(error));
  })
})
//Exports
module.exports = router;
