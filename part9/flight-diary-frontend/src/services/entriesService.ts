import { DiaryEntry, NewDiaryEntry } from "../types/entriesTypes";
import axios from 'axios';

const getDiaryEntries = async () => {
  const response = await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries');
  return response.data;
}

const addDiaryEntry = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newDiary);
  return response.data;
}

export default {
  addDiaryEntry,
  getDiaryEntries
}