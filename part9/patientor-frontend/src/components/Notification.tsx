import ErrorOutlinedIcon from '@mui/icons-material/Error';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircle';

interface Props {
  type: 'success' | 'error';
  message: string;
}

const Notification = ({ type, message }: Props) => {
  if (!message) return null;

  return (
    <div style={{ padding: 6, backgroundColor: type === 'error' ? 'lightcoral' : 'lightgreen', marginTop: 10, marginBottom: 10 }}>
      {type === 'error' ? <ErrorOutlinedIcon color='error'/> : <CheckCircleOutlinedIcon color='success'/>}
      {' ' + message}
    </div>
  );
};

export default Notification;