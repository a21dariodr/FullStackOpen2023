import express from 'express';
import patientService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSsn());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

export default router;