var assert = require("assert");
var form = require("./registrationForm");

var passed = 0;
var failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log("PASS: " + name);
    passed += 1;
  } catch (error) {
    console.log("FAIL: " + name);
    console.log("  " + error.message);
    failed += 1;
  }
}

test("empty name is required", function () {
  assert.strictEqual(form.validateName(""), "Name is required.");
  assert.strictEqual(form.validateName("   "), "Name is required.");
});

test("valid name passes", function () {
  assert.strictEqual(form.validateName("Arpit"), "");
});

test("empty email is required", function () {
  assert.strictEqual(form.validateEmail(""), "Email is required.");
});

test("invalid email format is rejected", function () {
  assert.strictEqual(
    form.validateEmail("abc"),
    "Enter a valid email, for example: abc@example.com."
  );
});

test("valid email passes", function () {
  assert.strictEqual(form.validateEmail("abc@example.com"), "");
});

test("empty password is required", function () {
  assert.strictEqual(form.validatePassword(""), "Password is required.");
});

test("weak password is rejected", function () {
  var message = "Password must be at least 8 characters, with one uppercase letter and one number.";
  assert.strictEqual(form.validatePassword("short1A"), message);
  assert.strictEqual(form.validatePassword("nouppercase1"), message);
  assert.strictEqual(form.validatePassword("NoNumberHere"), message);
});

test("strong password passes", function () {
  assert.strictEqual(form.validatePassword("Password1"), "");
});

test("empty confirm password asks for confirmation", function () {
  assert.strictEqual(form.validateConfirmPassword("Password1", ""), "Please confirm your password.");
});

test("mismatched confirm password is rejected", function () {
  assert.strictEqual(form.validateConfirmPassword("Password1", "Password2"), "Passwords do not match.");
});

test("matching confirm password passes", function () {
  assert.strictEqual(form.validateConfirmPassword("Password1", "Password1"), "");
});

test("empty form matches the sample screenshot errors", function () {
  var errors = form.validateFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  assert.strictEqual(errors.name, "Name is required.");
  assert.strictEqual(errors.email, "Email is required.");
  assert.strictEqual(errors.password, "Password is required.");
  assert.strictEqual(errors.confirmPassword, "Please confirm your password.");
  assert.strictEqual(form.isFormValid(errors), false);
});

test("complete valid form is accepted", function () {
  var errors = form.validateFormData({
    name: "Arpit",
    email: "abc@example.com",
    password: "Password1",
    confirmPassword: "Password1"
  });
  assert.strictEqual(form.isFormValid(errors), true);
});

console.log("");
console.log(passed + " passed, " + failed + " failed");
if (failed > 0) {
  process.exitCode = 1;
}
