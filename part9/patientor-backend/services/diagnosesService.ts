import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types/diagnosesTypes';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};