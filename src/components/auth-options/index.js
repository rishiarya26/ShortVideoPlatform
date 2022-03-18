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

export default function AuthOptions() {
  const [showLoginOptons, setShowLoginOptons] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState(null);
    
  const loaded = ()=>{
      console.log("lib google ended")
      setLoading(false)
  }

  useEffect(()=>{
    console.log('lib google started')
    console.log("loading",loading)
    inject(GOOGLE_PLATFORM , null, loaded); 
 },[])

  const toggle = selected => {
    setShowLoginOptons(!(selected === 'signup'));
  };

  const toLoginOptions = (value)=>{
    console.log(value, authMethod)
    setAuthMethod(value);
  }

  return (
    <>
      {authMethod ? authMethod === 'login' ? 
      <DeskLogin backToOptions={toLoginOptions}/>
      : authMethod === 'signup' && <DeskSignup backToOptions={toLoginOptions}/>
      :
      showLoginOptons ? 
        // <Suspense fallback={<div>Loading...</div>}> 
        <Login toggle={toggle} loading={loading} setAuth={toLoginOptions}/>
        // {/* </Suspense> */}
        : <Signup toggle={toggle} loading={loading} setAuth={toLoginOptions}/>}
    </>
  );
}
