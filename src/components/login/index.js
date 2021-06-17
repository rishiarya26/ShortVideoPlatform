import { withRouter } from 'next/router';
import { useState } from 'react';
import Tabs from '../commons/tabs';
import MobileLogin from '../access/mobile-login';
import EmailLogin from '../access/email-login';
import { BackButton } from '../commons/button/back';

const Login = ({ router }) => {
  const [phoneData, setPhoneData] = useState({ mobile: '', password: '' });
  const [emailData, setEmailData] = useState({ email: '', password: '' });
  const { id } = router.query;
  const tabs = [{ display: 'Phone', path: '/login/phone' }, { display: 'Email', path: '/login/email' }];

  const getMappings = (e, data) => {
    const { id } = e.target;
    const { value } = e.target;
    data[id] = value;
    return data;
  };

  const processPhoneData = e => {
    let data = { ...phoneData };
    data = getMappings(e, data);
    setPhoneData(data);
  };

  const processEmailData = e => {
    let data = { ...emailData };
    data = getMappings(e, data);
    setEmailData(data);
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
        {id === 'phone' && <MobileLogin phoneData={phoneData} handleChangePhone={processPhoneData} />}
        {id === 'email' && <EmailLogin emailData={emailData} handleChangeEmail={processEmailData} />}
      </div>
    </>
  );
};

export default withRouter(Login);
