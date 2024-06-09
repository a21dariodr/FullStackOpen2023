type Props = {
  total: number;
}

const Total = (props: Props) => {
  return (
    <p>
      <em>
        Number of exercises {props.total}
      </em>
    </p>
  )
}

export default Total