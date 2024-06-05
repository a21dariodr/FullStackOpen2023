import patients from '../data/patients';
import { NewPatient, Patient, PatientWithoutSsn } from '../types/patientsTypes';
import * as uuid from 'uuid';

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patients.map(patient => {
    const modifiedPatient: PatientWithoutSsn = {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    };
    return modifiedPatient;
  });
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
  getPatientsWithoutSsn
};