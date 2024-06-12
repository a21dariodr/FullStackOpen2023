import { OccupationalHealthcareEntry, Diagnosis } from '../../../types';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses : Diagnosis[];
}

const OccupationalHealthcareDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisName = (code: string): string | undefined => {
    return diagnoses.find(d => d.code === code)?.name;
  };

  return (
    <div style={{ borderColor: 'black', borderStyle: 'solid', borderRadius: '10px', padding: 7, marginBottom: 10 }}>
      <p>{entry.date} {<WorkIcon/>} <strong><em>{entry.employerName}</em></strong></p>
      <em>{entry.description}</em>
      <p>Diagnose by {entry.specialist}</p>
      {entry.sickLeave
        ? (<em>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</em>)
        : ''
      }
      <ul>
        {entry.diagnosisCodes?.map(d => (
          <li key={d}>{d} {getDiagnosisName(d)}</li>
        ))}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareDetails;