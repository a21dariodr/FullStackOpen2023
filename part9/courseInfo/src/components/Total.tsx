type Props = {
  total: number;
}

const Total = (props: Props) => {
  return (
    <p>
      <em>
        <strong>
          Number of exercises {props.total}
        </strong>
      </em>
    </p>
  )
}

export default Total