var searchButtonEl = document.querySelector('#search');
var searchFieldEl = document.querySelector('#search-field')
var cityNameEl = document.querySelector('#city-name')
var tempEl = document.querySelector('#temp')
var windEl = document.querySelector('#wind')
var humidityEl = document.querySelector('#humidity')
var fiveDayHeadingEl = document.querySelector("#five-day-heading")
var dayOneEl = document.querySelector("#day-one")
var dayTwoEl = document.querySelector("#day-two")
var dayThreeEl = document.querySelector("#day-three")
var dayFourEl = document.querySelector("#day-four")
var dayFiveEl = document.querySelector("#day-five")

function searchButton(event) {
  event.preventDefault();

  var searchEntry = document.querySelector('#search-text').value;
  var apiKey = 'cf49844e3f54a62c370a39540478245f';
  var geoCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchEntry + '&appid=' + apiKey;
  var lat;
  var lon;

  if (!searchEntry) {
    console.error('You need a search input value!');
    return;
  }

  fetch(geoCoordinates)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        lat = data[i].lat;
        // console.log(lat);
        lon = data[i].lon;
        // console.log(lon);
        var citySearched = data[i].name + ', ' + data[i].state + ', ' + data[i].country;
        // console.log(citySearched);
        var pastSearch = document.createElement('button');
        pastSearch.classList.add('btn', 'btn-primary', 'btn-block');
        pastSearch.textContent = citySearched;
        searchFieldEl.appendChild(pastSearch);
      }

      var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

      fetch(currentWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          cityNameEl.textContent = data.name + '   ';
          var icon = data.weather[0].icon;
          document.querySelector('#weather-icon').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
          tempEl.textContent = 'Current Temperature: ' + data.main.temp + ' ° C';
          windEl.textContent = 'Current Wind Speed: ' + data.wind.speed + ' kph';
          humidityEl.textContent = 'Current Humidity: ' + data.main.humidity + ' %';
          
          var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

          fetch(fiveDayForecast)
            .then(function(response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              fiveDayHeadingEl.textContent = 'Five Day Forecast:';
              var dayOneDate = data.list[7].dt_txt;
              dayOneEl.textContent = dayOneDate;
              var dayOneImage = document.createElement('img');
              var dayOneIcon = data.list[7].weather[0].icon;
              dayOneImage.src = 'http://openweathermap.org/img/wn/' + dayOneIcon + '@2x.png'
              dayOneEl.appendChild(dayOneImage);
              var dayOneTemp = document.createElement('h5');
              var dayOneTempReading = data.list[7].main.temp
              dayOneTemp.textContent = 'Temp: ' + dayOneTempReading + ' ° C';
              dayOneEl.appendChild(dayOneTemp);
              var dayOneWind = document.createElement('h5');
              var dayOneWindReading = data.list[7].wind.speed
              dayOneWind.textContent = 'Wind: ' + dayOneWindReading + ' kph';
              dayOneEl.appendChild(dayOneWind);
              var dayOneHumidity = document.createElement('h5');
              var dayOneHumidityReading = data.list[7].main.humidity
              dayOneHumidity.textContent = 'Humidity: ' + dayOneHumidityReading + ' %';
              dayOneEl.appendChild(dayOneHumidity);



              var dayTwoDate = data.list[15].dt_txt;
              dayTwoEl.textContent = dayTwoDate;
              var dayThreeDate = data.list[23].dt_txt;
              dayThreeEl.textContent = dayThreeDate;
              var dayFourDate = data.list[31].dt_txt;
              dayFourEl.textContent = dayFourDate;
              var dayFiveDate = data.list[39].dt_txt;
              dayFiveEl.textContent = dayFiveDate;
            })
        })
    });
}

searchButtonEl.addEventListener('submit', searchButton);