var temp;

$.get("http://ip-api.com/json", function(loc) {
  $('#location').text(loc.city + ', ' + loc.region + ', ' + loc.country);
  var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + loc.lat + "&lon=" + loc.lon + "&APPID=97eb08adc0a00cacc8ad542e6edb219a";

  $.getJSON(weatherURL, function(a) {
    console.log(a);
    temp = a.main.temp;
    var firstCelcius = Math.round(a.main.temp - 273.15);
    $("#temp").html(firstCelcius);
    //console.log(Date.now());
    var timeOfDay = dayOrNight(a.sys.sunrise, a.sys.sunset);
    var code = a.weather[0].id;
    var img = "http://openweathermap.org/img/w/";
    img += imgDisplay(code, timeOfDay);
    $("#image").attr("src", img);
  var weather = capitalizeWeather(a.weather[0].description);  $("#weather").html(weather);
  });
});

$('body').on('click', '#c', function(e) {
  var fahrenheit = Math.round(((temp - 273.15) * 9 / 5) + 32);
  $("#temp").html(fahrenheit);
  $("#c").html(" &deg;F");
  $("#c").attr("id", "f");
});

$('body').on('click', '#f', function(e) {
  var celcius = Math.round(temp - 273.15);
  $("#temp").html(celcius);
  $("#f").html(" &deg;C");
  $("#f").attr("id", "c");
});

function imgDisplay(code, time) {
  var symbol;
  if (time === true) {
    if (code >= 200 && code <= 232) {
      symbol = "11";
    } else if (code >= 300 && code <= 321) {
      symbol = "09";
    } else if (code >= 500 && code <= 504) {
      symbol = "10";
    } else if (code == 511 || (code >= 600 && code <= 622)) {
      symbol = "13";
    } else if (code >= 520 && code <= 531) {
      symbol = "09";
    } else if (code >= 701 && code <= 781) {
      symbol = "50";
    } else if (code == 801) {
      symbol = "02";
    } else if (code == 802) {
      symbol = "03";
    } else if (code == 803 || code == 804) {
      symbol = "04";
    } else {
      symbol = "01";
    }
    return symbol + "d.png";
  } else {
    {
    if (code >= 200 && code <= 232) {
      symbol = "11";
    } else if (code >= 300 && code <= 321) {
      symbol = "09";
    } else if (code >= 500 && code <= 504) {
      symbol = "10";
    } else if (code == 511 || (code >= 600 && code <= 622)) {
      symbol = "13";
    } else if (code >= 520 && code <= 531) {
      symbol = "09";
    } else if (code >= 701 && code <= 781) {
      symbol = "50";
    } else if (code == 801) {
      symbol = "02";
    } else if (code == 802) {
      symbol = "03";
    } else if (code == 803 || code == 804) {
      symbol = "04";
    } else {
      symbol = "01";
    }
    return symbol + "n.png";
  }
  }
}

function dayOrNight(sunrise, sunset) {
  var currentTime = Date.now() / 1000;
  if (currentTime >= sunrise && currentTime < sunset) {
    return true;
  } else {
    return false;
  }
}

function capitalizeWeather(description) {
  description = description.split(" ");
  for (var i in description) {
    description[i] = description[i].charAt(0).toUpperCase() + description[i].slice(1);
  }  
  description = description.join(" ");
  return description;
}