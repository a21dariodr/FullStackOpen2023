import { Diagnosis } from "./types/diagnosesTypes";
import { Discharge, EntryWithoutId, HealthCheckEntryWithoutId, HealthCheckRating, HospitalEntryWithoutId,
  OccupationalHealthcareEntryWithoutId, SickLeave } from "./types/entriesTypes";
import { NewPatient, Gender } from "./types/patientsTypes";

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 
  'occupation' in object) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
      const baseEntry = 'diagnosisCodes' in object
      ? {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      } : {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
      };

      switch (object.type) {
        case "HealthCheck":
          if (!('healthCheckRating' in object)) throw new Error("Health check rating missing");
          const newHealthCheck: HealthCheckEntryWithoutId = {
            ...baseEntry,
            type: "HealthCheck",
            healthCheckRating: parseRating(object.healthCheckRating),
          };
          return newHealthCheck;
        case "OccupationalHealthcare":
          if (!('employer' in object)) throw new Error("Employer name missing");
          const newOccupationalEntry: OccupationalHealthcareEntryWithoutId = {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employer),
          };
          if ('sickLeave' in object) newOccupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
          return newOccupationalEntry;
        case "Hospital":
          if (!('discharge' in object)) throw new Error("Health check rating missing");
          const newHospitalEntry: HospitalEntryWithoutId = {
            ...baseEntry,
            type: "Hospital",
            discharge: parseDischarge(object.discharge),
          };
          return newHospitalEntry;
        default:
          throw new Error("Please provide a valid entry type");
      }
    }
  
    throw new Error('Incorrect data: some fields are missing');
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(gender => gender.toString())
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('Incorrect or missing name ' + name);
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error('Incorrect or missing date of birth ' + date);
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error('Incorrect or missing ssn ' + ssn);
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) throw new Error('Incorrect or missing gender ' + gender);
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('Incorrect or missing occupation ' + occupation);
  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing description ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isRating = (param: unknown): param is HealthCheckRating => {
  if (!isString(param)) return false;
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error('HealthCheckRating missing or incorrect value' + rating);
  }
  return rating;
};

const parseEmployerName = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error('Employer missing or incorrect' + employer);
  }
  return employer;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error("Sick leave mus be provided.");
  }
  if (
    !('startDate' in sickLeave) ||
    !('endDate' in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !isDate(sickLeave.startDate) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error('Incorrect sick leave');
  }
  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error("Discharge mus be provided.");
  }
  if (
    !('date' in discharge) ||
    !('criteria' in discharge) ||
    !isString(discharge.date) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error('Incorrect discharge');
  }
  return { date: discharge.date, criteria: discharge.criteria };
};