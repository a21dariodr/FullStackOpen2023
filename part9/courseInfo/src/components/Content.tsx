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
          <p key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
        )
      })}
    </>
  )
}

export default Content