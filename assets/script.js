var searchBtn = document.getElementById("search");
var cardTitle = document.querySelector(".card-title");
var cardText = document.querySelector(".card-text");
var apiKey = "a5c580663ddccd88b1db1d7c94e30d3e";

function apiGrab() {
  let data = fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=" + apiKey
  )
    .then(function (response) {
      return response.json();
      // console.log(response.json())
    })
    .then(function (caughtData) {
      var lat = caughtData.coord.lat;
      var lon = caughtData.coord.lon;
      caughtData.weather[0].description;
      console.log(caughtData, lat, lon);
      getCity(lat, lon);
      // return caughtData
    });
}

// get the latitude and longitude for the city
function getCity(lat, lon) {
  let city = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=` +
      apiKey
  )

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var dataList = data.list;
      var cardIndex = 0;
      for (var i = 0; i <= dataList.length; i += 8) {
        if (i == 40) {
          i--;
        }
        var weatherData = dataList[i]
        var dateEl = $(`#date-${cardIndex}`)
        var date = new Date(dataList[i].dt * 1000);  
        var iconEl = $(`#icon-${cardIndex}`) 
        var humidityEl = $(`#humidity-${cardIndex}`)
        var tempEl = $(`#temp-${cardIndex}`)
        var tempFeel = $(`#tempFeel-${cardIndex}`)
        humidityEl.text(dataList[i].main.humidity)
        tempEl.text(dataList[i].main.temp)
        tempFeel.text(weatherData.main.feels_like)
        iconEl.attr("src",`http://openweathermap.org/img/w/${dataList[i].weather[0].icon}.png`)
        dateEl.text(date.toLocaleDateString("en-US"))
        console.log(dataList[i]);
        cardIndex++
      }
    });
    

}

searchBtn.addEventListener("click", apiGrab);
