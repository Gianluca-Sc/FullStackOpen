/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import data from "../../data/patients";
import { Entry, EntryWithoutId, NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = data;

const getAll = (): Omit<Patient, "ssn">[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return { id, name, dateOfBirth, gender, occupation, entries };
    }
  );
};

const addPatient = (newPatient: NewPatient): Omit<Patient, "ssn"> => {
  const id = uuid();
  const newPatientID = { ...newPatient, id };

  return newPatientID;
};

const addEntry = (entry: EntryWithoutId, patient: Patient): Entry => {
  const id = uuid();

  const newEntry = { ...entry, id };
  patient.entries.push(newEntry);
  return newEntry;
};

const getById = (id: string): Patient | { error: string } => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) return { error: "id not found" };
  return patient;
};

export default { getAll, addPatient, getById, addEntry };
