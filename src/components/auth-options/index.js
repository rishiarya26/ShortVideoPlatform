import { useState } from 'react';
import Login from '../login-options';
import Signup from '../signup-options';

export default function AuthOptions() {
  const [showLoginOptons, setShowLoginOptons] = useState(true);
  const toggle = selected => {
    setShowLoginOptons(!(selected === 'signup'));
  };
  return (
    <>
      {showLoginOptons ? <Login toggle={toggle} />
        : <Signup toggle={toggle} />}
    </>
  );
}
