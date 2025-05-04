const apiKey = "a005dd68afa8b46fa9478cc705d8bf2f"; // अपनी OpenWeather API key यहाँ डालें

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetchWeather(url);
      },
      (error) => {
        alert("Location permission denied.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then(data => {
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" />
      `;
      document.getElementById("weatherResult").innerHTML = weatherHTML;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
    });
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
