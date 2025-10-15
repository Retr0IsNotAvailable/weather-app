const apiKey = 'c3e548f6786068b9807ffb978f6d1e24';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?' +
  'units=metric';

const inputElement = document.querySelector('.js-input');
const buttonElement = document.querySelector('.js-button');
const weatherIconElement = document.querySelector('.js-weather-icon');
  
async function checkWeather(city = 'madrid') {
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);
  var data = await response.json();

  document.querySelector('.js-city')
    .innerHTML = data.name;
  
  document.querySelector('.js-temp')
    .innerHTML = `${Math.round(data.main.temp)}&#176;C`;
  
  document.querySelector('.js-humidity')
    .innerHTML = `${data.main.humidity}%`;
  
  document.querySelector('.js-wind')
    .innerHTML = `${Math.round(data.wind.speed)} km/h`;
  
  switch (data.weather[0].main) {
    case 'Clouds':
      weatherIconElement.src = './assets/icons/clouds.png';
      break;
    case 'Clear':
      weatherIconElement.src = './assets/icons/clear.png';
      break;
    case 'Rain':
      weatherIconElement.src = './assets/icons/rain.png';
      break;
    case 'Drizzle':
      weatherIconElement.src = './assets/icons/drizzle.png';
      break;
    case 'Mist':
      weatherIconElement.src = './assets/icons/mist.png';
      break;
    default:
      break;
  }
  document.querySelector('.weather')
    .style.display = 'block';
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