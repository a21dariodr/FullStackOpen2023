/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';
import calculateExercises, { ExercisesResult } from './exerciseCalculator';

type bmiResult = {
  weight: number,
  height: number,
  bmi: string
};

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || isNaN(Number(req.query.height))
    || !req.query.weight || isNaN(Number(req.query.weight))) {
    return res.status(400).send({
      error: "both height and weigth are needed, and they must be numbers"
    });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);

  const bmiResult: bmiResult = {
    weight,
    height,
    bmi
  };

  return res.send(bmiResult);
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).send({ error: 'parameters missing'});
  }

  const target: number = Number(req.body.target);
  if (isNaN(target)) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  const dailyHoursArgs: string[] = req.body.daily_exercises;
  let parseHoursError = false;
  const dailyHours: number[] = dailyHoursArgs.map(dailyHour => {
    const hour = Number(dailyHour);
    if (isNaN(hour)) {
      parseHoursError = true;
    }
    return hour;
  });
  if (parseHoursError) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  const result: ExercisesResult = calculateExercises(dailyHours, target);

  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});