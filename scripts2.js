async function fetchWeatherForCity(city) {
    const apiKey = "8e8db7d12057f5f757bdf7252d842422"; // 确保这是你的正确API密钥
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // 检查API响应
        if (data) {
            displayWeatherData(data, 'weather-info'); // 确保传递正确的容器ID
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }

}
function displayWeatherData(weatherData, containerElementId) {
    const container = document.getElementById(containerElementId);
    const { location, current } = weatherData;
    const content = `
        <div class="weather-card">
            <h3>${location.name}, ${location.country}</h3>
            <p>${current.weather_descriptions[0]}</p>
            <img src="${current.weather_icons[0]}" alt="${current.weather_descriptions[0]}">
            <p>Temperature: ${current.temperature}°C</p>
            <p>Wind: ${current.wind_speed} km/h, Direction: ${current.wind_dir}</p>
        </div>
    `;
    container.innerHTML = content;
}
const cities = ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"];

function populateDropdown() {
  const dropdown = document.getElementById('dropdown');
  cities.forEach(city => {
    let option = document.createElement('option');
    option.value = city;
    option.innerText = city;
    dropdown.appendChild(option);
  });
}

populateDropdown();
document.getElementById('submit-button').addEventListener('click', async () => {
    const selectedCity = document.getElementById('dropdown').value;
    await fetchWeatherForCity(selectedCity);
  });
  async function fetchWeatherForCity(city) {
    const apiKey = "8e8db7d12057f5f757bdf7252d842422"; // Use your correct API key
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        displayWeatherData(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  function displayWeatherData(weatherData) {
    const weatherContainer = document.getElementById('weather-info');
    const { location, current } = weatherData;
    const content = `
      <div>
        <h3>${location.name}, ${location.country}</h3>
        <p>Temperature: ${current.temperature}°C</p>
        <p>${current.weather_descriptions[0]}</p>
        <img src="${current.weather_icons[0]}" alt="Weather Icon">
        <p>Wind Speed: ${current.wind_speed} km/h</p>
        <p>Humidity: ${current.humidity}%</p>
      </div>
    `;
  
    weatherContainer.innerHTML = content;
  }
    