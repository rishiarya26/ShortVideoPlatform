import { withRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Tabs from '../commons/tabs/desk-login';
import { BackButton } from '../commons/button/back';
import Email from '../access/email';
import useTranslation from '../../hooks/use-translation';
import Mobile from '../access/mobile';
import useDrawer from '../../hooks/use-drawer';
import DeskForgotPassword from '../access/desk-forgot-password';
import Registration from '../access/registration';
// import useSnackbar from '../../hooks/use-snackbar';

const Auth = ({ router, authType, backToOptions, showMessage }) => {
  const [phoneData, setPhoneData] = useState({ mobile: '', countryCode: '91' });
  const [emailData, setEmailData] = useState({ email: '' });
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [loginOption, setLoginOption] = useState('password');
  const [showForgotPassComp, setShowForgotPassComp ] = useState({show :false, type : ''});
  const [showRegistration, setShowRegistraton] = useState({show :false, toRegType:'',toRegValue:''});
  
  const {close} = useDrawer();
  const { t } = useTranslation();
  // const {showSnackbar} = useSnackbar();
//   const { type } = router?.query;

  const toggleShowForgotPassComp = (value)=>{
  setShowForgotPassComp(value);
  }

  const toggleRegistration = (value)=>{
      setShowRegistraton(value)
  }

  const heading = {
    login: 'LOGIN',
    signup: 'SIGN_UP'

  };
  const info = {
    login: { phone: loginOption === 'password' ? 'loginPassword' : 'loginOtp', email: 'login' },
    signup: { phone: 'signup', email: 'signup' }
  };

  const tabs = {
    login: { display: ['Phone', 'Email']},
    signup: { display: ['Phone', 'Email']},
  };

  const onTabChange = (value)=>{
      setSelectedTabIndex(value)
  }



//   const urlReplace = {
//     login: `/login/phone?option=${router?.query?.option}`,
//     signup: '/signup/phone'
//   };

  useEffect(() => {
    const updatePhoneData = { ...phoneData };
    const { mobile = '' } = router?.query;
    if (mobile.length !== 0) {
      const [countryCode, phoneNo] = mobile.split('-');
      updatePhoneData.countryCode = countryCode;
      updatePhoneData.mobile = phoneNo;
      setPhoneData(updatePhoneData);
    //   router?.replace(urlReplace[authType]);
    }
  }, []);

  const toggle = selected => {
    setLoginOption(selected);
    // selected && router?.replace(`/login/phone?option=${selected}`);
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

  const LoginSignup = (
      <>
      <div>
        <div className="w-full flex h-16  bg-white items-center">
          <div className="p-4 h-full flex items-center justify-center">
            <BackButton back={() => backToOptions(null)} />
          </div>
          <div className="font-bold flex justify-center align-center w-9/12">{t(heading[authType])}</div>
        </div>
      </div>   
      <div className="fixed mt-10 z-10 w-full">
        <Tabs
         items={tabs[authType]}
         onTabChange={onTabChange}
         selectedIndex={selectedTabIndex}
        />
      </div>
      <div className="mt-20">
        {selectedTabIndex === 0
       && (
         <Mobile
           toggle={toggle}
           processPhoneData={processPhoneData}
           data={phoneData}
           onCountryCodeChange={onCountryCodeChange}
           type={info?.[authType]?.phone}
           toggleShowForgotPassComp={toggleShowForgotPassComp}
           toggleRegistration={toggleRegistration}
           showMessage={showMessage}
         />
       )}
        {selectedTabIndex === 1
       && (
         <Email
           data={emailData}
           processEmailData={processEmailData}
           type={info?.[authType]?.email}
           toggleShowForgotPassComp={toggleShowForgotPassComp}
           toggleRegistration={toggleRegistration}
           showMessage={showMessage}
         />
       )}
      </div>
    </>
     )

  return (
      <>
   {showForgotPassComp.show ? 
     <DeskForgotPassword toggleShowForgotPassComp={toggleShowForgotPassComp} authOption={showForgotPassComp?.type} showMessage={showMessage}/> 
   :
   showRegistration.show ? 
     <Registration toggleRegistration={toggleRegistration} dataType={showRegistration?.toRegType} dataValue={showRegistration?.toRegValue} showMessage={showMessage}/>
   :
   LoginSignup}
   </>
  );
};

export default withRouter(Auth);
