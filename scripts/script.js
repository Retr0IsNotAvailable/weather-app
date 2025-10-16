const apiKey = 'c3e548f6786068b9807ffb978f6d1e24';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?' +
  'units=metric';

const inputElement = document.querySelector('.js-input');
const buttonElement = document.querySelector('.js-button');
const weatherIconElement = document.querySelector('.js-weather-icon');
const weatherElement = document.querySelector('.weather');
const errorElement = document.querySelector('.error');
  
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

buttonElement.addEventListener('click', () => {
  searchCity();
});

inputElement.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchCity();
  }
});