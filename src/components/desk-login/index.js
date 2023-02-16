import { useEffect } from 'react';
import useSnackbar from '../../hooks/use-snackbar';
import DeskAuth from '../desk-auth';

const DeskLogin = ({backToOptions, showMessage, flow="login", toggleFlow=null}) => {
  return(
  <DeskAuth
    authType="login"
    flow={flow}
    toggleFlow={toggleFlow}
    backToOptions={backToOptions}
    showMessage={showMessage}
    />
);}

export default DeskLogin;