import Part from "./Part";
import CoursePart from "../types/coursePartsTypes";

type Props = {
  courseParts: CoursePart[];
}

const Content = (props: Props) => {
  return (
    <>
      {props.courseParts.map(coursePart => {
        return (
          <Part key={coursePart.name} part={coursePart} />
        )
      })}
    </>
  )
}

export default Content