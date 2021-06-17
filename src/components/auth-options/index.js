import { useState } from 'react';
import Login from '../login-options';
import Signup from '../signup-options';

export default function AuthOptions() {
  const [showLoginOptons, setShowLoginOptons] = useState(true);
  const handleToggle = selected => {
    setShowLoginOptons(!(selected === 'signup'));
  };
  return (
    <>
      {showLoginOptons ? <Login handleToggle={handleToggle} />
        : <Signup handleToggle={handleToggle} />}
    </>
  );
}
