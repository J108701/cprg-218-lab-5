// Function to fetch weather data for a specified city
async function fetchWeatherForCity(city) {
  const apiKey = "8e8db7d12057f5f757bdf7252d842422"; // Use your correct API key
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); // Log the API response for debugging
      if (data) {
          displayWeatherData(data, 'weather-info'); // Pass the correct container ID here
      }
  } catch (error) {
      console.error("Error fetching weather data:", error);
  }
}

// Function to display the weather data in the specified container
function displayWeatherData(weatherData, containerElementId) {
  const container = document.getElementById(containerElementId);
  if (!container) {
      console.error("The container element was not found.");
      return;
  }

  const { location, current } = weatherData;
  const content = `
      <div class="weather-card">
          <h3>${location.name}, ${location.country}</h3>
          <p>${current.weather_descriptions[0]}</p >
          < img src="${current.weather_icons[0]}" alt="${current.weather_descriptions[0]}">
          <p>Temperature: ${current.temperature}°C</p >
          <p>Wind: ${current.wind_speed} km/h, Direction: ${current.wind_dir}</p >
      </div>
  `;
  container.innerHTML = content;
}

// Function to populate a dropdown with city options
function populateDropdown() {
  const cities = ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"];
  const dropdown = document.getElementById('dropdown');
  cities.forEach(city => {
      let option = document.createElement('option');
      option.value = city;
      option.innerText = city;
      dropdown.appendChild(option);
  });
}

// Initialize the dropdown and set up the click event listener for the submit button
function initialize() {
  populateDropdown();
  document.getElementById('submit-button').addEventListener('click', async () => {
      const selectedCity = document.getElementById('dropdown').value;
      await fetchWeatherForCity(selectedCity);
  });
}

// Call the initialize function to set everything up
initialize();