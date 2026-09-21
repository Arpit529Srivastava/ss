var assert = require("assert");
var smartHome = require("./smartHomeAppliances");

function resetAppliances() {
  smartHome.appliances.TV = false;
  smartHome.appliances.Lamp = false;
  smartHome.appliances.Oven = false;
}

function captureLogs(fn) {
  var logs = [];
  var originalLog = console.log;
  console.log = function () {
    logs.push(Array.prototype.slice.call(arguments).join(" "));
  };
  try {
    fn();
  } finally {
    console.log = originalLog;
  }
  return logs;
}

var passed = 0;
var failed = 0;

function test(name, fn) {
  try {
    resetAppliances();
    fn();
    console.log("PASS: " + name);
    passed += 1;
  } catch (error) {
    console.log("FAIL: " + name);
    console.log("  " + error.message);
    failed += 1;
  }
}

test("turns appliances on and off", function () {
  assert.strictEqual(smartHome.turnOnAppliance(smartHome.TV), "TV is turned on.");
  assert.strictEqual(smartHome.turnOnAppliance(smartHome.Lamp), "Lamp is turned on.");
  assert.strictEqual(smartHome.turnOffAppliance(smartHome.TV), "TV is turned off.");
  assert.strictEqual(smartHome.appliances.TV, false);
  assert.strictEqual(smartHome.appliances.Lamp, true);
});

test("throws when turning on an appliance that is already on", function () {
  smartHome.turnOnAppliance(smartHome.Oven);
  assert.throws(function () {
    smartHome.turnOnAppliance(smartHome.Oven);
  }, /Oven is already turned on\./);
});

test("throws when turning off an appliance that is already off", function () {
  assert.throws(function () {
    smartHome.turnOffAppliance(smartHome.TV);
  }, /TV is already turned off\./);
});

test("sample program handles the error and always completes", function () {
  var logs = captureLogs(function () {
    smartHome.runProgram();
  });

  assert.deepStrictEqual(logs, [
    "TV is turned on.",
    "Lamp is turned on.",
    "Oven is turned on.",
    "TV is turned off.",
    "Lamp is turned off.",
    "Oven is turned off.",
    "An error occurred: TV is already turned off.",
    "program completed"
  ]);
});

console.log("");
console.log(passed + " passed, " + failed + " failed");
if (failed > 0) {
  process.exitCode = 1;
}
