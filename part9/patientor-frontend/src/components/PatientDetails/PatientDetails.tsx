import { useState, useEffect } from "react";
import { useMatch } from 'react-router-dom';
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import WcIcon from '@mui/icons-material/Wc';

interface Props {
  diagnoses : Diagnosis[]
}

const PatientDetails = ({ diagnoses}: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const patientId = useMatch('/patients/:id')?.params.id;

  useEffect(() => {
    if (patientId) {
      patientService.getPatientById(patientId).then(data =>
        setPatient(data)        
      );
    }
  }, [patientId]);

  const getDiagnosisName = (code: string): string | undefined => {
    return diagnoses.find(d => d.code === code)?.name;
  };

  if (!patient) return null;

  return (
    <div>
      <br/>
      <h2>
        {patient.name}&nbsp;
        {patient.gender === 'male'
          ? (<MaleIcon/>)
          : patient.gender === 'female'
            ? (<FemaleIcon/>)
            : (<WcIcon/>)
        }
      </h2>
      <p>Ssh: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.date} <em>{entry.description}</em></p>
          <ul>
            {entry.diagnosisCodes?.map(d => (
              <li key={d}>{d} {getDiagnosisName(d)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;