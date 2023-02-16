import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { registerUser } from '../../../sources/auth/register-user';
import { BackButton } from '../../commons/button/back';
import { SubmitButton } from '../../commons/button/submit';
import Toggle from '../../commons/svgicons/toggle';
import CircularProgress from '../../commons/circular-loader-small';
import { commonEvents, toTrackMixpanel } from '../../../analytics/mixpanel/events';
import { track } from '../../../analytics';
import useDrawer from '../../../hooks/use-drawer';
import { getItem } from '../../../utils/cookie';
import useSnackbar from '../../../hooks/use-snackbar';
import * as fbq from '../../../analytics/fb-pixel'
import { toTrackClevertap } from '../../../analytics/clevertap/events';
import { sendOTP } from '../../../sources/auth/send-otp';
import VerifyOtp from '../verify-otp';
import { sessionStorage } from '../../../utils/storage';
// import { updateUserProfile } from '../../../sources/users';

function formatDate(age) {
  const year = new Date().getUTCFullYear();
  const modifiedYear = year - age;
  return `01/01/${modifiedYear}`;
}

function yearToDate(date) {
  const newDate = new Date().getUTCFullYear() - new Date(date).getUTCFullYear() - 1;
  return newDate;
}

function formDataCheck({data, showMessage}) {
  if(
    data.firstName?.length > 0 &&
    data.lastName?.length > 0 &&
    Number(data.dob) >= 18 &&
    Number(data.dob) < 100 &&
    data.gender.length > 0 &&
    data.gender !== "defaultValue" &&
    /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(data.firstName) &&
    /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(data.lastName)
    ){ 
      return true;
    } else {
      if(data.firstName?.length  < 1){ 
        showMessage({message : "First name cant be left empty"});
      } else if(data.lastName?.length  < 1){ 
        showMessage({message : "Last name cant be left empty"});
      } else if(data.dob === '') {
        showMessage({message : "Age cant be left empty"});
      } else if(Number(data.dob) < 18) {
        showMessage({message: "Age should be atleast 18 years"});
      } else if(Number(data.dob) > 99) {
        showMessage({message: "Age should not be more than 99 years"});
      } else if(data.gender.length <= 0 || data.gender === "defaultValue") {
        showMessage({message: "Gender can't be left empty"});
      } else if (
        !/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(data.firstName) ||
        !/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(data.lastName)) {
        showMessage({message: "Name is not in correct format"})
      }
      return false;
  }
}

const Registration = ({ router, toggleFlow, showMessage, phoneData, numberOrEmail }) => {

  const [data, setData] = useState({
    type: '',
    value: '',
    gender: 'defaultValue',
    firstName: '',
    lastName: '',
    name: '',
    dob: '',
  });
  const [pending, setPending] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const [ageTyping, setAgeTyping] = useState(false);

  const { t } = useTranslation();
  const {close} = useDrawer();
  const {showSnackbar} = useSnackbar();
  const device = getItem('device-type');
  // const googleRegistrationData = sessionStorage.get("googleRegistrationData") || null;

 if(device === 'mobile'){
   showMessage = showSnackbar;
 }

  const {mobile} = router?.query;
  const {email} = router?.query

  let phoneNo;
  if(device === 'mobile'){
    if(mobile) {
      const [countryCode, phone] = mobile && mobile.split('-');
      phoneNo = `${countryCode}${phone}`;
    }
  }

  //for google registration
  // useEffect(() => {
  //   if(googleRegistrationData) {
  //     const jsonGoogleRegistrationObject = JSON.parse(googleRegistrationData)
  //     let dataObj = {
  //       name: jsonGoogleRegistrationObject?.name || "",
  //       type: "email",
  //       value: jsonGoogleRegistrationObject?.email || "",
  //     }
  //     setData({...data, ...dataObj});
  //   }
  // }, [])

  useEffect(() => {
    let dataToUpdate = { ...data };
    if(device === 'mobile'){
    dataToUpdate.type = mobile ? 'phoneno' : 'email';
    dataToUpdate.value = mobile ? phoneNo : email;
    }
    else if (device === 'desktop'){
     dataToUpdate.type = numberOrEmail === 'mobile' ? 'phoneno' : 'email';
     dataToUpdate.value = numberOrEmail === 'mobile' ? `${phoneData?.countryCode}${phoneData?.input}` : phoneData.input;
    }
    if(device === 'mobile') {
      const formData = JSON.parse(window.sessionStorage.getItem('formData'));
      if(formData) {
        formData.dob = yearToDate(formData.dob);
        dataToUpdate = { ...data, ...formData };
      }
    }
    setData(dataToUpdate);
  }, []);
  /* eslint-disable no-param-reassign */
  const splitName = (fullName = '', data) => {
    const [firstName, lastName] = fullName?.split(' ');
    data.firstName = firstName;
    data.lastName = lastName || '';
    return data;
  };
  /* eslint-disable no-param-reassign */
  const retrieveYearFromAge = (age, data) => {
    const currentYear = new Date().getFullYear();
    data.birthday = currentYear - age;
    return data;
  };

  const mixpanel = (type, method) =>{
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Method'] = method;
    track(`${type} Result`,mixpanelEvents );
  }

  const getTypes = (e, data) => {
    try {
      const { id } = e.target;
      const { value } = e.target;
      data[id] = value;
      if (id === 'name') {
        data = splitName(value, data);
      }
      if (id === 'age') {
        if(value < 18){
           showMessage({message : 'Age should be above 18 years'})
        }else{
          data = retrieveYearFromAge(value, data);
        }
      }
    } catch (e) {
      console.log(e);
    }
    return data;
  };

  const processPhoneData = e => {
    e.currentTarget.setCustomValidity("")
    try {
      let dataToUpdate = { ...data };
      dataToUpdate = getTypes(e, dataToUpdate);
      setData(dataToUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    // if(googleRegistrationData) {
    //   try {
    //     const userDetails = localStorage.getItem("user-details");
    //     const payload = {
    //       id: userDetails?.id,
    //       profilePic: userDetails?.profilePic,
    //       firstName: userDetails?.firstName,
    //       lastName: userDetails?.lastName,
    //       dateOfBirth: userDetails?.dateOfBirth,
    //       userHandle: userHandle,
    //       onboarding: null,
    //       profileType: null,
    //       bio: userDetails?.bio,
    //       languages: userDetails?.languages
    //     };
    //     const response = await updateUserProfile(payload)
    //     if(device === 'mobile') {
    //         router.replace({
    //             pathname: "/content-language",
    //             query: {ref: "signup"}
    //         });
    //     } else {
    //         toggleFlow("contentLanguage")
    //     }
    //   } catch(e) {
    //     showMessage({message: 'Something went wrong. Please try again!'})
    //   }
    // } else {
      if(formDataCheck({data, showMessage})){ 
        try {
          toTrackMixpanel("signupFormSubmitted", {method: device === "mobile" ? 
          (mobile ? "phoneno" :"email") : (numberOrEmail === "mobile" ? "phoneno": "email"), 
          pageName: "Signup Page"})
            toTrackMixpanel("cta", {name: "signup", type: "submit"});
          setPending(true);
          const info = device === "mobile" ? {
            ...(mobile ? {"phoneno": phoneNo} : {"email": email})
          } : {
            ...(numberOrEmail === "mobile" ? {"phoneno":  `${phoneData?.countryCode}${phoneData?.input}`} : {"email": phoneData.input})
          }
          await sendOTP(info)
          const reqObject = {
            ...data,
            dob: formatDate(Number(data.dob))
          }
          if(device === 'mobile'){
            window.sessionStorage.setItem("formData", JSON.stringify(reqObject))
            router && router?.push({
              pathname: '/verify-otp',
              query: { ref: 'signup' }
            });
          } else {
            setOtpStatus(true);
          }
          setPending(false);
        } catch (e) {
          setPending(false);
        }
      }
    // }
  };

  const toggleGender = (e) => {
    const updateData = { ...data };
    updateData.gender = e?.target?.value;
    setData(updateData);
  };

  const changeDob = e => {
    if(!ageTyping) {
      setAgeTyping(true);
      try{
        toTrackMixpanel("registrationAgeEntered", {method: device === "mobile" ? 
        (mobile ? "phoneno" :"email") : (numberOrEmail === "mobile" ? "phoneno": "email"), 
        pageName: "Signup Page"})
      } catch(e) {
        console.log("Mixpanel error");
      }
    }
    setData({...data, dob: e.target.value});
  };


  return (
    <>
      <div className='w-full flex h-16  bg-white items-center'>
        <div className='p-4 h-full flex items-center'>
          <BackButton
            back={()=>{
                if(device === "mobile") {
                  router?.back();
                } else {
                  toggleFlow && toggleFlow("login")
                }
              }
            }
          />
        </div>
        <span className='font-bold flex justify-center align-center w-9/12'>Sign up</span>
      </div>
      <div className="flex flex-col px-4">
        <div className="mt-4 flex flex-col px-4">
          <p className="text-gray-400 text-xs">Please enter the following details</p>
        </div>
        <form onSubmit={submit}>
        <div className="mt-4">
          <input
            id="info"
            readOnly
            value={data.value}
            className=" w-full border-b-2 border-grey-300 px-4 py-2"
            type="text"
            name="info"
          />
        </div>
        <div className="mt-4">
          <input
            id="name"
            value={data.name}
            onChange={processPhoneData}
            className=" w-full border-b-2 border-grey-300 px-4 py-2"
            type="text"
            name="Name"
            placeholder="Full Name"
            autoComplete="off"
          />
        </div>
        <div className="mt-4 flex relative">
           <select
            value={data.gender}
            onChange={toggleGender}
            name="gender"
            id="gender"
            className='w-100 border-b-2 border-grey-300 px-4 py-2'
            >
            <option disabled value="defaultValue"> -- select gender -- </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Rather not say">Rather not say</option>
          </select>
        </div>
        <div className='mt-4 flex'>
          <input
            id="dob"
            value={data.dob}
            onChange={changeDob}
            className=" w-full border-b-2 border-grey-300 px-4 py-2"
            type="number"
            name="dob"
            placeholder="Age (in years)"
            autoComplete="off"
          />
        </div>
        {device === "desktop" && otpStatus && (
            <div className='mt-4'>
              <VerifyOtp
                typeRef="signup"
                type={numberOrEmail}
                value={{
                  ...data,
                  dob: formatDate(Number(data.dob))
                }}
                showMessage={showMessage}
                toggleFlow={toggleFlow}
              />
            </div>
          )
        }
        <div className="mt-10">
        {((device === 'mobile') || (device === 'desktop' && !otpStatus)) && <button
            type="submit"
            className={'bg-hipired w-full px-4 py-2 text-white font-semibold relative'}
          >
            {' '}
            {"Sign Up"}
            {!pending ? '' : <CircularProgress />}
          </button>}
        </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(Registration);
