export interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
type ratings = {
  rating: number,
  description: string
};

type exerciseParams = {
  target: number,
  dailyHours: number[]
};

const calculateExercises = (exerciseHours: number[], target: number): ExercisesResult => {
  const trainingDays: number = exerciseHours.reduce((totalDays, hours): number => {
    if (hours > 0) return ++totalDays;
    return totalDays;
  }, 0);

  const totalHours: number = exerciseHours.reduce((totalHours, hours): number => {
    return totalHours + hours;
  }, 0);

  const average: number = totalHours / exerciseHours.length;

  const targetDifference: number = average - target;
  const ratings: ratings = targetDifference < 0
    ? { rating: 1, description: 'What a fail! You need many more exercise!' }
    : targetDifference/target < 0.5
      ? { rating: 2, description: 'Good job, but more is better...' }
      : { rating: 3, description: 'Really good job, keep it up!' };
  
  return {
    periodLength: exerciseHours.length,
    trainingDays,
    success: average >= target,
    rating: ratings.rating,
    ratingDescription: ratings.description,
    target,
    average
  };
};

const parseArgs = (args: string[]): exerciseParams => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target: number = Number(args[2]);
  if (isNaN(target)) throw new Error('The provided target is not a number!');

  const dailyHoursArgs: string[] = args.slice(3);
  const dailyHours: number[] = dailyHoursArgs.map(dailyHour => {
    const hour = Number(dailyHour);
    if (isNaN(hour)) throw new Error('Provided value is not a number!');
    return hour;
  });

  return { target, dailyHours };
};

try {
  const { target, dailyHours } = parseArgs(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Error when calculating exercise metrics. ';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
