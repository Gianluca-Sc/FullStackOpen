/* interface MultiplyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}; */

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  let result = "";
  if (bmi < 18.5) {
    result += "Underweight (Severe thinness)";
  } else if (bmi < 25.5) {
    result += "Normal (Healty weight)";
  } else if (bmi < 30) {
    result += "Overweight (Pre-obese)";
  } else if (bmi >= 30) {
    result += "Obese";
  }

  return result;
};

/* try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
calculateBmi(height, weight);
 */

export { calculateBmi };
