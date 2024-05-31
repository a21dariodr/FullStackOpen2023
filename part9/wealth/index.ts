import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';

type bmiResult = {
  weight: number,
  height: number,
  bmi: string
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  if (!req.query.height || isNaN(Number(req.query.height))
    || !req.query.weight || isNaN(Number(req.query.weight))) {
    return res.status(400).send({
      error: "both height and weigth are needed, and they must be numbers"
    })
  }
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  const bmi = calculateBmi(height, weight)

  const bmiResult: bmiResult = {
    weight,
    height,
    bmi
  }

  return res.send(bmiResult)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});