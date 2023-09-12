import { Diagnosis } from "./../../frontend/src/types";
import {
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name or missing name" + name);
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect name or missing occupation" + occupation);
  }
  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect name or missing description" + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect name or missing specialist" + specialist);
  }
  return specialist;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing type: " + healthCheckRating);
  }
  return healthCheckRating;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error("Incorrect name or missing criteria" + criteria);
  }
  return criteria;
};

const parseDiscarge = (discarge: unknown): Discharge => {
  if (!discarge || typeof discarge !== "object") {
    throw new Error("Incorrect name or missing specialist" + discarge);
  }

  if ("date" in discarge && "criteria" in discarge) {
    return {
      date: parseDate(discarge.date),
      criteria: parseCriteria(discarge.criteria),
    };
  }
  throw new Error("incorrect or missing discharge object fields");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    const entryBase = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            ...entryBase,
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        }
        break;
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          return {
            ...entryBase,
            type: object.type,
            employerName: parseName(object.employerName),
          };
        }
        break;

      case "Hospital":
        if ("discharge" in object) {
          return {
            ...entryBase,
            type: object.type,
            discharge: parseDiscarge(object.discharge),
          };
        }
        break;

      default:
        break;
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};
