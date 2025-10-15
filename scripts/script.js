const apiKey = 'c3e548f6786068b9807ffb978f6d1e24';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?' +
  'units=metric&q=germany';
  
async function checkWeather() {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);
}

checkWeather();