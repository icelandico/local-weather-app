const main = document.querySelector(".main");
const location_finding = document.querySelector(".location-finding");
const location_city = document.querySelector(".location");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const temperature = document.querySelector(".temperature");
const conditions = document.querySelector(".conditions");
const weather_icon = document.querySelector("#weather-icon");
const switchTemp = document.querySelector(".switch");
const request = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

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
  fetchIcon(lat, long)
  fetch(weatherData)
    .then(res => res.json())
    .then(data => insertData(data))
    .catch(err => console.log(err))
}

function fetchIcon(lat, long) {
  fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ced710042ef563fc9a490fcd015bedf7/${lat},${long}`)
    .then(res => res.json())
    .then(data => skycons(data))
    .catch(err => console.log(err))
}

function skycons(dataIcon) {
  const skycons = new Skycons({ "color": "#fefefe", "resizeClear": true });
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
