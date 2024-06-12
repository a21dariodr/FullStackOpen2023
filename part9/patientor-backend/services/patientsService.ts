import patients from '../data/patients';
import { NewPatient, Patient, NonSensitivePatient } from '../types/patientsTypes';
import * as uuid from 'uuid';

const getPatientsWithoutSsn = (): NonSensitivePatient[] => {
  return patients.map(patient => {
    const modifiedPatient: NonSensitivePatient = {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    };
    return modifiedPatient;
  });
};

const getPatient = (id: string): NonSensitivePatient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid.v1();
  const addedPatient = {
    id,
    ...patient
  };
  patients.push(addedPatient);

  return addedPatient;
};

export default {
  addPatient,
  getPatientsWithoutSsn, getPatientWithoutSsn: getPatient
};