import { Suspense, lazy } from 'react';
import { useEffect, useState } from 'react';
import { inject } from '../../analytics/async-script-loader';
import { GOOGLE_PLATFORM } from '../../constants';
import { login } from '../../sources/social/google/login';
import Login from '../login-options';
import Signup from '../signup-options';
import DeskLogin from '../desk-login'
import DeskSignup from '../desk-signup'
import { localStorage } from '../../utils/storage';
import useSnackbar from '../../hooks/use-snackbar';

export default function AuthOptions({showMessage, pageName, tabName=null}) {
  const [loading, setLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState(null);
  const [flow, setFlow] = useState('login');

  const toggleFlow = (value) => {
    setFlow(value);
  };

  const loaded = ()=>{
      console.log("lib google ended")
      setLoading(false)
  }

  useEffect(()=>{
    console.log('lib google started')
    console.log("loading",loading)
    inject(GOOGLE_PLATFORM , null, loaded); 
 },[])

  const toLoginOptions = (value)=>{
    console.log(value, authMethod)
    setAuthMethod(value);
  }

  return (
    <>
    {
      authMethod ? (
          <DeskLogin
            flow={flow}
            toggleFlow={toggleFlow}
            showMessage={showMessage}
            backToOptions={toLoginOptions}
            />
      ) : (
        <Login
          loading={loading}
          setAuth={toLoginOptions}
          pageName={pageName}
          tabName={tabName}
          toggleFlow={toggleFlow}
        />
      )
    }
    </>
  );
}
