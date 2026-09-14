var weatherDataset = {
  Sydney: 28,
  London: 15,
  Tokyo: 22,
  NewYork: 19
};

function fetchWeatherAPI(city) {
  return new Promise(function (resolve, reject) {
    if (!city) {
      reject("City name is missing");
      return;
    }
    if (!weatherDataset.hasOwnProperty(city)) {
      reject("City not found");
      return;
    }
    resolve(weatherDataset[city]);
  });
}

async function getWeather(city) {
  try {
    var temperature = await fetchWeatherAPI(city);
    console.log("Temperature in " + city + " is " + temperature + "°C");
  } catch (error) {
    console.log("Failed to fetch weather: " + error);
  } finally {
    console.log("Weather check completed");
  }
}

getWeather("Sydney");
getWeather("");
getWeather("Brazil");
