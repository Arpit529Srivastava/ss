function recommendPlan(usageGB) {
  if (usageGB < 10) {
    return "Basic Plan";
  } else if (usageGB <= 50) {
    return "Standard Plan";
  } else if (usageGB <= 100) {
    return "Premium Plan";
  } else {
    return "Unlimited Plan";
  }
}

const charlesUsage = 75;
console.log("Monthly usage: " + charlesUsage + " GB");
console.log("Recommended plan: " + recommendPlan(charlesUsage));
