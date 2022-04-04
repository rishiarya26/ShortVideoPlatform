import { useEffect } from 'react';
import useSnackbar from '../../hooks/use-snackbar';
import DeskAuth from '../desk-auth';

const DeskLogin = ({backToOptions, showMessage}) => {
  return(
  <DeskAuth authType="login" backToOptions={backToOptions} showMessage={showMessage}/>
);}

export default DeskLogin;