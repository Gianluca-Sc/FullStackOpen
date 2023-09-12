import express from "express";
import patientsServices from "../services/patientsServices";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsServices.getAll());
});

router.get("/:id", (req, res) => {
  res.json(patientsServices.getById(req.params.id));
});

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  try {
    const patient = patientsServices.getById(id);
    if (!patient) {
      return res.status(400).json({ error: "Patient not found" });
    }

    const entry = toNewEntry(req.body);
    const newEntry = patientsServices.addEntry(entry, patient);
    res.json(newEntry);
  } catch (error: unknown) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.json(patientsServices.addPatient(newPatient));
  } catch (error: unknown) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
});

export default router;
