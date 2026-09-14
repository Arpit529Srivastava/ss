function validateProductCode(code) {
  var pattern = /^#[A-Z]{4}\d{3}$/;
  if (pattern.test(code)) {
    return "Product code verified successfully";
  }
  return "Product code is not valid";
}

console.log(validateProductCode("#ABCD123"));
console.log(validateProductCode("#abc1234"));
