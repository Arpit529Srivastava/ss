function validateName(name) {
  if (!name || !String(name).trim()) {
    return "Name is required.";
  }
  return "";
}

function validateEmail(email) {
  var value = email == null ? "" : String(email).trim();
  if (!value) {
    return "Email is required.";
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return "Enter a valid email, for example: abc@example.com.";
  }
  return "";
}

function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must be at least 8 characters, with one uppercase letter and one number.";
  }
  return "";
}

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return "Please confirm your password.";
  }
  if (confirmPassword !== password) {
    return "Passwords do not match.";
  }
  return "";
}

function validateFormData(data) {
  return {
    name: validateName(data.name),
    email: validateEmail(data.email),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(data.password, data.confirmPassword)
  };
}

function isFormValid(errors) {
  return !errors.name && !errors.email && !errors.password && !errors.confirmPassword;
}

function handleSubmit(event) {
  event.preventDefault();

  var errors = validateFormData({
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value
  });

  document.getElementById("nameError").textContent = errors.name;
  document.getElementById("emailError").textContent = errors.email;
  document.getElementById("passwordError").textContent = errors.password;
  document.getElementById("confirmPasswordError").textContent = errors.confirmPassword;

  var success = document.getElementById("success");
  if (isFormValid(errors)) {
    success.textContent = "Registration successful.";
  } else {
    success.textContent = "";
  }
}

if (typeof document !== "undefined") {
  var form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateName: validateName,
    validateEmail: validateEmail,
    validatePassword: validatePassword,
    validateConfirmPassword: validateConfirmPassword,
    validateFormData: validateFormData,
    isFormValid: isFormValid
  };
}
