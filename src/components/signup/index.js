import { withRouter } from 'next/router';
import { useState } from 'react';
import Tabs from '../commons/tabs';
import { BackButton } from '../commons/button/back';
import MobileSignup from '../access/mobile-signup';
import Email from '../access/email';
import useTranslation from '../../hooks/use-translation';

const Signup = ({ router }) => {
  const [phoneData, setPhoneData] = useState({ mobile: '', countryCode: '91' });
  const [emailData, setEmailData] = useState({ email: '' });
  const [pending, setPending] = useState(false);

  const { t } = useTranslation();
  const { type } = router.query;
  const tabs = [{ display: 'Phone', path: '/signup/phone' }, { display: 'Email', path: '/signup/email' }];

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

  const redirectToRegistration = async e => {
    e.preventDefault();
    setPending(true);
    router.push({
      pathname: '/registration',
      query: { email: emailData?.email }
    });
    setTimeout(() => { setPending(false); }, 2000);
  };

  return (
    <>
      <div>
        <div className="w-full flex h-16  bg-white items-center">
          <div className="p-4 h-full flex items-center justify-center">
            <BackButton back={router.back} />
          </div>
          <div className="font-bold flex justify-center align-center w-9/12">{t('SIGN_UP')}</div>
        </div>
      </div>
      <div className="fixed mt-10 z-10 w-full">
        <Tabs items={tabs} />
      </div>
      <div className="mt-20">
        {type === 'phone'
        && (
          <MobileSignup
            data={phoneData}
            processPhoneData={processPhoneData}
            onCountryCodeChange={onCountryCodeChange}
          />
        )}
        {type === 'email'
           && (
             <Email
               data={emailData}
               processEmailData={processEmailData}
               submit={redirectToRegistration}
               pending={pending}
               info="signup"
             />
           )}
      </div>
    </>
  );
};

export default withRouter(Signup);
