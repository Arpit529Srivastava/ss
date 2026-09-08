// Base class representing a regular bike.
class Bike {
  constructor(brand, color, speed) {
    this.brand = brand;
    this.color = color;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 20;
    console.log(this.brand + " is accelerating. Speed is now " + this.speed + " km/h.");
  }

  brake() {
    this.speed -= 10;
    console.log(this.brand + " is braking. Speed is now " + this.speed + " km/h.");
  }

  stop() {
    this.speed = 0;
    console.log(this.brand + " has stopped.");
  }
}

// Electric bike inherits Bike and adds battery behavior.
class ElectricBike extends Bike {
  constructor(brand, color, speed, batteryCapacity, currentCharge, distance) {
    super(brand, color, speed);
    this.batteryCapacity = batteryCapacity;
    this.currentCharge = currentCharge;
    this.distance = distance;
  }

  // Override accelerate to include a battery check.
  accelerate() {
    if (this.currentCharge <= 0) {
      console.log(this.brand + " cannot accelerate. Battery is empty.");
      return;
    }
    this.speed += 15;
    this.currentCharge -= 5;
    const percent = (this.currentCharge / this.batteryCapacity) * 100;
    console.log(
      this.brand +
        " (Electric) is accelerating. Speed: " +
        this.speed +
        " km/h. Battery: " +
        percent +
        "%."
    );
  }

  chargeBattery() {
    this.currentCharge = this.batteryCapacity;
    console.log(this.brand + "'s battery is now fully charged.");
  }

  displayBatteryStatus() {
    const percent = (this.currentCharge / this.batteryCapacity) * 100;
    console.log(this.brand + " battery charge: " + percent + "%.");
  }
}

// Sample run: Normal Bike
const normalBike = new Bike("Hero", "Red", 0);
normalBike.accelerate();
normalBike.brake();
normalBike.stop();

// Sample run: Electric Bike
const eBike = new ElectricBike("TeslaBike", "Black", 0, 100, 40, 10);
eBike.displayBatteryStatus();
eBike.accelerate();
eBike.accelerate();
eBike.brake();
eBike.stop();
eBike.chargeBattery();
eBike.displayBatteryStatus();

module.exports = { Bike, ElectricBike };
