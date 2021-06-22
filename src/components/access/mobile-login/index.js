import { useState } from 'react';
import OtpLogin from './otp';
import PasswordLogin from './password';

export default function MobileLogin({ phoneData, handleChangePhone }) {
  const [showPasswordLogin, setShowPasswordLogin] = useState(true);

  const handleToggle = selected => {
    setShowPasswordLogin(!(selected === 'otp'));
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
