const express = require("express"); //package .json file
const bodyParser = require("body-parser");
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3000);
// app.locals.title = "Publications";

// app.get("/", (request, response) => {
//   response.send("Hello, Publications");
// });

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on ${app.get("port")}.`);
});
var forecast = require('./routes/api/v1/forecast')
app.use('/api/v1/forecast', forecast.darksky);
module.exports = server;
