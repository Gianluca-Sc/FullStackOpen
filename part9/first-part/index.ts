import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.json({
      error: "malformatted parameters",
    });
  }

  return res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

app.get("/exercises", (req, res) => {
  let { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({
      error: "parameters missing",
    });
  }

  target = Number(target);
  daily_exercises = daily_exercises.map((d: string) => Number(d));

  if (!daily_exercises || !target) {
    return res.json({
      error: "malformatted parameters",
    });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
