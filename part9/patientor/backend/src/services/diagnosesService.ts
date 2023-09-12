import data from "../../data/diagnoses";
import { Diagnose } from "../types";

const diagnoses: Diagnose[] = data;

const getAll = (): Diagnose[] => {
  return diagnoses;
};

/* const addDiagnose = (newDiagnose: Diagnose): Diagnose[] => {
  return diagnoses.push(newDiagnose);
};
 */
export default { getAll };
