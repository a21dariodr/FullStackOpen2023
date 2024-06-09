/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";
import diaryService from '../services/entriesService';
import { DiaryEntry as Entry, Visibility, Weather } from "../types/entriesTypes";

const AddDiaryForm = ({ entries, setEntries }: { entries: Entry[], setEntries: Function }) => {
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState<string>('')

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    diaryService.addDiaryEntry({ date, visibility, weather, comment })
      .then(entry => {
        setEntries(entries.concat(entry));
        setDate('');
        setComment('');
      });
  }

  return (
    <>
      <h1>Add new entry</h1>
      <form onSubmit={onSubmit}>
        date <input type="text" value={date} onChange={(e) => setDate(e.target.value)} /><br/>
        visibility <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)} /><br/>
        weather <input type="text" value={weather} onChange={(e) => setWeather(e.target.value as Weather)} /><br/>
        comment <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} /><br/>
        <button type="submit">add</button>
      </form><br/>
    </>
  )
}

export default AddDiaryForm;