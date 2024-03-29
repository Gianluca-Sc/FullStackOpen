import { Container, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entry: Entry;
  diagnosis: Diagnosis[];
}

export const OccupationalHealthcare = ({ entry, diagnosis }: Props) => {
  return (
    <Container>
      <Typography variant="body1">
        <WorkIcon /> {entry.type}
      </Typography>
    </Container>
  );
};
/* {
  id: "b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da",
  date: "2019-10-20",
  specialist: "MD House",
  type: "HealthCheck",
  description: "Yearly control visit. Cholesterol levels back to normal.",
  healthCheckRating: 0,
},
{
  id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
  date: "2019-09-10",
  specialist: "MD House",
  type: "OccupationalHealthcare",
  employerName: "FBI",
  description: "Prescriptions renewed.",
},
{
  id: "37be178f-a432-4ba4-aac2-f86810e36a15",
  date: "2018-10-05",
  specialist: "MD House",
  type: "HealthCheck",
  description:
    "Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.",
  healthCheckRating: 1,
}, */
