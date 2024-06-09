import CoursePart from "../types/coursePartsTypes"

type Props = {
  part: CoursePart;
}

const Part = (props: Props) => {
  switch(props.part.kind) {
    case 'basic':
      return (
        <div>
          <p><strong>{props.part.name} {props.part.exerciseCount}</strong></p>
          <p><em>{props.part.description}</em></p>
          <br/>
        </div>
      );
    case 'group':
      return (
        <div>
          <p><strong>{props.part.name} {props.part.exerciseCount}</strong></p>
          <p>Project exercises {props.part.groupProjectCount}</p>
          <br/>
        </div>
      );
    case 'background':
      return (
        <div>
          <p><strong>{props.part.name} {props.part.exerciseCount}</strong></p>
          <p><em>{props.part.description}</em></p>
          <p>Submit to {props.part.backgroundMaterial}</p>
          <br/>
        </div>
      );
    case 'special':
      return (
        <div>
          <p><strong>{props.part.name} {props.part.exerciseCount}</strong></p>
          <p><em>{props.part.description}</em></p>
          <p>Required skills:  {props.part.requirements.join(', ')}</p>
          <br/>
        </div>
      );
  }
}

export default Part