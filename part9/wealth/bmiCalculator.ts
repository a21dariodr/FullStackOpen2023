const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height/100)^2)

  if (bmi < 25) return bmi.toFixed(2) + ' Normal (healthy weight)'
  else if (bmi >= 25 && bmi < 30) return bmi.toFixed(2) + ' Overweight (unhealthy weight)'
  else return bmi.toFixed(2) + ' Obesity (dangerous weight)'
}

console.log(calculateBmi(180, 74))