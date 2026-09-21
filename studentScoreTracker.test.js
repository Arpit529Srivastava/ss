var assert = require("assert");
var tracker = require("./studentScoreTracker");

function resetStudents() {
  tracker.students.splice(0, tracker.students.length);
}

var passed = 0;
var failed = 0;

function test(name, fn) {
  try {
    resetStudents();
    fn();
    console.log("PASS: " + name);
    passed += 1;
  } catch (error) {
    console.log("FAIL: " + name);
    console.log("  " + error.message);
    failed += 1;
  }
}

test("empty name is rejected", function () {
  assert.strictEqual(tracker.validateInput("", "80"), "Student name cannot be empty");
});

test("empty score is rejected", function () {
  assert.strictEqual(tracker.validateInput("Sam", ""), "Score cannot be empty");
});

test("non-numeric score is rejected", function () {
  assert.strictEqual(tracker.validateInput("Sam", "abc"), "Score must be a valid number");
});

test("negative score is rejected", function () {
  assert.strictEqual(tracker.validateInput("Jeni", "-67"), "Score cannot be negative");
});

test("valid name and score pass", function () {
  assert.strictEqual(tracker.validateInput("Sam", "68"), "");
});

test("empty list shows Average Score: 0", function () {
  assert.strictEqual(tracker.getAverageText(), "Average Score: 0");
});

test("three students average is 80.33", function () {
  tracker.students.push(
    { name: "Sam", score: 68 },
    { name: "Jacob", score: 80 },
    { name: "Alice", score: 93 }
  );
  assert.strictEqual(tracker.getAverageText(), "Average Score of 3 Students: 80.33");
});

test("removing a student updates the average to 74.00", function () {
  tracker.students.push(
    { name: "Sam", score: 68 },
    { name: "Jacob", score: 80 },
    { name: "Alice", score: 93 }
  );
  tracker.students.splice(2, 1);
  assert.strictEqual(tracker.getAverageText(), "Average Score of 2 Students: 74.00");
});

console.log("");
console.log(passed + " passed, " + failed + " failed");
if (failed > 0) {
  process.exitCode = 1;
}
