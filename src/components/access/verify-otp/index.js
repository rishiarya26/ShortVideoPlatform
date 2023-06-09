/* eslint-disable react/no-unescaped-entities */
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toTrackClevertap } from '../../../analytics/clevertap/events';
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';
import useDrawer from '../../../hooks/use-drawer';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { sendOTP } from '../../../sources/auth/send-otp';
import { verifyOTP } from '../../../sources/auth/verify-otp';
import { getItem } from '../../../utils/cookie';
import { BackButton } from '../../commons/button/back';
import { SubmitButton } from '../../commons/button/submit';
import { registerUser } from "../../../sources/auth/register-user";
import CircularLoaderSmall from '../../commons/circular-loader-small';
import Eye from "../../commons/svgicons/eye";
import CloseEye from "../../commons/svgicons/closeEye";
import { userLogin } from '../../../sources/auth';

const TIMER_LIMIT = 59;

const delay = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

function yearToDate(date) {
  const newDate = new Date().getUTCFullYear() - new Date(date).getUTCFullYear() - 1;
  return newDate;
}

function formDataCheck({data, showMessage}) {
  const dataObj = {...data};
  dataObj.dob = yearToDate(dataObj?.dob);
  if(
    dataObj.firstName?.length > 0 &&
    dataObj.lastName?.length > 0 &&
    Number(dataObj.dob) >= 18 &&
    Number(dataObj.dob) < 100 &&
    dataObj.gender.length > 0 &&
    dataObj.gender !== "defaultValue" &&
    /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(dataObj.firstName) &&
    /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(dataObj.lastName)
    ){ 
      return true;
    } else {
      if(dataObj.firstName?.length  < 1){ 
        showMessage({message : "First name cant be left empty"});
      } else if(dataObj.lastName?.length  < 1){ 
        showMessage({message : "Last name cant be left empty"});
      } else if(dataObj.dob === '') {
        showMessage({message : "Age cant be left empty"});
      } else if(Number(dataObj.dob) < 18) {
        showMessage({message: "Age should be atleast 18 years"});
      } else if(Number(dataObj.dob) > 99) {
        showMessage({message: "Age should not be more than 99 years"});
      } else if(dataObj.gender.length <= 0 || dataObj.gender === "defaultValue") {
        showMessage({message: "Gender can't be left empty"});
      } else if (
        !/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(dataObj.firstName) ||
        !/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(dataObj.lastName)) {
        showMessage({message: "Name is not in correct format"})
      }
      return false;
  }
}

const VerifyOTP = ({ router, type, value, typeRef, showMessage, toggleFlow }) => {
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(TIMER_LIMIT);
  const device = getItem('device-type')
  const {showSnackbar} = useSnackbar();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOtp] = useState(false);
  const [authType, setAuthType] = useState("otp");
  const [password, setPassword] = useState("");

  if(device === 'mobile'){
    showMessage = showSnackbar;
  }

  const ref =  device === 'desktop' ? typeRef : (device === 'mobile' && router?.query?.ref);
  const {mobile} = router?.query;
  const {email} = router?.query;
  // const {formData: formDataParam} = router?.query;

  useEffect(()=>{
    if(seconds > 0){
      setTimeout(updateTimer,1000);
    }
  })
  
  useEffect(() => {
    if(device === 'mobile' && ref === 'signup') {
      const formDataStringified = window.sessionStorage.getItem("formData");
      const jsonFormData = JSON.parse(formDataStringified);
      if(Object.keys(jsonFormData).length > 0){
        setFormData({...jsonFormData});
      }
    } else if(device === 'desktop' && typeRef === 'signup' && Object.keys(value).length > 0) {
      setFormData({...value});
    }
  }, [value])

  useEffect(() => {
    setShowOtp(false);
  }, [authType])

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

  const method = device === "mobile" ? (mobile ? "phoneno": "email") : (type === "mobile" ? "phoneno" : "email");

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
    login: async() => {
      toTrackMixpanel('cta', {name: "Verify OTP", type: "submit"});
      const payload = device === "mobile" ? {
                ...(mobile ? {"phoneno": phoneNo} : {"email": email})
              } : {
                ...(type === "mobile" ? {"phoneno":  `${value?.countryCode}${value?.input}`} : {"email": value?.input})
              }
      try {
        toTrackMixpanel('loginInitiated', {method, pageName: "Login or Signup screen"})
        toTrackClevertap('loginInitiated', {method, pageName: "Login or Signup screen"})
        const response = await verifyOTP({info: payload, otp, type: method === "phoneno" ? "mobile" : "email"});
        if (response?.data?.status === 200) {
          try{
            toTrackMixpanel('loginSuccess', {method, pageName: "Login or Signup screen"})
            toTrackClevertap('loginSuccess', {method, pageName: "Login or Signup screen"})
          }catch(e){
            console.error('mixpanel - login verify otp error',e)
          }
          showMessage({ message:'Login successful' });
          if(device === 'desktop'){
             close();
             try{
              router?.asPath && (window.location.href = router?.asPath)
            }catch(e){
              console.error('error in redirection',e)
            }
          } else if(device === 'mobile'){
             router && router?.replace('/feed/for-you');
          }
        }
      } catch (error) {
        toTrackMixpanel('loginFailure',{method, pageName: "Login or Signup screen"})
        toTrackClevertap('loginFailure',{method, pageName: "Login or Signup screen"})
        showMessage({ message: t('INCORRECT_OTP') });
      }
    },
    passwordLogin: async() => {
      toTrackMixpanel('cta', {name: "Log in", type: "submit"});
      const payload = device === "mobile" ? {
                ...(mobile ? {"mobile": phoneNo} : {"email": email})
              } : {
                ...(type === "mobile" ? {"mobile":  `${value?.countryCode}${value?.input}`} : {"email": value?.input})
              }
      try {
        toTrackMixpanel('loginInitiated', {method, pageName: "Login or Signup screen"})
        toTrackClevertap('loginInitiated', {method, pageName: "Login or Signup screen"})
        const response = await userLogin({info: payload, password, type: method === "phoneno" ? "mobile" : "email"});
        if (response?.data?.status === 200) {
          try{
            toTrackMixpanel('loginSuccess', {method, pageName: "Login or Signup screen"})
            toTrackClevertap('loginSuccess', {method, pageName: "Login or Signup screen"})
          }catch(e){
            console.error('mixpanel - login password error',e)
          }
          showMessage({ message:'Login successful' });
          if(device === 'desktop'){
             close();
             try{
              router?.asPath && (window.location.href = router?.asPath)
            }catch(e){
              console.error('error in redirection',e)
            }
          } else if(device === 'mobile'){
             router && router?.replace('/feed/for-you');
          }
        }
      } catch (error) {
        toTrackMixpanel('loginFailure',{method, pageName: "Login or Signup screen"})
        toTrackClevertap('loginFailure',{method, pageName: "Login or Signup screen"})
        showMessage({ message: 'Incorrect credentials' });
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
      if(formDataCheck({data: formData, showMessage})){
        try {
          toTrackMixpanel('cta', {name: "Verify OTP", type: "submit"});
          toTrackMixpanel('signupInitiated', {method, pageName: "Signup screen"})
          toTrackClevertap('signupInitiated', {method, pageName: "Signup screen"})
          const response = await registerUser(registerFormData);
          if (response.data.status === 200) {
            try{
              toTrackMixpanel('signupSuccess', {method, pageName: "Signup screen"})
              toTrackClevertap('signupSuccess', {method, pageName: "Signup screen"})
            }catch(e){
              console.error('mixpanel - login verify otp error',e)
            }
            showMessage({message: "Signup successful"})
            await delay()
            if(device === 'desktop'){
              toggleFlow('userHandle');
           } else if(device === 'mobile'){
              router && router?.replace('/createUsername');
           }
          }
        } catch(e) {
          console.log("error", e);
          showMessage({message : 'OTP incorrect or expired'})
          toTrackMixpanel('signupFailure',{method, pageName: "Signup screen"})
          toTrackClevertap('signupFailure',{method, pageName: "Signup screen"})
        }
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
     {authType === "otp" ? (
      <div className="mt-4 w-full self-start border-b-2 border-grey-300 flex">
        <input
          className="flex-1 mx-4 my-2"
          type={showOTP ? "text" : "password"}
          name="phone"
          placeholder="OTP"
          value={otp}
          onChange={handleOtpChange}
        />
        <div style={{alignSelf: "center", marginRight: "15px", cursor: "pointer"}} onClick={() => setShowOtp(prev => !prev)}>
          {showOTP ? <CloseEye /> : <Eye />}
        </div>
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
      ) : (
        <div className="mt-4 w-full self-start border-b-2 border-grey-300 flex">
          <input
            id="password"
            className="flex-1 px-4 py-2"
            type={showOTP ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{alignSelf: "center", marginRight: "15px", cursor: "pointer"}} onClick={() => setShowOtp(prev => !prev)}>
            {showOTP ? <CloseEye /> : <Eye />}
          </div>
        </div>
      )}
   <div style={{color: "cornflowerblue"}} className="mt-6">
     {authType === "otp" ? 
     (
        <span onClick={()=>setAuthType("password")} className='cursor-pointer'>Login with password</span>
     ) : (
       <span onClick={()=>setAuthType("otp")} className='cursor-pointer'>Login with OTP</span>
     )}
   </div>
   <div className="mt-10 mb-4">
     {authType === "otp" ? (
      <SubmitButton disable={disable[ref]} fetchData={fetchData[ref]} text={t('VERIFY_OTP')} />
     ) : (
      <SubmitButton disable={password.length <= 0} fetchData={fetchData['passwordLogin']} text={"Log in"}/>
     )
    }
   </div>
   </>,
   mobile : 
    <div className="flex flex-col px-4 pt-10">
    <div className='flex'>
      <BackButton
            back={()=>{
                if(device === "mobile") {
                  router?.back();
                } else {
                  if(typeRef === 'signup') {
                    toggleFlow && toggleFlow("registration");
                  } else {
                    toggleFlow && toggleFlow("login");
                  }
                }
              }
            }
      />
      {authType === "password" && (
        <span className='font-bold flex justify-center align-center w-9/12'>Log in</span>
      )}
    </div>
    {authType === "otp" && (
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">Enter 4-digit code</p>
        <p className="text-gray-400 text-xs">{`Your code was messaged to ${ref === "login" ? (mobile ? mobile : email) : (formData?.type === "phoneno" ? `+${formData?.value}` : formData?.value)}`}</p>
      </div>)}
   <div className="mt-4 flex w-full border-b-2 border-grey-300">
     {authType === "otp" ? (
      <input
        className=" w-full px-4 py-2"
        type={showOTP ? "text" : "password"}
        name="phone"
        placeholder="OTP"
        value={otp}
        onChange={handleOtpChange}
        autoComplete="off"
      />
      ) : (
      <input
        className=" w-full px-4 py-2"
        type={showOTP ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />
      )}
     <div style={{alignSelf: "center"}} onClick={() => setShowOtp(prev => !prev)}>{showOTP ? <CloseEye /> : <Eye />}</div>
   </div>
   <div className="mt-10 mb-4">
    {authType === "otp" ? (
      <SubmitButton disable={disable[ref]} fetchData={fetchData[ref]} text={t('VERIFY_OTP')} />
     ) : (
      <SubmitButton disable={password.length <= 0} fetchData={fetchData['passwordLogin']} text={"Log in"}/>
     )
    }
   </div>
   {authType === "otp" && (
    <div className="text-gray-500">
      {seconds > 0 ? `Resend code 00:${seconds < 10 ? `0${seconds}`: seconds}` : <>Haven't Recieved OTP?<span className="text-hipired pl-2 font-semibold cursor-pointer" onClick={resendOtp[ref]}>Send again</span></>}
    </div>
   )}
   <div style={{color: "cornflowerblue"}} className="mt-2">
      {authType === "otp" ? 
        (
            <span onClick={()=>setAuthType("password")} className='cursor-pointer'>Login with password</span>
        ) : (
          <span onClick={()=>setAuthType("otp")} className='cursor-pointer'>Login with OTP</span>
      )}
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
