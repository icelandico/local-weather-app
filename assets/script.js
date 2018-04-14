$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var getIP ='https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=de66a6659e14650907b5cf92ffde9e62';
            $.getJSON(getIP, function (json) {
                $(".location").html(json["name"]);
                $(".pressure").html(json["main"]["pressure"]);
                $(".temperature").html(json["main"]["temp"]);
                $(".conditions").html(json["weather"][0]["main"]);
                insertLogo();
            });
        });
    }
});

function insertLogo() {
    var element = document.getElementsByClassName("fas fa-sun")
}









