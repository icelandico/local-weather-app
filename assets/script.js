const location_city = document.querySelector(".location");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const temperature = document.querySelector(".temperature");
const conditions = document.querySelector(".conditions");
const weather_icon = document.querySelector("#weather-icon");
const switchTemp = document.querySelector(".switch");
const apiAddress = 'https://geoip-db.com/json/' 

function fetchData(address, func) {
  fetch(address)
    .then(res => res.json())
    .then(data => func(data))
    .catch(err => alert(err))
}

function fetchWeatherData(json) {
  hideLoadScreen()
  const lat = json.latitude;
  const long = json.longitude
  const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=de66a6659e14650907b5cf92ffde9e62`
  const skyconsData = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ced710042ef563fc9a490fcd015bedf7/${lat},${long}`
  fetchData(skyconsData, skycons)
  fetchData(weatherData, insertData)
}

function skycons(dataIcon) {
  const skycons = new Skycons({ "color": "#fefefe", "resizeClear": true });
  skycons.add(weather_icon, dataIcon.currently.icon);
  skycons.play();
}

function insertData(data) {
  tempC = convertToCelsius(data.main.temp);
  tempCIn = tempC + "°C";
  temperature.innerHTML = (tempCIn);
  tempF = convertToFahrenheit(tempC);
  tempFIn = tempF + "°F";
  location_city.innerHTML = data["name"];
  pressure.innerHTML = data.main.pressure + " hPa";
  humidity.innerHTML = data.main.humidity + " %";
  wind.innerHTML = data.wind.speed + " m/s";
  conditions.innerHTML = data.weather[0].main;
}

function hideLoadScreen() {
  const main = document.querySelector(".main");
  const location_finding = document.querySelector(".location-finding");
  main.classList.add('loaded');
  location_finding.classList.add('hidden');
}

function convertToFahrenheit(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

function convertToCelsius(temp) {
  return Math.round(temp - 273.15);
}

function toggleTemp() {
  temperature.textContent = (temperature.textContent === tempCIn ? tempFIn : tempCIn);
  switchTemp.textContent = (switchTemp.textContent === "To Fahrenheit" ? "To Celsius" : "To Fahrenheit");
}

window.onload = fetchData(apiAddress, fetchWeatherData);
switchTemp.addEventListener('click', toggleTemp);
