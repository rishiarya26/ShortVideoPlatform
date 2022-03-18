/* eslint-disable react/no-unescaped-entities */
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

const VerifyOTP = ({ router, fullMobileNo, typeRef, toggleRegistration }) => {
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(59);
  const device = getItem('device-type')

  const ref =  device === 'desktop' ? typeRef : (device === 'mobile' && router?.query?.ref);
  const {mobile} = router?.query;

  useEffect(()=>{
    if(seconds > 0){
    setTimeout(updateTimer,1000);
    }
  })

  let phoneNo;
  if(device === 'mobile'){
    const [countryCode, phone] = mobile && mobile.split('-');
    phoneNo = `${countryCode}${phone}`;
  }else if(device === 'desktop'){
    phoneNo= fullMobileNo;
  }

  const disable = {
    login: (phoneNo?.length === 0 || otp?.length === 0),
    signup: (phoneNo?.length === 0 || otp?.length === 0)
  };
 
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
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
        mobile: phoneNo,
        otp
      };
      try {
        const response = await verifyOTP(payload);
        if (response.data.status === 200) {
          showSnackbar({ message: t('SUCCESS_LOGIN') });
          if(device === 'desktop'){
             close();
          }else if(device === 'mobile'){
            router?.push(types[ref]);
          }
        }
      } catch (error) {
        showSnackbar({ message: t('INCORRECT_OTP') });
      }
    },
    signup: async () => {
      const payload = {
        mobile: phoneNo,
        otp
      };
      try {
        const response = await verifyOTP(payload);
        if (response.data.status === 200) {
          if(device === 'desktop'){
            toggleRegistration({show: true, toRegType : 'mobile', toRegValue:phoneNo});
         }else if(device === 'mobile'){
           router?.push(types[ref]);
         }
          showSnackbar({ message: t('SUCCESS_LOGIN') });
        }
      } catch (error) {
        showSnackbar({ message: t('INCORRECT_OTP') });
      }
    },
    'forgot-password': async () => {
      // try {
      //   const response = await resetPasswordMobile(mobile);
      //   if (response.data.status === 200) {
          router?.push(types[ref]);
          // showSnackbar({ message: t('SUCCESS_LOGIN') });
      //   }
      // } catch (error) {
      //   showSnackbar({ message: t('INCORRECT_OTP') });
      // }
    },
      
  }

  const resendOtp ={
    'forgot-password' : async() => {
      try{
        const response = await resetPasswordMobile(phoneNo);
        if (response.data.code === 1) { 
          showSnackbar({message : 'Otp sent Successfully'});
          setSeconds(59);
        }
    }catch(e){
        showSnackbar({message : 'Error sending otp'})
    }}
    ,
    login : async()=>{
     try{ 
      const response = await sendOTP(phoneNo);
        if (response.data.code === 0) {
        showSnackbar({message : 'Otp sent Successfully'});
        setSeconds(59);
      }}catch(e){
        showSnackbar({message : 'Error sending otp'})
     }
    },
    signup: async()=>{
      try{ 
        const response = await sendOTP(phoneNo);
        if (response.data.code === 0) {
         showSnackbar({message : 'Otp sent Successfully'});
         setSeconds(59);
       }}catch(e){
         showSnackbar({message : 'Error sending otp'})
      }
     }
  }

  const updateTimer = ()=>{
    if(seconds > 0){
        setSeconds(seconds-1);
    }
  }



  // const fetchData = async () => {
  //   const payload = {
  //     mobile: phoneNo,
  //     otp
  //   };
  //   try {
  //     const response = await verifyOTP(payload);
  //     if (response.data.status === 200) {
  //       router?.push(types[ref]);
  //       showSnackbar({ message: t('SUCCESS_LOGIN') });
  //     }
  //   } catch (error) {
  //     showSnackbar({ message: t('INCORRECT_OTP') });
  //   }
  // };

  const chooseComp = {
   desktop : 
   <>
   {/* <div className="mt-4 flex flex-col">
     <p className="font-bold w-full">Enter 4-digit code</p>
     <p className="text-gray-400 text-xs">{`Your code was messaged to +${mobile}`}</p>
   </div> */}
   <div className="mt-4">
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
   <BackButton back={() => router?.push({
     pathname: `/${ref}/phone`,
     query: { option: 'otp', mobile }
   })}
   />
   <div className="mt-4 flex flex-col">
     <p className="font-bold w-full">Enter 4-digit code</p>
     <p className="text-gray-400 text-xs">{`Your code was messaged to +${mobile}`}</p>
   </div>
   <div className="mt-4">
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
     <SubmitButton fetchData={fetchData[ref]} text={t('VERIFY_OTP')} />
   </div>
   <div className="text-gray-500">
   {seconds > 0 ? `Resend code 00:${seconds < 10 ? `0${seconds}`: seconds}` : <>Haven't Recieved OTP?<span className="text-hipired pl-2 font-semibold" onClick={resendOtp[ref]}>send again</span></>}
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
