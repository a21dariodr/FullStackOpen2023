import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginTop: 15,
    backgroundColor: 'coral',
    color: 'white',
    display: notification ? '' : 'none'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification