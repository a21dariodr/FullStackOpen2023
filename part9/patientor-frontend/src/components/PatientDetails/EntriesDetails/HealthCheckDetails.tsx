import { HealthCheckEntry, Diagnosis } from "../../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: HealthCheckEntry;
  diagnoses : Diagnosis[];
}

const HealthCheckDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisName = (code: string): string | undefined => {
    return diagnoses.find(d => d.code === code)?.name;
  };

  const getHealthCheckIconColor = (): string | undefined => {
    let color;
    switch (entry.healthCheckRating) {
      case 0: 
        color = 'green';
        break;
      case 1: 
        color = 'yellow';
        break;
      case 2:
        color = 'red';
        break;
      case 3:
        color = 'black';
    }
    return color;
  };

  return (
    <div style={{ borderColor: 'black', borderStyle: 'solid', borderRadius: '10px', padding: 7, marginBottom: 10 }}>
      <p>{entry.date} {<MedicalServicesIcon/>}</p>
      <em>{entry.description}</em>
      <p>{<FavoriteIcon style={{ color: getHealthCheckIconColor() }}/>}</p>
      <p>Diagnose by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map(d => (
          <li key={d}>{d} {getDiagnosisName(d)}</li>
        ))}
      </ul>
    </div>
  );
};

export default HealthCheckDetails;