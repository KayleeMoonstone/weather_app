let apiKey = "515c9ddbeb3cda9061acfab71031839e";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
let apiLat;
let apiLon;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Add a search engine
function searchEngine(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = capitalizeFirstLetter(searchInput.value);
  axios
    .get(`${apiUrl}&q=${searchInput.value}&appid=${apiKey}`)
    .then(showCurrentTemp);
}

let form = document.querySelector("#searchBar");
form.addEventListener("submit", searchEngine);

//Display home weather
let homeBtn = document.querySelector("#homeButton");

function showCurrentLocation(data) {
  let city = data.name;
  let weatherDesc = data.weather[0].description;
  let maxTemp = Math.round(data.main.temp_max);
  let minTemp = Math.round(data.main.temp_min);

  let wind = data.wind;
  let windSpeed = wind.speed;
  let windDirection = getWindDirection(wind.deg);
  let humidity = data.main.humidity;
  let clouds = data.clouds.all;
  let rainfall = data.rain ? data.rain["1h"] : 0;

  let cityElement = document.querySelector("#city");
  let descElement = document.querySelector("#weatherDescription");
  let iconElement = document.querySelector("#weatherIcon");
  let maxElement = document.querySelector("#maxTemp");
  let minElement = document.querySelector("#minTemp");

  document.getElementById(
    "wind"
  ).textContent = `${windSpeed} m/s ${windDirection}`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("cloudCover").textContent = `${clouds}%`;
  document.getElementById("rainfall").textContent = `Last hour: ${rainfall} mm`;

  cityElement.innerHTML = `${city}`;
  descElement.innerHTML = `${weatherDesc}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  maxElement.innerHTML = `${maxTemp}`;
  minElement.innerHTML = `${minTemp}`;

  function getWindDirection(degrees) {
    const directionArray = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45);
    return directionArray[index % 8];
  }
}

homeBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    apiLat = position.coords.latitude;
    apiLon = position.coords.longitude;
    axios
      .get(`${apiUrl}&lat=${apiLat}&lon=${apiLon}&appid=${apiKey}`)
      .then((response) => showCurrentLocation(response.data));
  });
});

//Display current weather
function showCurrentTemp(response) {
  let weatherDesc = response.data.weather[0].description;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);

  let windDirection = getWindDirection(response.data.wind.deg);
  let windSpeed = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let cloudCover = response.data.clouds.all;
  let rainfall = response.data.rain ? response.data.rain["1h"] : 0;

  document.getElementById("weatherDescription").textContent = `${weatherDesc}`;
  document.getElementById("maxTemp").textContent = `${maxTemp}`;
  document.getElementById("minTemp").textContent = `${minTemp}`;
  document.getElementById(
    "wind"
  ).textContent = `${windSpeed} m/s ${windDirection}`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("cloudCover").textContent = `${cloudCover}%`;
  document.getElementById("rainfall").textContent = `Last hour: ${rainfall} mm`;
}

function getWindDirection(degrees) {
  const directionArray = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degrees % 360) / 45);
  return directionArray[index % 8];
}

//Display the date & time
function formatDate(date) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
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
  let dayOfWeek = daysOfWeek[date.getDay()];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${dayOfWeek}, ${day} ${month} ${year} &nbsp; ${hours}:${minutes}`;
}
document.getElementById("currentDateTime").innerHTML = `${formatDate(
  new Date()
)}`;

//Toggle between Celsius & Fahrenheit
let convertBtn = document.getElementById("degreeButton");
let isCelsius = true;

convertBtn.addEventListener("click", () => {
  let currMax = parseFloat(maxTemperature.textContent);
  let currMin = parseFloat(minTemperature.textContent);

  let convertTemperature = (temp) => {
    return isCelsius
      ? Math.round(temp * 1.8 + 32)
      : Math.round((temp - 32) / 1.8);
  };

  let fahrenheit = convertTemperature(currMax);
  let celsius = convertTemperature(currMax);

  maxTemperature.textContent = isCelsius ? fahrenheit : celsius;
  minTemperature.textContent = isCelsius
    ? convertTemperature(currMin)
    : convertTemperature(currMin);

  convertBtn.textContent = isCelsius ? "°F" : "°C";
  isCelsius = !isCelsius;
});

// Extra details tabs toggling
var myTabs = document.getElementById("myTabs");

var tabContents = document.getElementById("myTabContent");

myTabs.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    for (var i = 0; i < myTabs.children.length; i++) {
      myTabs.children[i].firstElementChild.classList.remove("active");
      tabContents.children[i].classList.remove("show", "active");
    }
    var clickedTab = e.target.getAttribute("href").substr(1);
    var activeTab = document.getElementById(clickedTab);
    e.target.classList.add("active");
    activeTab.classList.add("show", "active");
  }
});
