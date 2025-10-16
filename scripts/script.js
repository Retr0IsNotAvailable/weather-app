const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?' +
  'units=metric';

const inputElement = document.querySelector('.js-input');
const buttonElement = document.querySelector('.js-button');
const weatherIconElement = document.querySelector('.js-weather-icon');
const weatherElement = document.querySelector('.weather');
const errorElement = document.querySelector('.error');
const apiKeyElement = document.querySelector('.apiKey-input input');

let apiKey;

// validate API key first
async function validateAPIKey(key) {
  //key = parseInt(key);
  const response = await fetch(apiUrl + `&appid=${key}` + `&q=London`);
  var data = await response.json();

  if (response.ok) {
    alert('API key validated succesfully');
    apiKey = key;
    document.querySelector('.apiKey-input').style.display = 'none';
    document.querySelector('.search').style.display = 'block';
  } else {
    alert(`Invalid API key`);
  }
}

// get weather data and display it
async function checkWeather(city = 'madrid') {
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);
  if (response.status === 404) {
    errorElement.style.display = 'block';

    weatherElement.style.display = 'none';
  } else {
    errorElement.style.display = 'none';

    var data = await response.json();

    document.querySelector('.js-city')
      .innerHTML = data.name;
  
    document.querySelector('.js-temp')
      .innerHTML = `${Math.round(data.main.temp)}&#176;C`;
  
    document.querySelector('.js-humidity')
      .innerHTML = `${data.main.humidity}%`;
  
    document.querySelector('.js-wind')
      .innerHTML = `${Math.round(data.wind.speed)} km/h`;
  
    let weatherCondition = data.weather[0].main.toLowerCase();
    weatherIconElement.src = `./assets/icons/${weatherCondition}.png`;

    weatherElement.style.display = 'block';
  }
}

function searchCity() {
  if (inputElement.value.trim()) {
    const city = inputElement.value.trim();
    inputElement.value = '';

    checkWeather(city);
  } else {
    alert('U must enter a city name!');
    inputElement.value = '';
  }
}

apiKeyElement.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (apiKeyElement.value.trim()) {
      const key = apiKeyElement.value;
      apiKeyElement.value = '';

      validateAPIKey(key);
    } else {
      alert('U must enter an API key');
      apiKeyElement.value = '';
    }
  }
});

buttonElement.addEventListener('click', () => {
  searchCity();
});

inputElement.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchCity();
  }
});