var weatherDataset = {
  Sydney: 28,
  London: 15,
  Tokyo: 22,
  NewYork: 19
};

function fetchWeatherAPI(city) {
  return new Promise(function (resolve, reject) {
    var cityName = city == null ? "" : String(city).trim();

    if (!cityName) {
      reject("City name is missing");
      return;
    }

    var matchedKey = Object.keys(weatherDataset).find(function (key) {
      return key.toLowerCase() === cityName.toLowerCase();
    });

    if (!matchedKey) {
      reject("City not found");
      return;
    }

    resolve(weatherDataset[matchedKey]);
  });
}

function displayResult(message) {
  if (typeof document === "undefined") {
    return;
  }

  var output = document.getElementById("output");
  if (!output) {
    return;
  }

  var line = document.createElement("p");
  line.textContent = message;
  output.appendChild(line);
}

function clearOutput() {
  if (typeof document === "undefined") {
    return;
  }

  var output = document.getElementById("output");
  if (output) {
    output.innerHTML = "";
  }
}

async function getWeather(city) {
  clearOutput();

  try {
    var cityName = city == null ? "" : String(city).trim();
    var temperature = await fetchWeatherAPI(cityName);
    var successMessage = "Temperature in " + cityName + " is " + temperature + "°C";
    console.log(successMessage);
    displayResult(successMessage);
    return successMessage;
  } catch (error) {
    var errorMessage = "Failed to fetch weather: " + error;
    console.log(errorMessage);
    displayResult(errorMessage);
    return errorMessage;
  } finally {
    console.log("Weather check completed");
    displayResult("Weather check completed");
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("weather-form");
    var input = document.getElementById("city");
    if (!form || !input) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      getWeather(input.value);
    });
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    weatherDataset: weatherDataset,
    fetchWeatherAPI: fetchWeatherAPI,
    getWeather: getWeather
  };
}

if (typeof require !== "undefined" && require.main === module) {
  (async function runDemo() {
    await getWeather("Sydney");
    await getWeather("");
    await getWeather("Brazil");
  })();
}
