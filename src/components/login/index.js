import { withRouter } from 'next/router';
import { useState } from 'react';
import Tabs from '../commons/tabs';
import MobileLogin from '../access/mobile-login';
import EmailLogin from '../access/email-login';
import { BackButton } from '../commons/button/back';

const Login = ({ router }) => {
  const [phoneData, setPhoneData] = useState({});
  const [emailData, setEmailData] = useState({});
  const type = router.query.id;
  const tabs = [{ display: 'Phone', path: '/login/phone' }, { display: 'Email', path: '/login/email' }];

  const handleChangePhone = e => {
    const currentData = { ...phoneData };
    const inputType = e.target.id;
    const { value } = e.target;
    inputType === 'phone' && (currentData.mobile = value);
    inputType === 'password' && (currentData.password = value);
    setPhoneData(currentData);
  };

  const handleChangeEmail = e => {
    const currentData = { ...emailData };
    const inputType = e.target.id;
    const { value } = e.target;
    inputType === 'email' && (currentData.email = value);
    inputType === 'password' && (currentData.password = value);
    setEmailData(currentData);
  };

  return (
    <>
      <div>
        <div className="w-full flex h-16  bg-white items-center">
          <div className="p-4 h-full flex items-center justify-center">
            <BackButton back={router.back} />
          </div>
          <div className="font-bold flex justify-center align-center w-9/12">Log in</div>
        </div>
      </div>
      <div className="fixed mt-10 z-10 w-full">
        <Tabs items={tabs} />
      </div>
      <div className="mt-20">
        {type === 'phone' && <MobileLogin phoneData={phoneData} handleChangePhone={handleChangePhone} />}
        {type === 'email' && <EmailLogin emailData={emailData} handleChangeEmail={handleChangeEmail} />}
      </div>
    </>
  );
};

export default withRouter(Login);
