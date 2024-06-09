import Part from "./Part";

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

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