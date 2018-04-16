$(function() {
    var $location = $(".location");
    var $pressure = $(".pressure");
    var $temperature = $(".temperature");
    var $conditions = $(".conditions");
    var $weather_icon = $(".weather-icon");
    var $switch = $(".switch");
    var tempF = 0;
    var tempC = 0;
    var tempA = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var getIP ='https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=de66a6659e14650907b5cf92ffde9e62';

            $.getJSON(getIP, function (json) {
                var icon = json["weather"][0]["icon"];
                var icon_address = 'https://openweathermap.org/img/w/'+ icon + '.png';
                tempC = (json["main"]["temp"]-273.15);
                $temperature.html(tempC);
                tempF = Math.ceil((tempC*9)/5 + 32);
                $location.html(json["name"]);
                $pressure.html(json["main"]["pressure"]);
                $conditions.html(json["weather"][0]["main"]);
                $weather_icon.attr("src", icon_address);

            });
        });
    }

    function switchUnits(event) {
        event.preventDefault();
        return((tempC*9)/5+-459.67);
    }

    function toggleTemp(event) {
        event.preventDefault();
        $temperature.html(($temperature).html() == tempC ? tempF : tempC)

    }


    $switch.on("click", toggleTemp)
});










