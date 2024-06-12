import { HospitalEntry, Diagnosis } from "../../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry;
  diagnoses : Diagnosis[];
}

const HospitalDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisName = (code: string): string | undefined => {
    return diagnoses.find(d => d.code === code)?.name;
  };

  return (
    <div style={{ borderColor: 'black', borderStyle: 'solid', borderRadius: '10px', padding: 7, marginBottom: 10 }}>
      <p>{entry.date} {<LocalHospitalIcon/>}</p>
      <em>{entry.description}</em>
      <p>Diagnose by {entry.specialist}</p>
      <p>Discharge on <strong>{entry.discharge.date}</strong> due to {entry.discharge.criteria.toLowerCase()}</p>
      <ul>
        {entry.diagnosisCodes?.map(d => (
          <li key={d}>{d} {getDiagnosisName(d)}</li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalDetails;