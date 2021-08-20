//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const CityName = req.body.CityName;
  const StateCode =req.body.StateCode;
  const CountryCode =req.body.CountryCode;
  const api = "f77921562bc6ebbaae39cdee76a0f1bd";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+CityName+","+StateCode+","+CountryCode+"&appid="+api+"&units="+unit;
  https.get(url , function(response){
    response.on("data" , function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+weatherDescription+"</p>");
      res.write("<h1>The teamperature is currently "+temp+"</h1>");
      res.write("<img src = "+imageURL+">");
      res.send();
    });
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("sever is up on 3000");
});
