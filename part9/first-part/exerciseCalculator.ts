/* interface ExerciseParams {
  target: number;
  dailyExerciseHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseParams => {
  if (args.length < 2) {
    throw new Error("Please provide target and daily values");
  }

  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map((a) => Number(a));

  if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  } else {
    return {
      target,
      dailyExerciseHours,
    };
  }
};
 */
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d >= 1).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = Math.floor((average / target) * 3);

  const ratingDescription =
    rating <= 1
      ? "try again"
      : rating < 3
      ? "not too bad but could be better"
      : "Great work";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export { calculateExercises };

/* try {
  const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
 */
