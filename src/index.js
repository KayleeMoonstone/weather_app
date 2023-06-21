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
}

search("Pretoria");

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchEngine);

//Display current weather
function showcurrentTemp(response) {
  console.log(response.data);
  let windSpeed = Math.round(response.data.wind.speed);
  let windDirection = getWindDirection(response.data.wind.degree);
  let humidity = response.data.temperature.humidity;
  let feels = Math.round(response.data.temperature.feels_like);
  let pressure = response.data.temperature.pressure;

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weatherDescription");
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = capitalizeFirstLetter(
    response.data.condition.description
  );
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  document.getElementById(
    "wind"
  ).textContent = `${windSpeed} km/h ${windDirection}`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("feels-like").textContent = `${feels}°C`;
  document.getElementById("air-pressure").textContent = `${pressure}`;

  function getWindDirection(degrees) {
    let directionArray = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    let index = Math.round((degrees % 360) / 45);
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

//Toggle between Celsius & Fahrenheit
let isCelsius = true; // variable to keep track of the current unit
const temperatureSpan = document.getElementById("temperature");
const toggleButton = document.getElementById("degree-button");

toggleButton.addEventListener("click", function () {
  if (isCelsius) {
    // Convert Celsius to Fahrenheit
    const fahrenheitTemp =
      (parseFloat(temperatureSpan.textContent) * 9) / 5 + 32;
    temperatureSpan.textContent = `${Math.round(fahrenheitTemp)}`;
    toggleButton.textContent = "°F";
    isCelsius = false;
  } else {
    // Convert Fahrenheit to Celsius
    const celsiusTemp =
      ((parseFloat(temperatureSpan.textContent) - 32) * 5) / 9;
    temperatureSpan.textContent = `${Math.round(celsiusTemp)}`;
    toggleButton.textContent = "°C";
    isCelsius = true;
  }
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
