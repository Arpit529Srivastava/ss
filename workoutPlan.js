let workout;
const day = 7;

switch (day) {
  case 1:
    workout = "Chest Day";
    break;
  case 2:
    workout = "Back Day";
    break;
  case 3:
    workout = "Leg Day";
    break;
  case 4:
    workout = "Shoulder Day";
    break;
  case 5:
    workout = "Arm Day";
    break;
  case 6:
    workout = "Cardio Day";
    break;
  case 7:
    workout = "Rest Day";
    break;
  default:
    workout = "Invalid day";
    break;
}

if (workout === "Invalid day") {
  console.log("Invalid day. Please enter a number between 1 and 7.");
} else {
  console.log("Day " + day + ": " + workout);
}
