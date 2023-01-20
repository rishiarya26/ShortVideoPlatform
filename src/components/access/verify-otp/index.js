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
import { registerUser } from "../../../sources/auth/register-user";
import CircularLoaderSmall from '../../commons/circular-loader-small';
import Eye from "../../commons/svgicons/eye";
import CloseEye from "../../commons/svgicons/closeEye";

const TIMER_LIMIT = 59;

const VerifyOTP = ({ router, type, value, typeRef, showMessage }) => {
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(TIMER_LIMIT);
  const device = getItem('device-type')
  const {showSnackbar} = useSnackbar();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOtp] = useState(false);

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
    if(device === 'mobile' && ref === 'signup' && Object.keys(jsonFormData).length > 0) {
      const jsonFormData = JSON.parse(formDataParam);
      setFormData({...jsonFormData});
    }
  }, [])

  let phoneNo;
  if(ref === 'signup') {

  }
  if(device === 'mobile'){
    if(mobile) {
      const [countryCode, phone] = mobile && mobile.split('-');
      phoneNo = `${countryCode}${phone}`;
    }
  }else if(device === 'desktop'){
    if(type === "mobile") {
      phoneNo = `${value?.countryCode}${value?.input}`;
    }
  }

  const disable = {
    login: (phoneNo?.length === 0 || otp?.length === 0),
    signup: (phoneNo?.length === 0 || otp?.length === 0)
  };
 
  const { t } = useTranslation();
  const {close} = useDrawer();

  const handleOtpChange = e => {
    const otp = e.currentTarget.value;
    setOtp(otp);
  };

  const fetchData = {
    login: async () => {
      const payload = device === "mobile" ? {
                ...(mobile ? {"phoneno": phoneNo} : {"email": email})
              } : {
                ...(type === "mobile" ? {"phoneno":  `${value?.countryCode}${value?.input}`} : {"email": value?.input})
              }
      try {
        toTrackMixpanel('loginInitiated',{method:'phone', pageName: 'login'})
        toTrackClevertap('loginInitiated',{method:'phone', pageName: 'login'})
        const response = await verifyOTP({info: payload, otp});
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
             router && router?.replace('/feed/for-you');
          }
        }
      } catch (error) {
        toTrackMixpanel('loginFailure',{method:'phone', pageName: 'login'})
        showMessage({ message: t('INCORRECT_OTP') });
      }
    },
    signup: async()=>{
      const registerFormData = {
        type: formData?.type,
        value: formData?.value,
        otp: otp,
        gender: formData?.gender,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        dob: formData?.dob

      }
      try{ 
        const response = await registerUser(registerFormData);
        if (response.data.code === 0) {
         showMessage({message : 'Otp sent Successfully'});
         setSeconds(TIMER_LIMIT);
       }}catch(e){
        console.log("error", e);
        showMessage({message : 'Error sending otp'})
      }
     }
  }

  const resendOtp ={
    login : async()=>{
      setLoading(true);
     try{
      const response = await sendOTP({...(type === "mobile" ? {phoneno: phoneNo} : {email: (device === "mobile" ? email : value.input)})});
        if (response.data.code === 0) {
        showMessage({message : 'Otp sent Successfully'});
        setSeconds(TIMER_LIMIT);
      }}catch(e){
        showMessage({message : 'Error sending otp'})
     } finally{
      setLoading(false);
     }
    },
    signup: async()=>{
      try{
       const response = await sendOTP({[formData?.type]: formData?.value});
         if (response.data.code === 0) {
         showMessage({message : 'Otp sent Successfully'});
         setSeconds(TIMER_LIMIT);
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
   <div className="mt-4 w-full self-start border-b-2 border-grey-300 flex">
     <input
       className="flex-1 mx-4 my-2"
       type={showOTP ? "text" : "password"}
       name="phone"
       placeholder="OTP"
       value={otp}
       onChange={handleOtpChange}
     />
     <div style={{alignSelf: "center", marginRight: "15px", cursor: "pointer"}} onClick={() => setShowOtp(prev => !prev)}>{showOTP ? <CloseEye /> : <Eye />}</div>
     <div className="text-gray-500 flex items-center justify-center">
      {seconds > 0 ? (
        `Resend code 00:${seconds < 10 ? `0${seconds}`: seconds}`
        ) : (
        <button
          type="button"
          className="text-white bg-hipired text-sm  font-semibold cursor-pointer h-100 px-8 relative"
          onClick={resendOtp[ref]}>
            Send OTP 
            {loading && <CircularLoaderSmall />}
        </button>
      )}
      </div>
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
   <div className="mt-4 flex w-full border-b-2 border-grey-300">
     <input
       className=" w-full px-4 py-2"
       type={showOTP ? "text" : "password"}
       name="phone"
       placeholder="OTP"
       value={otp}
       onChange={handleOtpChange}
       autoComplete="off"
     />
     <div style={{alignSelf: "center"}} onClick={() => setShowOtp(prev => !prev)}>{showOTP ? <CloseEye /> : <Eye />}</div>
   </div>
   <div className="mt-10 mb-4">
     <SubmitButton fetchData={fetchData[ref]} text={t('VERIFY_OTP')} />
   </div>
   <div className="text-gray-500">
   {seconds > 0 ? `Resend code 00:${seconds < 10 ? `0${seconds}`: seconds}` : <>Haven't Recieved OTP?<span className="text-hipired pl-2 font-semibold cursor-pointer" onClick={resendOtp[ref]}>Send again</span></>}
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
