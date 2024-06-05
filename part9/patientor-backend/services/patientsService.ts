import patients from '../data/patients';
import { PatientWithoutSsn } from '../types/patientsTypes';

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

export default {
  getPatientsWithoutSsn
};