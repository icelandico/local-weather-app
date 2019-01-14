var main = document.querySelector(".main");
var location_finding = document.querySelector(".location-finding");
var location_city = document.querySelector(".location");
var pressure = document.querySelector(".pressure");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var temperature = document.querySelector(".temperature");
var conditions = document.querySelector(".conditions");
var weather_icon = document.querySelector("#weather-icon");
var switchTemp = document.querySelector(".switch");
var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();

function locator() {
  fetch('https://geoip-db.com/json/')
    .then(res => res.json())
    .then(data => fetchWeatherData(data))
    .catch(err => console.log(err))
}

function fetchWeatherData(json) {
  const lat = json.latitude;
  const long = json.longitude
  const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=de66a6659e14650907b5cf92ffde9e62`
  fetch(weatherData)
    .then(res => res.json())
    .then(data => insertData(data))
    .catch(err => console.log(err))
}

function geolocatorParse() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      main.style.display = 'flex';
      location_finding.style.display = 'none';
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var getIP = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long +
        '&APPID=de66a6659e14650907b5cf92ffde9e62';
      var getIcon = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ced710042ef563fc9a490fcd015bedf7/'
        + lat + "," + long;
      request.open('GET', getIP, true);
      request2.open('GET', getIcon, true);
      request.onload = function () {
        data = JSON.parse(this.response);
        insertData(data);
      };
      request2.onload = function () {
        dataIcon = JSON.parse(this.response);
        skycons(dataIcon)
      };
      request.send();
      request2.send();
    });
  }
}

function skycons(dataIcon) {
  var skycons = new Skycons({ "color": "#fefefe", "resizeClear": true });
  skycons.add(weather_icon, dataIcon.currently.icon);
  skycons.play();
}

function insertData(data) {
  tempC = Math.round((data["main"]["temp"] - 273.15));
  tempCIn = tempC + "°C";
  temperature.innerHTML = (tempCIn);
  tempF = Math.round((((tempC * 9) / 5 + 32)));
  tempFIn = tempF + "°F";
  location_city.innerHTML = data["name"];
  pressure.innerHTML = data["main"]["pressure"] + " hPa";
  humidity.innerHTML = data["main"]["humidity"] + " %";
  wind.innerHTML = data["wind"]["speed"] + " m/s";
  conditions.innerHTML = data["weather"][0]["main"];
}

function toggleTemp() {
  temperature.textContent = (temperature.textContent === tempCIn ? tempFIn : tempCIn);
  switchTemp.textContent = (switchTemp.textContent === "To Fahrenheit" ? "To Celsius" : "To Fahrenheit");
}

window.onload = locator();
switchTemp.addEventListener('click', toggleTemp);
