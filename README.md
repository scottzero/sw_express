# Sweater Weather [In Express]
#### [Refactor in progress]
###### Check me out here 
https://polar-island-07844.herokuapp.com/

This is an API built with the Express Framework! A user will be able to pass an API key to retreive weather details from a desired city, using the Darksky API using the Google Geocoding Api. Users have the ability to store their favorite locations, retrieve a list of those locations and forecast data for all of those favorites in one request! Details on installation and endpoints are below. 


## Endpoints
### GET /api/v1/forecast?location=denver,co
#### Example Response
```
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

### POST /api/v1/favorites
#### Example Response
`status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
`
### GET /api/v1/favorites
#### Example Response
```
status: 200
body:
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]
```
### DELETE /api/v1/favorites
#### Example Response
`
status: 204
`
#### Installing necessary dependencies
The easiest way to get started is to run the following command. This will pull down any necessary dependencies that your app will require. You can think of this command as something incredibly similar to `bundle install` in Rails. 

`npm install`

#### Set up your local database
You’ll need to figure out a name for your database. We suggest calling it something like `sweater_weather_dev`.  

To get things set up, you’ll need to access your Postgres instance by typing in `psql` into your terminal. Once there, you can create your database by running the comment `CREATE DATABASE PUT_DATABASE_NAME_HERE_dev;`. 

Now you have a database for your new project.

#### Migrations
Once you have your database setup, you’ll need to run some migrations (if you have any). You can do this by running the following command: 

`knex migrate:latest`


Instructions to create database, run migrations, and seed: 
```
psql
CREATE DATABASE DATABASE_NAME_dev;
\q

knex migrate:latest
knex seed:run
```

#### Set up your test database
Most of the setup is going to be same as the one you did before. You’ll notice one small difference with setting the environment flag to `test`.  

```
psql
CREATE DATABASE DATABASE_NAME_test;
\q

knex migrate:latest --env test
```

## Running your tests
Running tests are simple and require you to run the following command below: 

`npm test`

When the tests have completed, you’ll get a read out of how things panned out. The tests will be a bit more noisy than what you’re used to, so be prepared. 

## Setting up your production environment
This repo comes with a lot of things prepared for you. This includes production ready configuration. To get started, you’ll need to do a few things. 

- Start a brand new app on the Heroku dashboard 
- Add a Postgres instance to your new Heroku app
- Find the URL of that same Postgres instance and copy it. It should look like a long url. It may look something like like `postgres://sdflkjsdflksdf:9d3367042c8739f3...`.
- Update your `knexfile.js` file to use your Heroku database instance. You’ll see a key of `connection` with a value of an empty string. This is where you’ll paste your new Postgres instance URL. 

Once you’ve set all of that up, you’ll need to `add the remote` to your new app. This should work no differently than how you’ve done it with any Rails project. Adding this remote will allow you to run `git push heroku master`. 

Once you’ve done that, you’ll need to `bash` into your Heroku instance and get some things set up. 

- Run the following commands to get started:
```
heroku run bash
npm install
nom install -g knex
knex migrate:latest
```

This will install any dependencies, install Knex, and migrate any changes that you’ve made to the database. 
