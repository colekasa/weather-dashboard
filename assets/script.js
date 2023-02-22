var searchBtn = document.getElementById("search");
var cardTitle = document.querySelector(".card-title");
var cardText = document.querySelector(".card-text");
var apiKey = "a5c580663ddccd88b1db1d7c94e30d3e";
var card = document.querySelector(".screen");
var cityInput = document.querySelector(".citySearch")
var recentCities = []
// Jquery uses just the $ instead of document 
var recent = $("#recent")
var clear = $("#clearHistory")

$(document).ready(function(){
  var recentCity = JSON.parse(localStorage.getItem("cities"))
  if(recentCity){
    recentCities = recentCity
  }
  renderCities()
  console.log(recentCity)
})

function clearHistory(){
  recent.empty()
}

function renderCities(){
  clearHistory()
    for(var i = 0; i<recentCities.length; i++){
    console.log(recentCities[i])
    var btnCity =  $("<button></button>")
    btnCity.text(recentCities[i])
    btnCity.on("click", (e) => {
      apiGrab(e.currentTarget.textContent)
      card.classList.remove("hide")
    })
    recent.append(btnCity)
  }
}

function apiGrab(cityName) {
  let data = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`
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
        humidityEl.text("Humidity: " + dataList[i].main.humidity)
        tempEl.text("Temperature: " + dataList[i].main.temp)
        tempFeel.text("Feels Like: " + weatherData.main.feels_like)
        iconEl.attr("src",`http://openweathermap.org/img/w/${dataList[i].weather[0].icon}.png`)
        dateEl.text(date.toLocaleDateString("en-US"))
        console.log(dataList[i]);
        cardIndex++
      }
    });
}

searchBtn.addEventListener("click", function(){
  apiGrab(cityInput.value)
  card.classList.remove("hide")
  recentCities.push(cityInput.value)
  localStorage.setItem("cities", JSON.stringify(recentCities))
  renderCities();
});

clear.on("click", function(){
  clearHistory()
  recentCities = []
  localStorage.setItem("cities", JSON.stringify(recentCities))
})
