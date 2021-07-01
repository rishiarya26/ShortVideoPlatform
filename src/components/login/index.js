import { withRouter } from 'next/router';
import { useState } from 'react';
import Tabs from '../commons/tabs';
import MobileLogin from '../access/mobile-login';
import Email from '../access/email';
import { BackButton } from '../commons/button/back';
import useSnackbar from '../../hooks/use-snackbar';
import { userLogin } from '../../sources/auth';
import useTranslation from '../../hooks/use-translation';

const Login = ({ router }) => {
  const [phoneData, setPhoneData] = useState({ mobile: '', password: '', countryCode: '91' });
  const [emailData, setEmailData] = useState({ email: '', password: '' });
  const [pending, setPending] = useState(false);
  const { type } = router.query;
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();

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

  const onCountryCodeChange = selectedData => {
    const data = { ...phoneData };
    data.countryCode = selectedData.code;
    setPhoneData(data);
  };

  const submitEmail = async e => {
    e.preventDefault();
    setPending(true);
    try {
      const finalData = { ...emailData };
      finalData.type = 'email';
      const response = await userLogin(finalData);
      if (response.status === 'success') {
        router.push({
          pathname: '/feed/for-you'
        });
        showSnackbar({ message: t('SUCCESS_LOGIN') });
        setPending(false);
      }
    } catch (e) {
      showSnackbar({ message: t('FAIL_EMAIL_LOGIN') });
      setPending(false);
    }
  };

  return (
    <>
      <div>
        <div className="w-full flex h-16  bg-white items-center">
          <div className="p-4 h-full flex items-center justify-center">
            <BackButton back={router.back} />
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
          <MobileLogin
            phoneData={phoneData}
            processPhoneData={processPhoneData}
            onCountryCodeChange={onCountryCodeChange}
          />
        )}
        {type === 'email'
       && (
         <Email
           data={emailData}
           processEmailData={processEmailData}
           submit={submitEmail}
           pending={pending}
           info="login"
         />
       )}
      </div>
    </>
  );
};

export default withRouter(Login);
