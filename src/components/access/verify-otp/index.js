/* eslint-disable react/no-unescaped-entities */
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toTrackClevertap } from '../../../analytics/clevertap/events';
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';
import useDrawer from '../../../hooks/use-drawer';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { resetPasswordMobile } from '../../../sources/auth/forgot-pass-mobile';
import { sendOTP } from '../../../sources/auth/send-otp';
import { verifyOTP } from '../../../sources/auth/verify-otp';
import { verifyUser } from '../../../sources/auth/verify-user';
import { getItem } from '../../../utils/cookie';
import { BackButton } from '../../commons/button/back';
import { SubmitButton } from '../../commons/button/submit';

const VerifyOTP = ({ router, fullMobileNo, typeRef, toggleRegistration, showMessage }) => {
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(59);
  const device = getItem('device-type')
  const {showSnackbar} = useSnackbar();
  const [formData, setFormData] = useState({});

  if(device === 'mobile'){
    showMessage = showSnackbar;
  }

  const ref =  device === 'desktop' ? typeRef : (device === 'mobile' && router?.query?.ref);
  const {mobile} = router?.query;
  const {email} = router?.query;
  const {formData: formDataParam} = router?.query;

  useEffect(()=>{
    if(seconds > 0){
    setTimeout(updateTimer,1000);
    }
  })
  
  useEffect(() => {
    console.log("debug 1", device, ref, formDataParam)
    if(device === 'mobile' && ref === 'signup' && Object.keys(formDataParam).length > 0) {
      setFormData({...formData});
    }
  }, [])

  useEffect(() => {
    console.log("debug", formData)
  }, [formData])

  let phoneNo;
  if(device === 'mobile'){
    if(mobile) {
      const [countryCode, phone] = mobile && mobile.split('-');
      phoneNo = `${countryCode}${phone}`;
    }
  }else if(device === 'desktop'){
    if(mobile) {
      phoneNo= fullMobileNo;
    }
  }

  const disable = {
    login: (phoneNo?.length === 0 || otp?.length === 0),
    signup: (phoneNo?.length === 0 || otp?.length === 0)
  };
 
  const { t } = useTranslation();
  // const { showSnackbar } = useSnackbar();
  const {close} = useDrawer();

  const types = {
    login: {
      pathname: '/feed/for-you'
    },
    signup: {
      pathname: '/registration',
      query: { mobile: phoneNo }
    },
    'forgot-password':{
      pathname: '/reset-password',
      query: { mobile: phoneNo, code : otp }
    }
  };

  const handleOtpChange = e => {
    const otp = e.currentTarget.value;
    setOtp(otp);
  };

  const fetchData = {
    login: async () => {
      const payload = {
        info:{...(mobile ? {phoneno: phoneNo} : {email})},
        otp,
        type: mobile ? "mobile" : "email"
      };
      try {
        toTrackMixpanel('loginInitiated',{method:'phone', pageName: 'login'})
        toTrackClevertap('loginInitiated',{method:'phone', pageName: 'login'})
        const response = await verifyOTP(payload);
        console.error("response",response)
        if (response?.data?.status === 200) {
          try{
            toTrackMixpanel('loginSuccess',{method:'phone', pageName: 'login'})
          }catch(e){
            console.error('mixpanel - login verify otp error',e)
          }
          showMessage({ message: t('SUCCESS_LOGIN') });
          if(device === 'desktop'){
             close();
             try{
              router?.asPath && (window.location.href = router?.asPath)
            }catch(e){
              console.error('error in redirection',e)
            }
          }else if(device === 'mobile'){
             router && router?.push(types[ref]);
            close();
          }
        }
      } catch (error) {
        toTrackMixpane('loginFailure',{method:'phone', pageName: 'login'})
        showMessage({ message: t('INCORRECT_OTP') });
      }
    },
  }

  const resendOtp ={
    'forgot-password' : async() => {
      try{
        const response = await resetPasswordMobile(phoneNo);
        if (response.data.code === 1) { 
          showMessage({message : 'Otp sent Successfully'});
          setSeconds(59);
        }
    }catch(e){
        showMessage({message : 'Error sending otp'})
    }}
    ,
    login : async()=>{
     try{
      const response = await sendOTP({...(mobile ? {phoneno: phoneNo} : {email})});
        if (response.data.code === 0) {
        showMessage({message : 'Otp sent Successfully'});
        setSeconds(59);
      }}catch(e){
        showMessage({message : 'Error sending otp'})
     }
    },
    signup: async()=>{
      try{ 
        const response = await sendOTP(phoneNo);
        if (response.data.code === 0) {
         showMessage({message : 'Otp sent Successfully'});
         setSeconds(59);
       }}catch(e){
         showMessage({message : 'Error sending otp'})
      }
     }
  }

  const updateTimer = ()=>{
    if(seconds > 0){
        setSeconds(seconds-1);
    }
  }


  const chooseComp = {
   desktop : 
   <>
   <div className="mt-4 w-full self-start">
     <input
       className=" w-full border-b-2 border-grey-300 px-4 py-2"
       type="password"
       name="phone"
       placeholder="OTP"
       value={otp}
       onChange={handleOtpChange}
     />
   </div>
   <div className="mt-10 mb-4">
     <SubmitButton disable={disable[ref]} fetchData={fetchData[ref]} text={t('VERIFY_OTP')} />
   </div>
   </>,
   mobile : 
   <div className="flex flex-col px-4 pt-10">
   <BackButton back={() =>  router && router?.back()}
   />
   <div className="mt-4 flex flex-col">
     <p className="font-bold w-full">Enter 4-digit code</p>
     <p className="text-gray-400 text-xs">{`Your code was messaged to ${mobile ? `+${mobile}` : email}`}</p>
   </div>
   <div className="mt-4">
     <input
       className=" w-full border-b-2 border-grey-300 px-4 py-2"
       type="password"
       name="phone"
       placeholder="OTP"
       value={otp}
       onChange={handleOtpChange}
       autoComplete="off"
     />
   </div>
   <div className="mt-10 mb-4">
     <SubmitButton fetchData={fetchData[ref]} text={t('VERIFY_OTP')} />
   </div>
   <div className="text-gray-500">
   {seconds > 0 ? `Resend code 00:${seconds < 10 ? `0${seconds}`: seconds}` : <>Haven't Recieved OTP?<span className="text-hipired pl-2 font-semibold cursor-pointer" onClick={resendOtp[ref]}>send again</span></>}
   </div>
 </div>
  }

  return (
  <>
   {chooseComp?.[device]}
  </>
  );
};

export default withRouter(VerifyOTP);
