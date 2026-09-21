var assert = require("assert");
var weather = require("./weatherData");

function captureLogs(task) {
  var logs = [];
  var originalLog = console.log;

  console.log = function () {
    logs.push(Array.prototype.slice.call(arguments).join(" "));
  };

  return Promise.resolve()
    .then(task)
    .then(function (result) {
      return { logs: logs, result: result };
    })
    .finally(function () {
      console.log = originalLog;
    });
}

async function runTests() {
  var passed = 0;
  var failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log("PASS: " + name);
      passed += 1;
    } catch (error) {
      console.log("FAIL: " + name);
      console.log("  " + error.message);
      failed += 1;
    }
  }

  await test("Sydney returns 28°C and completes", async function () {
    var captured = await captureLogs(function () {
      return weather.getWeather("Sydney");
    });

    assert.strictEqual(captured.logs[0], "Temperature in Sydney is 28°C");
    assert.strictEqual(captured.logs[1], "Weather check completed");
    assert.strictEqual(captured.logs.length, 2);
    assert.strictEqual(captured.result, "Temperature in Sydney is 28°C");
  });

  await test("empty city name is missing and still completes", async function () {
    var captured = await captureLogs(function () {
      return weather.getWeather("");
    });

    assert.strictEqual(captured.logs[0], "Failed to fetch weather: City name is missing");
    assert.strictEqual(captured.logs[1], "Weather check completed");
    assert.strictEqual(captured.result, "Failed to fetch weather: City name is missing");
  });

  await test("unknown city is not found and still completes", async function () {
    var captured = await captureLogs(function () {
      return weather.getWeather("Brazil");
    });

    assert.strictEqual(captured.logs[0], "Failed to fetch weather: City not found");
    assert.strictEqual(captured.logs[1], "Weather check completed");
    assert.strictEqual(captured.result, "Failed to fetch weather: City not found");
  });

  await test("whitespace-only city is treated as missing", async function () {
    var captured = await captureLogs(function () {
      return weather.getWeather("   ");
    });

    assert.strictEqual(captured.logs[0], "Failed to fetch weather: City name is missing");
    assert.strictEqual(captured.logs[1], "Weather check completed");
  });

  await test("undefined city is treated as missing", async function () {
    var captured = await captureLogs(function () {
      return weather.getWeather();
    });

    assert.strictEqual(captured.logs[0], "Failed to fetch weather: City name is missing");
    assert.strictEqual(captured.logs[1], "Weather check completed");
  });

  await test("city lookup is case-insensitive", async function () {
    var captured = await captureLogs(function () {
      return weather.getWeather("sydney");
    });

    assert.strictEqual(captured.logs[0], "Temperature in sydney is 28°C");
    assert.strictEqual(captured.logs[1], "Weather check completed");
  });

  await test("other known cities resolve from the mock API", async function () {
    assert.strictEqual(await weather.fetchWeatherAPI("London"), 15);
    assert.strictEqual(await weather.fetchWeatherAPI("Tokyo"), 22);
    assert.strictEqual(await weather.fetchWeatherAPI("NewYork"), 19);
  });

  await test("mock API rejects missing and unknown cities", async function () {
    await assert.rejects(function () {
      return weather.fetchWeatherAPI("");
    }, /City name is missing/);

    await assert.rejects(function () {
      return weather.fetchWeatherAPI("Brazil");
    }, /City not found/);
  });

  console.log("");
  console.log(passed + " passed, " + failed + " failed");

  if (failed > 0) {
    process.exitCode = 1;
  }
}

runTests();
