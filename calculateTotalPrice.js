function calculateTotalPrice(bikeName, engineCapacity, gstPercentage, showroomPrice) {
  const gstAmount = (showroomPrice * gstPercentage) / 100;
  const totalCost = showroomPrice + gstAmount;

  return `${bikeName} ${engineCapacity}cc price: ${showroomPrice}
Total GST: ${gstAmount}
Cost in total: ${totalCost}`;
}

console.log(calculateTotalPrice('Honda Shine', 125, 18, 75000));
