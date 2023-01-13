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
  toggle, processPhoneData, data, onCountryCodeChange, type, toggleShowForgotPassComp,
  toggleRegistration, showMessage, numberOrEmail
}) {
  const [seconds, setSeconds] = useState(0);

  const { t } = useTranslation();
  const router = useRouter();
  const {close} = useDrawer();
  const device = getItem('device-type')

  const disable = {
    loginOtp: !!(data.mobile?.length === 0)
  };

  const submit = async () => {
    try {
      const inputData = numberOrEmail === "mobile" ?  `${data?.countryCode}${data?.input}` : data.input;
      const inputKey = numberOrEmail === "mobile" ? "mobile" : "email"
      const response = await verifyUserOnly({type: numberOrEmail, [inputKey]: inputData});
      if (response?.data?.code === 0) {
        await sendOTP({
          ...(numberOrEmail === "mobile" ? {"phoneno": inputData} : {"email": email})
        });
        setSeconds(59);
        fbq.defEvent('CompleteRegistration');
         if(device === 'mobile'){ 
            router && router?.push({
            pathname: '/verify-otp',
            query: { ref: 'login', ...(numberOrEmail === "mobile" ?  {"mobile": `${data?.countryCode}-${data?.input}`} : {"email": data.input}) }
          });}
        
        showMessage({ message: t('SUCCESS_OTP') });
      } else if(response?.data?.code === 1) {
          fbq.defEvent('CompleteRegistration');
          if(device === 'mobile'){ 
              router && router?.push({
              pathname: '/registration',
              query: { ...(numberOrEmail === "mobile" ?  {"mobile": `${data?.countryCode}-${data?.input}`} : {"email": data.input}) }
            });}
          showMessage({ message: t('SUCCESS_OTP') });
      }
    } catch (e) {
      // toTrackMixpane('loginFailure',{method:'phone', pageName: 'login'})
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


  // const info = {
  //   loginOtp:
  //   <>
  //     {device === 'desktop' && 
  //     <>
  //       <button
  //       onClick={() => toggle('password')}
  //       onKeyDown={() => toggle('password')}
  //       className="flex justify-end text-sm font-semibold mt-2 px-2 cursor-pointer"
  //     >
  //       <p className="text-blue-400">Login with Password</p>
  //     </button>
      
  //     <div className='flex relative mt-4'>
      
  //     <div className='flex w-full items-center flex-col'> 
  //     <VerifyOTP 
  //     typeRef={type === 'signup' ? 'signup' : 'login'} 
  //     fullMobileNo={`${data.countryCode}${data.mobile}`}
  //     showMessage={showMessage}
  //     />
  //     </div>

  //     <div className="absolute top-1 right-0 mt-4  flex justify-center">
  //       <div className="text-gray-500">
  //        {seconds > 0 ? `Resend code 00:${seconds < 10 ? `0${seconds}`: seconds}` : 
  //         <DeskSendOtp disable={disable['loginOtp']} fetchData={submit['loginOtp']} text={submitText['loginOtp']} showMessage={showMessage}/>
  //        }
  //         </div>
  //       </div>
   
  //     </div>
  //     </>}

    
  //   {device === 'mobile' && 
  //   <>
  //     <div className="mt-10">
  //         <SubmitButton disable={disable[type]} fetchData={submit[type]} text={submitText[type]} />
  //     </div>
  //   </>}
  // </>,
  // };
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
            <div className='flex flex-row'>
              {countryCodeComp?.[device]}
              <input
                id="mobile"
                value={data.input}
                onChange={processPhoneData}
                className=" w-full border-b-2 border-grey-300 px-4 py-2"
                name="phone"
                placeholder="Email or Mobile Number"
                maxLength={10}
                required
                autoFocus
                autoComplete='off'
              />
            </div>
            ) : (
              <input
                id="email"
                value={data.input}
                onChange={processPhoneData}
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
          <div className="mt-10">
            <SubmitButton disable={disable['loginOtp']} fetchData={submit} text={'Proceed'} />
          </div>
        </form>
      </div>
    </div>
  );
}
