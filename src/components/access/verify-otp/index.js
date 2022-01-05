/* eslint-disable react/no-unescaped-entities */
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { resetPasswordMobile } from '../../../sources/auth/forgot-pass-mobile';
import { sendOTP } from '../../../sources/auth/send-otp';
import { verifyOTP } from '../../../sources/auth/verify-otp';
import { verifyUser } from '../../../sources/auth/verify-user';
import { BackButton } from '../../commons/button/back';
import { SubmitButton } from '../../commons/button/submit';

const VerifyOTP = ({ router }) => {
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(59);

  const { ref } = router?.query;
  const { mobile } = router?.query;
  const [countryCode, phone] = mobile?.split('-');
  const phoneNo = `${countryCode}${phone}`;
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

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
          router?.push(types[ref]);
          showSnackbar({ message: t('SUCCESS_LOGIN') });
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
          router?.push(types[ref]);
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

  useEffect(()=>{
    if(seconds > 0){
    setTimeout(updateTimer,1000);
    }
  })

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
  return (
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
  );
};

export default withRouter(VerifyOTP);
