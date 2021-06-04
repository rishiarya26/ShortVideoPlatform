import { useState } from 'react';
import OtpLogin from './otp';
import PasswordLogin from './password';

export default function MobileLogin({ phoneData, handleChangePhone }) {
  const [showPasswordLogin, setShowPasswordLogin] = useState(true);

  const handleToggle = selected => {
    if (selected === 'otp') {
      setShowPasswordLogin(false);
    } else {
      setShowPasswordLogin(true);
    }
  };
  return (
    <>
      {showPasswordLogin
        ? (
          <PasswordLogin
            handleToggle={handleToggle}
            handleChange={handleChangePhone}
            data={phoneData}
          />
        )
        : (
          <OtpLogin
            handleToggle={handleToggle}
            handleChange={handleChangePhone}
            data={phoneData}
          />
        )}
    </>
  );
}
