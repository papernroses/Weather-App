const apiKey = "0b689b1f971b4304524e2432afa2bd81";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherBox = document.getElementById("weatherBox");

  if (!city) {
    weatherBox.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const cityEncoded = encodeURIComponent(city);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityEncoded},IN&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const cityName = data.name;
      const mainWeather = data.weather[0].main;

      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      weatherBox.innerHTML = `
        <h2>${cityName}</h2>
        <img class="weather-icon" src="${iconUrl}" alt="${desc}" />
        <p style="text-transform: capitalize;">${desc}</p>
        <p>🌡️ Temperature: ${temp} °C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬️ Wind Speed: ${wind} m/s</p>
      `;

      changeBackground(mainWeather);
    } else {
      weatherBox.innerHTML = `<p>❌ City not found. Try again!</p>`;
    }
  } catch (error) {
    weatherBox.innerHTML = `<p>⚠️ Error fetching data. Please try again later.</p>`;
    console.error(error);
  }
}

function changeBackground(weatherType) {
  const body = document.body;

  switch (weatherType.toLowerCase()) {
    case "clear":
      body.style.background = "linear-gradient(135deg, #f9d423, #ff4e50)";
      break;
    case "clouds":
      body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
      break;
    case "rain":
      body.style.background = "linear-gradient(135deg, #667db6, #0082c8, #667db6)";
      break;
    case "drizzle":
      body.style.background = "linear-gradient(135deg, #74ebd5, #ACB6E5)";
      break;
    case "thunderstorm":
      body.style.background = "linear-gradient(135deg, #232526, #414345)";
      break;
    case "snow":
      body.style.background = "linear-gradient(135deg, #E0EAFC, #CFDEF3)";
      break;
    case "haze":
    case "mist":
    case "fog":
      body.style.background = "linear-gradient(135deg, #3E5151, #DECBA4)";
      break;
    default:
      body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
  }
}
