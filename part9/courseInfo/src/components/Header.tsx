type Props = {
  courseName: string;
}

const Header = (props: Props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

export default Header