import { 
  Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField
} from "@mui/material";
import React, { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";

type Type = 'healthcheck' | 'hospital' | 'occupational';

type HealthRateOption = 0 | 1 | 2 | 3;

interface Props {
  onCancel: () => void;
  onSubmit: (entry: EntryWithoutId) => void;
  diagnoses : Diagnosis[]
}

const AddEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  const [type, setType] = useState<Type>('healthcheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthRateOption>(0);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;

    typeof value === "string"
      ? setDiagnosisCodes(value.split(', '))
      : setDiagnosisCodes(value);
  };

  const onAddEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entry: EntryWithoutId = type === 'healthcheck'
      ? {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: 'HealthCheck',
        healthCheckRating
      }
      : type === 'hospital'
        ? {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        }
        : {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          }
        };
      
      onSubmit(entry);

      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes([]);
      setHealthCheckRating(0);
      setDischargeDate('');
      setDischargeCriteria('');
      setEmployerName('');
      setSickLeaveStart('');
      setSickLeaveEnd('');
  };
  
  return (
    <div style={{ borderColor: 'black', borderStyle: 'dashed', borderRadius: 5, padding: 20}}>
      <form>
        <h3>
          {type === 'healthcheck'
            ? 'Neew HealthCheck Entry'
            : type === 'hospital'
              ? 'New Hospital Entry'
              : 'New Occupational Healtcare Entry'}
        </h3>
        <Select size="small" value={type} onChange={({ target }) => setType(target.value as Type)} >
          <MenuItem value={'healthcheck'}>Health Check</MenuItem>
          <MenuItem value={'hospital'}>Hospital</MenuItem>
          <MenuItem value={'occupational'}>Occupational Healthcare</MenuItem>
        </Select>

        <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        <TextField 
          fullWidth
          size="small"
          variant="standard"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField 
          fullWidth
          size="small"
          variant="standard"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
        <TextField 
          fullWidth
          size="small"
          variant="standard"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnoses codes</InputLabel>
        <Select size="small" multiple value={diagnosisCodes} onChange={onDiagnosisCodesChange} >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>

        {type === 'healthcheck' && 
          <>
            <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
            <Select size="small" value={healthCheckRating} onChange={({ target }) => setHealthCheckRating(target.value as HealthRateOption)} >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low risk</MenuItem>
              <MenuItem value={2}>High risk</MenuItem>
              <MenuItem value={3}>Critical risk</MenuItem>
            </Select>
          </>
        }

        {type === 'hospital' && 
          <>
            <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
            <TextField 
              fullWidth
              size="small"
              variant="standard"
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />

            <InputLabel style={{ marginTop: 20 }}>Discharge criteria</InputLabel>
            <TextField 
              fullWidth
              size="small"
              variant="standard"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        }

        {type === 'occupational' && 
          <>
            <InputLabel style={{ marginTop: 20 }}>Employer name</InputLabel>
            <TextField 
              fullWidth
              size="small"
              variant="standard"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />

            <InputLabel style={{ marginTop: 20 }}>Sick leave start</InputLabel>
            <TextField 
              fullWidth
              size="small"
              variant="standard"
              type="date"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />

            <InputLabel style={{ marginTop: 20 }}>Sick leave end</InputLabel>
            <TextField 
              fullWidth
              size="small"
              variant="standard"
              type="date"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        }
                  
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" color="success" onClick={onAddEntry}>Add</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;