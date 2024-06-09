import { DiaryEntry as Entry } from "../types/entriesTypes";

type Props = {
  entry: Entry;
}

const DiaryEntry = (props: Props) => {
  return (
    <div>
      <strong>{props.entry.date}</strong><br/>
      visibility: {props.entry.visibility}<br/>
      weather: {props.entry.weather}<br/>
      <em>{props.entry.comment}</em><br/><br/>
    </div>
  )
  
}

export default DiaryEntry;