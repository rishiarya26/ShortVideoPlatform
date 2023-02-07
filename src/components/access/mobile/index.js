/*eslint-disable react/no-unescaped-entities*/
import { useRouter } from 'next/router';
import useTranslation from '../../../hooks/use-translation';
import { SubmitButton } from '../../commons/button/submit';
import { CountryCode } from '../../commons/button/country-code';
import { userLogin } from '../../../sources/auth';
import { verifyUser, verifyUserOnly } from '../../../sources/auth/verify-user';
import { sendOTP } from '../../../sources/auth/send-otp';
import { commonEvents, toTrackMixpanel } from '../../../analytics/mixpanel/events';
import { track } from '../../../analytics';
import * as fbq from '../../../analytics/fb-pixel'
import useDrawer from '../../../hooks/use-drawer';
import { getItem } from '../../../utils/cookie';
import VerifyOTP from '../verify-otp';
import { DeskSendOtp } from '../../commons/button/desk-send-otp';
import { useState, useEffect } from 'react';
import { DeskCountryCode } from '../../commons/button/desk-country-code';
import { localStorage } from '../../../utils/storage';
import { toTrackClevertap } from '../../../analytics/clevertap/events';


export default function Mobile({
  processPhoneData, data, onCountryCodeChange,
  toggleFlow, showMessage, numberOrEmail
}) {
  const [seconds, setSeconds] = useState(0);
  const [otpStatus, setOtpStatus] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();
  const {close} = useDrawer();
  const device = getItem('device-type')

  const disable = {
    loginOtp: !!(data.input?.length === 0)
  };

  useEffect(() => {
    window.sessionStorage.removeItem("formData");
    const sessionData = sessionStorage.getItem("data");
    if(sessionData) {
      processPhoneData(sessionData);
    }
  }, [])

  const submit = async () => {
    toTrackMixpanel("cta", {name: "proceed", type: "submit"});
    toTrackMixpanel(numberOrEmail === "mobile" ? "phoneNumberSubmitted" :"emailIdSubmitted", {method: numberOrEmail === "mobile" ? "phoneno" : "email", pageName: "Login or Signup Page"});
    try {
      const inputData = numberOrEmail === "mobile" ?  `${data?.countryCode}${data?.input}` : data.input;
      const inputKey = numberOrEmail === "mobile" ? "mobile" : "email"
      window.sessionStorage.setItem("data", data.input);
      const response = await verifyUserOnly({type: numberOrEmail, [inputKey]: inputData});
      if (response?.data?.code === 0) {
        try{
          await sendOTP({
            ...(numberOrEmail === "mobile" ? {"phoneno": inputData} : {"email": inputData})
          });
          setSeconds(59);
          fbq.defEvent('CompleteRegistration');
           if(device === 'mobile') {
              router && router?.push({
                pathname: '/verify-otp',
                query: { ref: 'login', ...(numberOrEmail === "mobile" ?  {"mobile": `${data?.countryCode}-${data?.input}`} : {"email": data.input}) }
              });
          } else {
            setOtpStatus(true);
          }
        } catch(e) {
          //TODO: failed login mixpanel
        }
        showMessage({ message: t('SUCCESS_OTP') });
      } else if(response?.data?.code === 1) {
          fbq.defEvent('CompleteRegistration');
          if(device === 'mobile'){ 
              router && router?.push({
              pathname: '/registration',
              query: { ...(numberOrEmail === "mobile" ?  {"mobile": `${data?.countryCode}-${data?.input}`} : {"email": data.input}) }
            });
          } else {
            toggleFlow("registration");
          }
      }
    } catch (e) {
      showMessage({ message: 'Something went wrong. Please try again'});
    }
  }



  const updateTimer = ()=>{
    if(seconds > 0){
        setSeconds(seconds-1);
    }
  }
  useEffect(()=>{
    if(seconds > 0){
    setTimeout(updateTimer,1000);
    }
  })

  const countryCodeComp = {
    'desktop' :
    <DeskCountryCode
    onValueChange={onCountryCodeChange}
    text={data.countryCode}
  />,
    'mobile' :
    <CountryCode
    onValueChange={onCountryCodeChange}
    text={data.countryCode}
  />
  }

  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4 relative flex">
        <form className='w-full'>
          {numberOrEmail === "mobile" ? 
          (
            <div className='flex flex-row relative'>
              {countryCodeComp?.[device]}
              <input
                id="mobile"
                value={data.input}
                onChange={(e) => processPhoneData(e.target.value)}
                className=" w-full border-b-2 border-grey-300 px-4 py-2"
                name="phone"
                placeholder="Email or Mobile Number"
                required
                autoFocus
                autoComplete='off'
              />
            </div>
            ) : (
              <input
                id="email"
                value={data.input}
                onChange={(e) => processPhoneData(e.target.value)}
                className=" w-full border-b-2 border-grey-300 px-4 py-2"
                name="phone"
                placeholder="Email or Mobile Number"
                required
                autoFocus
                type="email"
                autoComplete='off'
              />
            )
          }
          {device === "desktop" && otpStatus && (
            <VerifyOTP
              typeRef="login"
              type={numberOrEmail}
              value={data}
              showMessage={showMessage}
              toggleFlow={toggleFlow}
            />
          )}
          {((device === "mobile") || (device === "desktop" && !otpStatus)) && <div className="mt-10">
            <SubmitButton disable={disable['loginOtp']} fetchData={submit} text={'Proceed'} />
          </div>}
        </form>
      </div>
    </div>
  );
}
