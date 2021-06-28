import { useState } from 'react';
import OtpLogin from './otp';
import PasswordLogin from './password';

export default function MobileLogin({ phoneData, processPhoneData, onCountryCodeChange }) {
  const [showPasswordLogin, setShowPasswordLogin] = useState(true);

  const toggle = selected => {
    setShowPasswordLogin(!(selected === 'otp'));
  };
  return (
    <>
      {showPasswordLogin
        ? (
          <PasswordLogin
            toggle={toggle}
            processPhoneData={processPhoneData}
            data={phoneData}
            onCountryCodeChange={onCountryCodeChange}
          />
        )
        : (
          <OtpLogin
            toggle={toggle}
            processPhoneData={processPhoneData}
            data={phoneData}
            onCountryCodeChange={onCountryCodeChange}
          />
        )}
    </>
  );
}
