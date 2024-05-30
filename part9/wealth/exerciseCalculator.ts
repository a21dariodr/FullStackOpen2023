interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[],target: number): Exercise => {
  const trainingDays = exerciseHours.reduce((totalDays, hours): number => {
    if (hours > 0) return ++totalDays
    return totalDays
  }, 0)

  const totalHours = exerciseHours.reduce((totalHours, hours): number => {
    return totalHours + hours
  }, 0)

  const average = totalHours / exerciseHours.length

  const targetDifference = average - target
  const ratings = targetDifference < 0
    ? { rating: 1, description: 'What a fail! You need many more exercise!' }
    : targetDifference/target < 0.5
      ? { rating: 2, description: 'Good job, but more is better...' }
      : { rating: 3, description: 'Really good job, keep it up!' }
  

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    success: average >= target,
    rating: ratings.rating,
    ratingDescription: ratings.description,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))