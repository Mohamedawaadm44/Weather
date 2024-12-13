const today = {
  todayName: document.getElementById("todayName"),
  todayDate: document.getElementById("todayDate"),
  cityName: document.getElementById("cityName"),
  todayTemp: document.getElementById("todayTemp"),
  todayImage: document.getElementById("todayImage"),
  todayHumidity: document.getElementById("todayHumidity"),
  HumidityPercentage: document.getElementById("HumidityPercentage"),
  windSpeed: document.getElementById("windSpeed"),
  windDirection: document.getElementById("windDirection"),
};

const NextDay = {
  NextdayName: document.getElementById("NextdayName"),
  NextdayImage: document.getElementById("NextdayImage"),
  NextdayTemp: document.getElementById("NextdayTemp"),
  NextdaySmallTemp: document.getElementById("NextdaySmallTemp"),
  NextdayHumidity: document.getElementById("NextdayHumidity"),
};

const NextNextDay = {
  NextNextdayName: document.getElementById("NextNextdayName"),
  NextNextdayImage: document.getElementById("NextNextdayImage"),
  NextNextdayTemp: document.getElementById("NextNextdayTemp"),
  NextNextdaySmallTemp: document.getElementById("NextNextdaySmallTemp"),
  NextNextHumidity: document.getElementById("NextNextHumidity"),
};

var searchBtn = document.getElementById("searchBtn");
var searchInput = document.getElementById("searchInput");

function forcastingWeather(cityName = "cairo") {
  let httpreqForcasting = new XMLHttpRequest();
  httpreqForcasting.open(
    "GET",
    `http://api.weatherapi.com/v1/forecast.json?key=c048f339f1e74129b89212059240912&q=${cityName}&days=3`
  );
  httpreqForcasting.send();

  httpreqForcasting.addEventListener("load", function () {
    var response = JSON.parse(httpreqForcasting.response);
    today.todayName.innerHTML = getDayName(response.location.localtime);
    today.todayDate.innerHTML =
      getDayNum(response.location.localtime) +
      " " +
      getMonthName(response.location.localtime);
    today.cityName.innerHTML = response.location.name;
    today.todayTemp.innerHTML = response.current.temp_c;
    today.todayImage.setAttribute("src", response.current.condition.icon);
    today.todayHumidity.innerHTML = response.current.condition.text;
    today.windSpeed.innerHTML = response.current.wind_kph;
    today.HumidityPercentage.innerHTML = response.current.humidity + "%";
    NextDay.NextdayName.innerHTML = getDayName(
      response.forecast.forecastday[1].date
    );
    NextDay.NextdayImage.setAttribute(
      "src",
      response.forecast.forecastday[1].day.condition.icon
    );
    NextDay.NextdayHumidity.innerHTML =
      response.forecast.forecastday[1].day.condition.text;
    NextDay.NextdayTemp.innerHTML =
      response.forecast.forecastday[1].day.maxtemp_c;
    NextDay.NextdaySmallTemp.innerHTML =
      response.forecast.forecastday[1].day.mintemp_c;

    NextNextDay.NextNextdayName.innerHTML = getDayName(
      response.forecast.forecastday[2].date
    );
    NextNextDay.NextNextdayImage.setAttribute(
      "src",
      response.forecast.forecastday[2].day.condition.icon
    );
    NextNextDay.NextNextHumidity.innerHTML =
      response.forecast.forecastday[2].day.condition.text;
    NextNextDay.NextNextdayTemp.innerHTML =
      response.forecast.forecastday[2].day.maxtemp_c;
    NextNextDay.NextNextdaySmallTemp.innerHTML =
      response.forecast.forecastday[2].day.mintemp_c;
  });
}

function getDayNum(date) {
  const d = new Date(date);
  return d.getDate();
}

function getDayName(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date(date);
  let day = days[d.getDay()];
  return day;
}

function getMonthName(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date(date);
  let month = months[d.getMonth()];
  return month;
}

forcastingWeather();

searchBtn.addEventListener("click", function () {
  forcastingWeather(searchInput.value);
});

searchInput.addEventListener("keypress", function () {
  forcastingWeather(searchInput.value);
});
