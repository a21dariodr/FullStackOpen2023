import { DiaryEntry } from "../types/entriesTypes";
import axios from 'axios';

const getDiaryEntries = async () => {
  const response = await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
  return response.data;
}

export default {
  getDiaryEntries
}