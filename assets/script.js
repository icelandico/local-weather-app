$(function() {
    var $main = $(".main");
    var $location_finding = $(".location-finding");
    var $location = $(".location");
    var $pressure = $(".pressure");
    var $temperature = $(".temperature");
    var $conditions = $(".conditions");
    var $weather_icon = $(".weather-icon");
    var $switch = $(".switch");
    var $degree = $(".degree");
    var tempF = 0;
    var tempC = 0;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $main.css({'display' : 'unset'});
            $location_finding.css({'display' : 'none'});
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var getIP ='https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=de66a6659e14650907b5cf92ffde9e62';

            $.getJSON(getIP, function (json) {
                var icon = json["weather"][0]["icon"];
                var icon_address = 'https://openweathermap.org/img/w/'+ icon + '.png';
                tempC = (Math.round((json["main"]["temp"]-273.15)));
                $temperature.html(tempC);
                $degree.html("°");
                tempF = Math.round((tempC*9)/5 + 32);
                $location.html(json["name"]);
                $pressure.html(json["main"]["pressure"]);
                $conditions.html(json["weather"][0]["main"]);
                $weather_icon.attr("src", icon_address);
            });
        });
    }

    function toggleTemp(event) {
        event.preventDefault();
        $temperature.html(($temperature).html() == tempC ? tempF: tempC);
        $switch.html(($switch).html() == "To Fahrenheit" ? "To Celsius" : "To Fahrenheit");
    }

    $switch.on("click", toggleTemp)
});










