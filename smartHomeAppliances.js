var appliances = {
  TV: false,
  Lamp: false,
  Oven: false
};

var TV = "TV";
var Lamp = "Lamp";
var Oven = "Oven";

function turnOnAppliance(appliance) {
  if (appliances[appliance]) {
    throw new Error(appliance + " is already turned on.");
  }
  appliances[appliance] = true;
  return appliance + " is turned on.";
}

function turnOffAppliance(appliance) {
  if (!appliances[appliance]) {
    throw new Error(appliance + " is already turned off.");
  }
  appliances[appliance] = false;
  return appliance + " is turned off.";
}

function runProgram() {
  try {
    console.log(turnOnAppliance(TV));
    console.log(turnOnAppliance(Lamp));
    console.log(turnOnAppliance(Oven));
    console.log(turnOffAppliance(TV));
    console.log(turnOffAppliance(Lamp));
    console.log(turnOffAppliance(Oven));
    console.log(turnOffAppliance(TV));
  } catch (error) {
    console.log("An error occurred: " + error.message);
  } finally {
    console.log("program completed");
  }
}

if (typeof require !== "undefined" && require.main === module) {
  runProgram();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    appliances: appliances,
    TV: TV,
    Lamp: Lamp,
    Oven: Oven,
    turnOnAppliance: turnOnAppliance,
    turnOffAppliance: turnOffAppliance,
    runProgram: runProgram
  };
}
