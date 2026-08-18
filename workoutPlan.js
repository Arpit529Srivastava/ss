function getWorkoutOfTheDay(day) {
  switch (day) {
    case 1:
      return "Chest Day";
    case 2:
      return "Back Day";
    case 3:
      return "Leg Day";
    case 4:
      return "Shoulder Day";
    case 5:
      return "Arm Day";
    case 6:
      return "Cardio Day";
    case 7:
      return "Rest Day";
    default:
      return "Invalid day";
  }
}

const day = 7;
const workout = getWorkoutOfTheDay(day);

if (workout === "Invalid day") {
  console.log("Invalid day. Please enter a number between 1 and 7.");
} else {
  console.log("Day " + day + ": " + workout);
}
