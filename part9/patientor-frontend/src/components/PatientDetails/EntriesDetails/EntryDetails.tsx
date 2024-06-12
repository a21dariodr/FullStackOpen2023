import { Entry, Diagnosis } from "../../../types";
import HospitalDetails from "./HospitalDetails";
import HealthCheckDetails from "./HealthCheckDetails";
import OccupationalHealthcareDetails from "./OccupationalHealthcareDetails";

interface Props {
  entry: Entry;
  diagnoses : Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalDetails entry={entry} diagnoses={diagnoses} />;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;