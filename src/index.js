//Capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Search city
function search(city) {
  let apiKey = "0692fo34ta96a0891b1779bcbc4d983f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showcurrentTemp);
}

//Search engine
function searchEngine(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

search("Pretoria");

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchEngine);

//Display current weather
function showcurrentTemp(response) {
  console.log(response.data);
  let wind = response.data.wind;
  let windSpeed = Math.round(wind.speed);
  let windDirection = getWindDirection(wind.degree);
  let humidity = response.data.temperature.humidity;
  let feels = Math.round(response.data.temperature.feels_like);
  let pressure = response.data.temperature.pressure;

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weatherDescription");
  let temperatureElement = document.querySelector("#temperature");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = capitalizeFirstLetter(
    response.data.condition.description
  );
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  document.getElementById(
    "wind"
  ).textContent = `${windSpeed} km/h ${windDirection}`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("feels-like").textContent = `${feels}°C`;
  document.getElementById("air-pressure").textContent = `${pressure}`;

  function getWindDirection(degrees) {
    const directionArray = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45);
    return directionArray[index % 8];
  }
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

//Display home weather
let homeBtn = document.querySelector("#homeButton");

function showCurrentLocation(data) {
  let wind = response.data.wind;
  let windSpeed = Math.round(wind.speed);
  let windDirection = getWindDirection(wind.degree);
  let humidity = response.data.temperature.humidity;
  let feels = Math.round(response.data.temperature.feels_like);
  let pressure = response.data.temperature.pressure;

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weatherDescription");
  let temperatureElement = document.querySelector("#temperature");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = capitalizeFirstLetter(
    response.data.condition.description
  );
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  document.getElementById(
    "wind"
  ).textContent = `${windSpeed} km/h ${windDirection}`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("feels-like").textContent = `${feels}°C`;
  document.getElementById("air-pressure").textContent = `${pressure}`;

  function getWindDirection(degrees) {
    const directionArray = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45);
    return directionArray[index % 8];
  }
}

homeBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    apiLat = position.data.coordinates.latitude;
    apiLon = position.data.coordinates.longitude;
    axios
      .get(`${apiUrl}&lat=${apiLat}&lon=${apiLon}`)
      .then((response) => showCurrentLocation(response.data));
  });
});

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
