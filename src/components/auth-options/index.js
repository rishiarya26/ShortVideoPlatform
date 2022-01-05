import { Suspense, lazy } from 'react';
import { useEffect, useState } from 'react';
import { inject } from '../../analytics/async-script-loader';
import { GOOGLE_PLATFORM } from '../../constants';
import { login } from '../../sources/social/google/login';
import Login from '../login-options';
import Signup from '../signup-options';

export default function AuthOptions() {
  const [showLoginOptons, setShowLoginOptons] = useState(true);
  const [loading, setLoading] = useState(true);
    
  // const Login = lazy(() => import('../login-options'));

  const loaded = ()=>{
      console.log("lib google ended")
      setLoading(false)
  }

  useEffect(()=>{
    console.log('lib google started')
    inject(GOOGLE_PLATFORM , null, loaded); 
 },[])

  const toggle = selected => {
    setShowLoginOptons(!(selected === 'signup'));
  };
  return (
    <>
      {showLoginOptons ? 
        // <Suspense fallback={<div>Loading...</div>}> 
        <Login toggle={toggle} loading={loading}/>
        // {/* </Suspense> */}
        : <Signup toggle={toggle} loading={loading}/>}
    </>
  );
}
