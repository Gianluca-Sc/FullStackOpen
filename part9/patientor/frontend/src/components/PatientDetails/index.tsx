import { useParams } from "react-router-dom";
import { Diagnosis, Entry, HealthCheckRating, Patient } from "../../types";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Container, Typography } from "@mui/material";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

import diagnosesService from "../../services/diagnoses";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { yellow, red } from "@mui/material/colors";

type Props = {
  entry: Entry;
  diagnosis: Diagnosis[];
};

const PatientView = () => {
  const { id } = useParams<string>();

  const [patient, setPatient] = useState<Patient>();
  const [loading, setLoading] = useState<boolean>(false);

  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      if (typeof id === "string") {
        const patient = await patientService.getByid(id);
        setPatient(patient);
        setLoading(false);
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const diagnosis = await diagnosesService.getAll();
      setDiagnosis(diagnosis);
    };
    void fetchDiagnosis();
  }, []);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const findDiagnose = (code: string): string | undefined => {
    const diagnose = diagnosis.find((d) => d.code === code);
    return diagnose?.name;
  };

  const checkRating = (rating: HealthCheckRating) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon color="success" />;
      case 1:
        return <FavoriteIcon style={{ color: yellow[500] }} />;
      case 2:
        return <FavoriteIcon style={{ color: red["A700"] }} />;
      case 3:
        return <FavoriteIcon style={{ color: red["900"] }} />;

      default:
        return <FavoriteIcon />;
    }
  };

  const EntryDetails = ({ entry, diagnosis }: Props) => {
    const containerStyle = {
      marginBottom: "1em",
      border: "1px solid black",
      borderRadius: "0.5em",
      padding: "0.8em",
    };

    switch (entry.type) {
      case "Hospital":
        return (
          <Container style={containerStyle}>
            <Typography variant="h5">
              {entry.date} <LocalHospitalIcon />
            </Typography>
            <Typography variant="body1">{entry.description}</Typography>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li>{findDiagnose(code)}</li>
              ))}
            </ul>
            <Typography variant="body1">
              discharge: {entry.discharge.date} {entry.discharge.criteria}
            </Typography>
            <Typography variant="body1">
              diagnose by {entry.specialist}
            </Typography>
          </Container>
        );
      case "OccupationalHealthcare":
        return (
          <Container style={containerStyle}>
            <Typography variant="h5">
              {entry.date} <MedicalServicesIcon /> {entry.employerName}
            </Typography>
            <Typography variant="body1">{entry.description}</Typography>
            <Typography variant="body1">
              diagnose by {entry.specialist}
            </Typography>
          </Container>
        );
      case "HealthCheck":
        return (
          <Container style={containerStyle}>
            <Typography variant="h5">
              {entry.date} <MedicalServicesIcon />
            </Typography>
            <Typography variant="body1">{entry.description}</Typography>
            {checkRating(entry.healthCheckRating)}
            <Typography variant="body1">
              diagnose by {entry.specialist}
            </Typography>
          </Container>
        );
      default:
        return assertNever(entry);
    }
  };

  if (!patient && !loading)
    return (
      <Container>
        <Typography variant="h4">User not found</Typography>
      </Container>
    );

  if (loading)
    return (
      <Container>
        <Typography variant="h3">loading...</Typography>
      </Container>
    );

  return (
    <>
      <Container style={{ marginBottom: "1em" }}>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          {patient?.name}{" "}
          {patient?.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        </Typography>
        <Typography variant="body1">ssn: {patient?.ssn}</Typography>
        <Typography variant="body1">
          occupation: {patient?.occupation}
        </Typography>
      </Container>
      <Container>
        <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
          entries
        </Typography>

        {patient?.entries.map((entry) => {
          return (
            <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
          );
        })}
      </Container>
    </>
  );
};

export default PatientView;
