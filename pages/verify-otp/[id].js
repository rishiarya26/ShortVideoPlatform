import VerifyOTP from '../../src/components/access/verify-otp';
import useSnackbar from '../../src/hooks/use-snackbar';

export default function Hipi() {
  const {showSnackbar} = useSnackbar();

  const showMessage=({message})=>{
    showSnackbar({message: message});
  }
  return (
    <VerifyOTP showMessage={showMessage}/>
  );
}

