import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Tabs from '../commons/tabs';
import Email from '../access/email';
import { BackButton } from '../commons/button/back';
import useTranslation from '../../hooks/use-translation';
import Mobile from '../access/mobile';

const Login = ({ router }) => {
  const [phoneData, setPhoneData] = useState({ mobile: '', password: '', countryCode: '91' });
  const [emailData, setEmailData] = useState({ email: '', password: '' });
  const [loginOption, setLoginOption] = useState(router?.query?.option);

  const { type } = router?.query;

  const { t } = useTranslation();

  useEffect(() => {
    const updatePhoneData = { ...phoneData };
    const { mobile = '' } = router?.query;
    if (mobile.length !== 0) {
      const [countryCode, phoneNo] = mobile.split('-');
      updatePhoneData.countryCode = countryCode;
      updatePhoneData.mobile = phoneNo;
      setPhoneData(updatePhoneData);
      router.replace(`/login/phone?option=${router?.query?.option}`);
    }
  }, []);

  const toggle = selected => {
    setLoginOption(selected);
    selected && router.replace(`/login/phone?option=${selected}`);
  };

  const tabs = [{ display: 'Phone', path: `/login/phone?option=${loginOption}` },
    { display: 'Email', path: '/login/email' }];

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
          <div className="font-bold flex justify-center align-center w-9/12">{t('LOGIN')}</div>
        </div>
      </div>
      <div className="fixed mt-10 z-10 w-full">
        <Tabs items={tabs} />
      </div>
      <div className="mt-20">
        {type === 'phone'
       && (
         <Mobile
           toggle={toggle}
           processPhoneData={processPhoneData}
           data={phoneData}
           onCountryCodeChange={onCountryCodeChange}
           type={loginOption === 'password' ? 'loginPassword' : 'loginOtp'}
         />
       )}
        {type === 'email'
       && (
         <Email
           data={emailData}
           processEmailData={processEmailData}
           type="login"
         />
       )}
      </div>
    </>
  );
};

export default withRouter(Login);
