$(function() {
    var $main = $(".main");
    var $location_finding = $(".location-finding");
    var $location = $(".location");
    var $pressure = $(".pressure");
    var $humidity = $(".humidity");
    var $wind = $(".wind");
    var $temperature = $(".temperature");
    var $conditions = $(".conditions");
    var $weather_icon = $("#weather-icon");
    var $switch = $(".switch");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $main.css({'display': 'flex'});
            $location_finding.css({'display': 'none'});
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var getIP = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=de66a6659e14650907b5cf92ffde9e62';
            var getIcon = 'https://api.darksky.net/forecast/1678a0cbba8712f020e8c1129787ab9a/54,18';
            $.getJSON(getIP, function (json) {
                tempC = Math.round((json["main"]["temp"] - 273.15));
                tempCIn = tempC + "°C";
                $temperature.html((tempCIn));
                tempF = Math.round((((tempC * 9) / 5 + 32)));
                tempFIn = tempF + "°F";
                $location.html(json["name"]);
                $pressure.html(json["main"]["pressure"] + " hPa");
                $humidity.html(json["main"]["humidity"] + " %");
                $wind.html(json["wind"]["speed"] + " m/s");
                $conditions.html(json["weather"][0]["main"]);

                $.ajax({
                    type: "GET",
                    url: "https://api.darksky.net/forecast/ced710042ef563fc9a490fcd015bedf7/" + lat + "," + long,
                    dataType: "jsonp"
                }).done(function (data) {
                    var obj = [data];

                    function skycons() {
                        var skycons = new Skycons({"color": "#fff", "resizeClear": true});
                        skycons.add(document.getElementById("weather-icon"), obj[0].currently.icon);
                        skycons.play();
                    }
                    skycons();
                })
            })
        });
    }

    function toggleTemp(event) {
        event.preventDefault();
        $temperature.html(($temperature).html() == tempCIn ? tempFIn: tempCIn);
        $switch.html(($switch).html() == "To Fahrenheit" ? "To Celsius" : "To Fahrenheit");

    }
    $switch.on("click", toggleTemp)
});










