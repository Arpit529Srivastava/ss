var students = [];

function validateInput(name, scoreText) {
  if (!name) {
    return "Student name cannot be empty";
  }

  if (scoreText === "") {
    return "Score cannot be empty";
  }

  var score = Number(scoreText);
  if (isNaN(score)) {
    return "Score must be a valid number";
  }

  if (score < 0) {
    return "Score cannot be negative";
  }

  return "";
}

function getAverageText() {
  if (students.length === 0) {
    return "Average Score: 0";
  }

  var total = 0;
  for (var i = 0; i < students.length; i++) {
    total += students[i].score;
  }

  var average = (total / students.length).toFixed(2);
  var label = students.length === 1 ? "Student" : "Students";
  return "Average Score of " + students.length + " " + label + ": " + average;
}

function updateAverage() {
  document.getElementById("average").textContent = getAverageText();
}

function renderList() {
  var list = document.getElementById("scoreList");
  list.innerHTML = "";

  for (var i = 0; i < students.length; i++) {
    (function (index) {
      var item = document.createElement("li");
      item.className = "score-item";
      item.textContent = students[index].name + " - " + students[index].score;
      item.addEventListener("dblclick", function () {
        removeStudent(index);
      });
      list.appendChild(item);
    })(i);
  }

  updateAverage();
}

function addStudent(name, score) {
  students.push({
    name: name,
    score: score
  });
  renderList();
}

function removeStudent(index) {
  students.splice(index, 1);
  renderList();
}

function handleSubmit(event) {
  event.preventDefault();

  var nameInput = document.getElementById("studentName");
  var scoreInput = document.getElementById("studentScore");
  var error = document.getElementById("error");

  var name = nameInput.value.trim();
  var scoreText = scoreInput.value.trim();
  var message = validateInput(name, scoreText);

  error.textContent = message;
  if (message) {
    return;
  }

  addStudent(name, Number(scoreText));
  nameInput.value = "";
  scoreInput.value = "";
}

if (typeof document !== "undefined") {
  var form = document.getElementById("scoreForm");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateInput: validateInput,
    getAverageText: getAverageText,
    addStudent: addStudent,
    removeStudent: removeStudent,
    students: students
  };
}
