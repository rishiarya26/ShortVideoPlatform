import { withRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Tabs from '../commons/tabs';
import { BackButton } from '../commons/button/back';
import Email from '../access/email';
import useTranslation from '../../hooks/use-translation';
import Mobile from '../access/mobile';

const Auth = ({ router, authType }) => {
  const [phoneData, setPhoneData] = useState({ mobile: '', countryCode: '91' });
  const [emailData, setEmailData] = useState({ email: '' });
  const [loginOption, setLoginOption] = useState(router?.query?.option);

  const { t } = useTranslation();
  const { type } = router.query;

  const heading = {
    login: 'LOGIN',
    signup: 'SIGN_UP'

  };
  const info = {
    login: { phone: loginOption === 'password' ? 'loginPassword' : 'loginOtp', email: 'login' },
    signup: { phone: 'signup', email: 'signup' }
  };

  const tabs = {
    login: [{ display: 'Phone', path: `/login/phone?option=${loginOption}` }, { display: 'Email', path: '/login/email' }],
    signup: [{ display: 'Phone', path: '/signup/phone' }, { display: 'Email', path: '/signup/email' }]
  };

  const urlReplace = {
    login: `/login/phone?option=${router?.query?.option}`,
    signup: '/signup/phone'
  };

  useEffect(() => {
    const updatePhoneData = { ...phoneData };
    const { mobile = '' } = router?.query;
    if (mobile.length !== 0) {
      const [countryCode, phoneNo] = mobile.split('-');
      updatePhoneData.countryCode = countryCode;
      updatePhoneData.mobile = phoneNo;
      setPhoneData(updatePhoneData);
      router.replace(urlReplace[authType]);
    }
  }, []);

  const toggle = selected => {
    setLoginOption(selected);
    selected && router.replace(`/login/phone?option=${selected}`);
  };

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

  const onCountryCodeChange = selectedData => {
    const data = { ...phoneData };
    data.countryCode = selectedData.code;
    setPhoneData(data);
  };

  return (
    <>
      <div>
        <div className="w-full flex h-16  bg-white items-center">
          <div className="p-4 h-full flex items-center justify-center">
            <BackButton back={() => router.push('/feed/for-you')} />
          </div>
          <div className="font-bold flex justify-center align-center w-9/12">{t(heading[authType])}</div>
        </div>
      </div>
      <div className="fixed mt-10 z-10 w-full">
        <Tabs items={tabs[authType]} />
      </div>
      <div className="mt-20">
        {type === 'phone'
       && (
         <Mobile
           toggle={toggle}
           processPhoneData={processPhoneData}
           data={phoneData}
           onCountryCodeChange={onCountryCodeChange}
           type={info?.[authType]?.phone}
         />
       )}
        {type === 'email'
       && (
         <Email
           data={emailData}
           processEmailData={processEmailData}
           type={info?.[authType]?.email}
         />
       )}
      </div>
    </>
  );
};

export default withRouter(Auth);
