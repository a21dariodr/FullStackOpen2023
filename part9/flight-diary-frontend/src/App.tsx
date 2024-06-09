import { useEffect, useState } from "react"
import diaryService from './services/entriesService'
import { DiaryEntry as Entry } from "./types/entriesTypes"
import DiaryEntry from "./components/DiaryEntry"
import AddDiaryForm from "./components/AddDiaryForm"

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    diaryService.getDiaryEntries().then(entries => setEntries(entries));
  }, [])
  
  return (
    <>
    <AddDiaryForm entries={entries} setEntries={setEntries} />
    <h1>Diary entries</h1>
      {entries.map(entry => {
        return (
          <DiaryEntry key={entry.id} entry={entry} />
        )
      })}
    </>
  )
}

export default App
