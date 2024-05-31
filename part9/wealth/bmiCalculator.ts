const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height/100)^2)

  if (bmi < 25) return bmi.toFixed(2) + ' Normal (healthy weight)'
  else if (bmi >= 25 && bmi < 30) return bmi.toFixed(2) + ' Overweight (unhealthy weight)'
  else return bmi.toFixed(2) + ' Obesity (dangerous weight)'
}

if (process.argv.length < 4) throw new Error('Not enough arguments');
if (process.argv.length > 4) throw new Error('Too many arguments');

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');

try {
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Error when calculating BMI. '
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
