import { useState, useEffect } from "react";
import { useMatch } from 'react-router-dom';
import { Patient, Diagnosis, EntryWithoutId, Entry } from '../../types';
import patientService from "../../services/patients";
import AddEntryForm from "./AddEntryForm";
import Notification from "../Notification";

import EntryDetails from "./EntriesDetails/EntryDetails";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import WcIcon from '@mui/icons-material/Wc';
import { Button } from "@mui/material";

interface Props {
  diagnoses : Diagnosis[]
}

const PatientDetails = ({ diagnoses }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [patient, setPatient] = useState<Patient>();
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error'>('success');
  const patientId = useMatch('/patients/:id')?.params.id;

  useEffect(() => {
    if (patientId) {
      patientService.getPatientById(patientId).then(data =>
        setPatient(data)        
      );
    }
  }, [patientId]);

  const onCancel = () => setShowForm(false);

  const onSubmit = async (entry: EntryWithoutId) => {
    if (patientId && patient) {
      try {
        const newEntry = await patientService.addEntry(entry, patientId);
        setPatient({
          ...patient,
          entries: patient.entries.concat(newEntry as Entry)
        });

        setMessage('Entry succesfully addded');
        setType('success');
        setTimeout(() => {setMessage('');}, 10000);
      } catch(error) {
        setMessage('Error when adding new entry. ' + (error as Error).message);
        setType('error');
        setTimeout(() => {setMessage('');}, 10000);
      }
    }
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
      <Notification message={message} type={type} />
      {showForm ? <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} diagnoses={diagnoses}/> : ''}
      <h3>Entries</h3>
      {patient.entries.map(entry =>
        <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />
      )}
      {!showForm
        ? (
          <div>
            <Button variant="contained" onClick={() => setShowForm(true)}>
              Add New Entry
            </Button>
          </div>
          )
        : ''
      }
    </div>
  );
};

export default PatientDetails;