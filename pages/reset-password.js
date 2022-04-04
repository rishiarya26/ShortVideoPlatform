import ResetPassword from '../src/components/access/reset-password';
import useSnackbar from '../src/hooks/use-snackbar';

export default function Hipi() {
  const {showSnackbar} = useSnackbar();

  const showMessage=({message})=>{
    showSnackbar({message: message});
  }
  return (
    <ResetPassword showMessage={showMessage}/>
  );
}
