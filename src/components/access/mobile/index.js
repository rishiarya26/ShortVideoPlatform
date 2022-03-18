/*eslint-disable react/no-unescaped-entities*/
import { useRouter } from 'next/router';
import useTranslation from '../../../hooks/use-translation';
import { SubmitButton } from '../../commons/button/submit';
import { CountryCode } from '../../commons/button/country-code';
import useSnackbar from '../../../hooks/use-snackbar';
import { userLogin } from '../../../sources/auth';
import { verifyUser, verifyUserOnly } from '../../../sources/auth/verify-user';
import { sendOTP } from '../../../sources/auth/send-otp';
import { commonEvents } from '../../../analytics/mixpanel/events';
import { track } from '../../../analytics';
import * as fbq from '../../../analytics/fb-pixel'
import useDrawer from '../../../hooks/use-drawer';
import { getItem } from '../../../utils/cookie';
import VerifyOTP from '../verify-otp';
import { DeskSendOtp } from '../../commons/button/desk-send-otp';
import { useState, useEffect } from 'react';

export default function Mobile({
  toggle, processPhoneData, data, onCountryCodeChange, type, toggleShowForgotPassComp,
  toggleRegistration
}) {
  const [seconds, setSeconds] = useState(0);

  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const {close} = useDrawer();
  const device = getItem('device-type')

  const disable = {
    loginPassword: (!!(data.mobile?.length === 0) || !!(data.password?.length === 0)),
    loginOtp: !!(data.mobile?.length === 0),
    signup: !!(data.mobile?.length === 0)
  };

  const dispatchOtp = async() => {
    let resp = {data:{code : 1}}
      try{
      const mobile = `${data?.countryCode}${data?.mobile}`;
      const response = await sendOTP(mobile);
      resp = response
    }catch(e){
    }
    return resp;
  }

  const mixpanel = (type) =>{
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Method'] = 'Mobile';
    track(`${type} Result`,mixpanelEvents );
  }

  const submit = {
    loginPassword: async () => {
      try {
        const finalData = { ...data };
        finalData.type = 'Mobile';
        finalData.mobile = `${data?.countryCode}${data?.mobile}`;
        const response = await userLogin(finalData);
        if (response.status === 'success') {
          mixpanel('Login')
          fbq.defEvent('CompleteRegistration');
          router?.push({
            pathname: '/feed/for-you'
          });
          if(device === 'desktop'){
            close();
          }
          showSnackbar({ message: t('SUCCESS_LOGIN') });
        }
      } catch (e) {
        showSnackbar({ message: t('FAIL_MOBILE_LOGIN') });
      }
    },
    loginOtp: async () => {
      try {
        const mobile = `${data?.countryCode}${data?.mobile}`;
        const response = await verifyUser(mobile);
        if (response.status === 'success') {
          setSeconds(59);
          mixpanel('Login')
          fbq.defEvent('CompleteRegistration');
           if(device === 'mobile'){ 
             router?.push({
              pathname: '/verify-otp',
              query: { ref: 'login', mobile: `${data?.countryCode}-${data?.mobile}` }
            });}
          
          showSnackbar({ message: t('SUCCESS_OTP') });
        }
      } catch (e) {
        if (e.errorCode === 404) {
          showSnackbar({ message: t('NOT_REGISTERED') });
        }
      }
    },
    signup: async () => {
      try {
        const mobile = `${data?.countryCode}${data?.mobile}`;
        const response = await verifyUserOnly({mobile: mobile, type:'mobile'});
        if (response.status === 'success') {
          showSnackbar({ message: t('REGISTERED') });
        }
      } catch (e) {
        if (e.errorCode === 404) {
          const resp = await dispatchOtp();
          if(resp.data.code === 0){
            showSnackbar({ message: t('SUCCESS_OTP') });
            if(device==='mobile') {
              router?.push({
              pathname: '/verify-otp',
              query: { ref: 'signup', mobile: `${data?.countryCode}-${data?.mobile}` }
            });
          }
          // }else if(device === 'desktop'){
          //    toggleRegistration(true);
          // }
          }else{
            showSnackbar({ message: 'Something went wrong' });
          }
        }
      }
    }
  };

  const submitText = {
    loginPassword: t('LOGIN'),
    loginOtp: t('SEND_OTP'),
    signup: t('SEND_OTP')
  };

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

  const handleForgotPassword = ()=>{
    if(device === 'mobile'){
      router.push('/forgot-password?type=mobile')
    }else if(device === 'desktop'){
      toggleShowForgotPassComp({show : true, type : 'mobile'});
    }
  }

  const info = {
    loginOtp:
    <>
      {device === 'desktop' && 
      <>
        <button
        onClick={() => toggle('password')}
        onKeyDown={() => toggle('password')}
        className="flex justify-end text-sm font-semibold mt-2 px-2"
      >
        <p className="text-blue-400">Login with Password</p>
      </button>
      <div className='flex flex-row'>
      <div className='flex flex-col'> 
      <VerifyOTP 
      typeRef={type === 'signup' ? 'signup' : 'login'} 
      fullMobileNo={`${data.countryCode}${data.mobile}`}/>
      </div>

        <div className="mt-10">
        <div className="text-gray-500">
         {seconds > 0 ? `Resend code 00:${seconds < 10 ? `0${seconds}`: seconds}` : 
          <DeskSendOtp disable={disable['loginOtp']} fetchData={submit['loginOtp']} text={submitText['loginOtp']} />
         }
          </div>
        </div>
   
      </div>
      </>}

    
    {device === 'mobile' && 
    <>
    <button
    onClick={() => toggle('password')}
    onKeyDown={() => toggle('password')}
    className="flex justify-end text-sm font-semibold mt-2 px-2"
  >
    <p className="text-blue-400">Login with Password</p>
  </button>
    <div className="mt-10">
          <SubmitButton disable={disable[type]} fetchData={submit[type]} text={submitText[type]} />
        </div>
        </>}
  </>,
    loginPassword:
  <>
    <div className="mt-4">
      <input
        id="password"
        value={data.password}
        onChange={processPhoneData}
        className=" w-full border-b-2 border-grey-300 px-4 py-2"
        type="password"
        name="phone"
        placeholder="Password"
      />
    </div>
    <div className="flex justify-between text-sm font-semibold mt-2 px-2">
      <p onClick={handleForgotPassword}>Forgot password?</p>
      <p onClick={() => toggle('otp')} className="text-blue-400">Login with OTP</p>
    </div>
    <div className="mt-10">
          <SubmitButton disable={disable[type]} fetchData={submit[type]} text={submitText[type]} />
        </div>
  </>,
    signup:
    <>
      <div className="flex justify-end text-sm font-semibold mt-2 px-2">
        <p className="text-gray-400 text-xs">
          <p className="text-xs">
              By continuing, you agree to Hipi's
              <span onClick={()=>router.push('/terms-conditions.html')} className="font-semibold"> Term of Use </span>
              and confirm that you have read Hipi's
              <span onClick={()=>router.push('/privacy-policy.html')} className="font-semibold"> Privacy Policy </span>
              .if you sign up with SMS, SMS fee may apply.
            </p>
        </p>
      </div>
          <div className="mt-10">
          <SubmitButton disable={disable[type]} fetchData={submit[type]} text={submitText[type]} />
        </div>
        <VerifyOTP 
          typeRef={type === 'signup' ? 'signup' : 'login'} 
          fullMobileNo={`${data.countryCode}${data.mobile}`}
          toggleRegistration={toggleRegistration}
        />
    </>
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4 relative flex">
        <CountryCode
          onValueChange={onCountryCodeChange}
          text={data.countryCode}
        />
        <input
          id="mobile"
          value={data.mobile}
          onChange={processPhoneData}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="number"
          name="phone"
          placeholder="Phone Number"
        />
      </div>
      {info[type]}
    </div>
  );
}
