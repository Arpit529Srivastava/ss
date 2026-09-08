// Determines the day of the week for a movie release date and whether it falls on a weekend.
function displayDay(releaseDate) {
  const date = new Date(releaseDate);

  // Validate the provided date.
  if (isNaN(date.getTime())) {
    return "Error: Invalid date provided.";
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = date.getDay();
  const dayName = days[dayIndex];
  const isWeekend = dayIndex === 0 || dayIndex === 6;

  if (isWeekend) {
    return "The movie is scheduled to release on " + dayName + ". It's a weekend!";
  }

  return "The movie is scheduled to release on " + dayName + ".";
}

console.log(displayDay("2024-06-14"));
console.log(displayDay("2024-06-15"));
console.log(displayDay("2024-06-16"));
console.log(displayDay("invalid-date"));

module.exports = displayDay;
