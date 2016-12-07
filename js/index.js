var temp;

var ipapiURL = "https://geoip.nekudo.com/api/";
var icons = new Skycons({"color": "white"});

$.getJSON(ipapiURL, function(loc) {
  $('#location').text(loc.city + ', ' + loc.country.name);
  var weatherURL = "https://api.darksky.net/forecast/aef84c0a6f4c1c63e4e23b326c8def1d/" + loc.location.latitude + "," + loc.location.longitude + "?callback=?";

  $.getJSON(weatherURL, function(a) {
    temp = a.currently.temperature;
    var firstFahrenheit = Math.round(a.currently.temperature);
    $("#temp").html(firstFahrenheit);
    $("#canvas").attr("id", a.currently.icon);
    canvasDisplay(a.currently.icon);
    $("#weather").html(a.currently.summary);
  });
});

$('body').on('click', '#c', function(e) {
  var fahrenheit = Math.round(temp);
  $("#temp").html(fahrenheit);
  $("#c").html(" &deg;F");
  $("#c").attr("id", "f");
});

$('body').on('click', '#f', function(e) {
  var celcius = Math.round((temp - 32) * 5 / 9);
  $("#temp").html(celcius);
  $("#f").html(" &deg;C");
  $("#f").attr("id", "c");
});

function canvasDisplay(icon) {
  var i = icon;
  switch(i) {
    case "clear-day":
      icons.set("clear-day", Skycons.CLEAR_DAY);
      break;
    case "clear-night":
      icons.set("clear-night", Skycons.CLEAR_NIGHT);
      break;
    case "partly-cloudy-day":
      icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
      break;
    case "partly-cloudy-night":
      icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
      break;
    case "cloudy":
      icons.set("cloudy", Skycons.CLOUDY);
      break;
    case "rain":
      icons.set("rain", Skycons.RAIN);
      break;
    case "sleet":
      icons.set("sleet", Skycons.SLEET);
      break;
    case "snow":
      icons.set("snow", Skycons.SNOW);
      break;
    case "wind":
      icons.set("wind", Skycons.WIND);
      break;
    case "fog":
      icons.set("fog", Skycons.FOG);
      break;
  }
}

icons.play();