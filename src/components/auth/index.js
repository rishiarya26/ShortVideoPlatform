import { withRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Tabs from '../commons/tabs';
import { BackButton } from '../commons/button/back';
import Email from '../access/email';
import useTranslation from '../../hooks/use-translation';
import Mobile from '../access/mobile';
import useSnackbar from '../../hooks/use-snackbar';

const Auth = ({ router, authType }) => {
  const [phoneData, setPhoneData] = useState({ input: '', countryCode: '91' });
  const [loginOption, setLoginOption] = useState(router?.query?.option);
  const [numberOrEmail, setNumberOrEmail] = useState("email");

  const { t } = useTranslation();
  const { type } = router?.query;
  const {showSnackbar} = useSnackbar();

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
      router?.replace(urlReplace[authType]);
    }
  }, []);

  const onChangeInput = (value) => {
    if(Number(value)) {
      setNumberOrEmail("mobile");;
    } else {
      setNumberOrEmail("email");
    }
    setPhoneData({countryCode: phoneData.countryCode, input: value});
  }

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
            <BackButton back={() =>  router && router?.push('/feed/for-you')} />
          </div>
          <div className="font-bold flex justify-center align-center w-9/12">Login or Signup</div>
        </div>
      </div>
      {/* <div className="fixed mt-10 z-10 w-full">
        <Tabs items={tabs[authType]} />
      </div> */}
      <div>
      <Mobile
        onCountryCodeChange={onCountryCodeChange}
        processPhoneData={onChangeInput}
        data={phoneData}
        type={info?.[authType]?.phone}
        showMessage={showSnackbar}
        numberOrEmail={numberOrEmail}
        />
        {/* {type === 'phone'
       && (
         <Mobile
           toggle={toggle}
           processPhoneData={processPhoneData}
           processEmailData={processEmailData}
           data={{...phoneData, ...emailData}}
           onCountryCodeChange={onCountryCodeChange}
           type={info?.[authType]?.phone}
           showMessage={showSnackbar}
         />
       )}
        {type === 'email'
       && (
         <Email
           data={emailData}
           processEmailData={processEmailData}
           type={info?.[authType]?.email}
           showMessage={showSnackbar}
         />
       )} */}
      </div>
    </>
  );
};

export default withRouter(Auth);
