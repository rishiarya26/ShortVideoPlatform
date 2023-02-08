import { withRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { BackButton } from '../commons/button/back';
import useTranslation from '../../hooks/use-translation';
import Mobile from '../access/mobile';
import Registration from '../access/registration';
import UserHandle from "../access/userHandle";
import ContentLanguageProfile from "../content-lang-profile";

const Auth = ({ router, authType, backToOptions, showMessage, flow, toggleFlow }) => {
  const [phoneData, setPhoneData] = useState({ input: '', countryCode: '91' });
  const [numberOrEmail, setNumberOrEmail] = useState("email");

  const { t } = useTranslation();

  useEffect(() => {
    const updatePhoneData = { ...phoneData };
    const { mobile = '' } = router?.query;
    if (mobile.length !== 0) {
      const [countryCode, phoneNo] = mobile.split('-');
      updatePhoneData.countryCode = countryCode;
      updatePhoneData.mobile = phoneNo;
      setPhoneData(updatePhoneData);
    }
  }, []);

  const onChangeInput = (e) => {
    if(Number(e)) {
      setNumberOrEmail("mobile");;
    } else {
      setNumberOrEmail("email");
    }
    setPhoneData({countryCode: phoneData.countryCode, input: e});
  }

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
          {/*TODO: add translation*/}
          <div className="font-bold flex justify-center align-center w-9/12">Login or signup</div>
        </div>
      </div>   
      <div>
        <Mobile
          processPhoneData={onChangeInput}
          data={phoneData}
          onCountryCodeChange={onCountryCodeChange}
          toggleFlow={toggleFlow}
          showMessage={showMessage}
          numberOrEmail={numberOrEmail}
        />
      </div>
    </>
     )

  return (
  <>
    {
      flow === 'login' && (
        LoginSignup
      )
    }
    {
      flow === 'registration' && (
        <Registration
          toggleFlow={toggleFlow}
          showMessage={showMessage}
          phoneData={phoneData}
          numberOrEmail={numberOrEmail}
        />
      )
    }
    {
      flow === 'userHandle' && (
        <UserHandle
          toggleFlow={toggleFlow}
        />
      )
    }
    {
      flow === 'contentLanguage' && (
        <ContentLanguageProfile
          typeRef="signup"
        />
      )
    }
  </>
  );
};

export default withRouter(Auth);
