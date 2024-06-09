import { useState } from "react";
import diaryService from '../services/entriesService';
import { DiaryEntry as Entry, Visibility, Weather } from "../types/entriesTypes";
import { AxiosError } from "axios";

const AddDiaryForm = ({ entries, setEntries }: { entries: Entry[], setEntries: (entries: Entry[]) => void }) => {
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState<string>('')
  const [error, setError] = useState<string>('')

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    diaryService.addDiaryEntry({ date, visibility, weather, comment })
      .then(entry => {
        setEntries(entries.concat(entry));
        setDate('');
        setVisibility(Visibility.Great)
        setWeather(Weather.Sunny)
        setComment('');
      })
      .catch((error: Error) => {
        if (error instanceof AxiosError) setError(error.response?.data);
      });
  }

  return (
    <>
      <h1>Add new entry</h1>
      <p style={{ color: 'red' }}>
        {error}
      </p>
      <form onSubmit={onSubmit}>
        date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br/>
        <div>
          visibility &nbsp;&nbsp;&nbsp;great <input type="radio" value={Visibility.Great} checked={visibility === Visibility.Great} name="visibility" onChange={() => setVisibility(Visibility.Great)} />&nbsp;
          good    <input type="radio" value={Visibility.Good} checked={visibility === Visibility.Good} name="visibility" onChange={() => setVisibility(Visibility.Good)} />&nbsp;
          ok <input type="radio" value={Visibility.Ok} checked={visibility === Visibility.Ok} name="visibility" onChange={() => setVisibility(Visibility.Ok)} />&nbsp;
          poor <input type="radio" value={Visibility.Poor} checked={visibility === Visibility.Poor} name="visibility" onChange={() => setVisibility(Visibility.Poor)} />
        </div>
        <div>
          weather &nbsp;&nbsp;&nbsp;sunny <input type="radio" value={Weather.Sunny} checked={weather === Weather.Sunny} name="weather" onChange={() => setWeather(Weather.Sunny)} />&nbsp;
          rainy    <input type="radio" value={Weather.Rainy} checked={weather === Weather.Rainy} name="weather" onChange={() => setWeather(Weather.Rainy)} />&nbsp;
          cloudy <input type="radio" value={Weather.Cloudy} checked={weather === Weather.Cloudy} name="weather" onChange={() => setWeather(Weather.Cloudy)} />&nbsp;
          stormy <input type="radio" value={Weather.Stormy} checked={weather === Weather.Stormy} name="weather" onChange={() => setWeather(Weather.Stormy)} />
          windy <input type="radio" value={Weather.Windy} checked={weather === Weather.Windy} name="weather" onChange={() => setWeather(Weather.Windy)} />
        </div>
        comment <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} /><br/>
        <button type="submit">add</button>
      </form><br/>
    </>
  )
}

export default AddDiaryForm;