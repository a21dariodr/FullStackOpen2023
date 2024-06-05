import express from 'express';
import patientService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSsn());
});

export default router;