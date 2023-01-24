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

function formatDate(age) {
  const year = new Date().getUTCFullYear();
  const modifiedYear = year - age;
  return `01/01/${modifiedYear}`;
}

const Registration = ({ router, toggleFlow, showMessage, phoneData, numberOrEmail }) => {

  const [data, setData] = useState({
    type: '',
    value: '',
    gender: 'Male',
    firstName: '',
    lastName: '',
    name: '',
    dob: '',
  });
  const [pending, setPending] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);

  const { t } = useTranslation();
 const {close} = useDrawer();
 const {showSnackbar} = useSnackbar();
 const device = getItem('device-type');

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

  useEffect(() => {
    const dataToUpdate = { ...data };
    if(device === 'mobile'){
    dataToUpdate.type = mobile ? 'phoneno' : 'email';
    dataToUpdate.value = mobile ? phoneNo : email;
    }
    else if (device === 'desktop'){
     dataToUpdate.type = numberOrEmail === 'mobile' ? 'phoneno' : 'email';
     dataToUpdate.value = numberOrEmail === 'mobile' ? `${phoneData?.countryCode}-${phoneData?.input}` : phoneData.input;
    }
    console.log(dataToUpdate)
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
    toTrackMixpanel("signupFormSubmitted", {method: numberOrEmail === "mobile" ? "phoneno" : "email", pageName: "Signup Page"})
    toTrackMixpanel("cta", {name: "signup", type: "submit"});
    if(data.lastName?.length > 0 && Number(data.dob) >= 18){ 
      try {
        setPending(true);
        const info = mobile ? {
          ...(mobile ? {"phoneno": phoneNo} : {"email": email})
        } : {
          ...(numberOrEmail === "mobile" ? {"phoneno":  `${data?.countryCode}${data?.input}`} : {"email": phoneData.input})
        }
        await sendOTP(info)
        const reqObject = {
          ...data,
          dob: formatDate(Number(data.dob))
        }
        if(device === 'mobile'){ 
          router && router?.push({
            pathname: '/verify-otp',
            query: { ref: 'signup', formData: JSON.stringify(reqObject) }
          });
        } else {
          setOtpStatus(true);
          toggleFlow("userHandle")
        }
        setPending(false);
      } catch (e) {
        setPending(false);
      }
    } else {
        if(data.lastName?.length  < 1){ 
          showMessage({message : "Last name cant be left empty"})
        } else if(data.dob === '') {
          showMessage({message : "Age cant be left empty"})
        } else if(Number(data.dob) < 18) {
          showMessage({message: "Age should be atleast 18 years"});
        }
    }
  };

  const toggleGender = () => {
    const updateData = { ...data };
    updateData.gender === 'Male' ? updateData.gender = 'Female' : updateData.gender = 'Male';
    setData(updateData);
  };

  const changeDob = e => {
    setData({...data, dob: e.target.value});
  };


  return (
    <div className="flex flex-col px-4 pt-10">
      <BackButton back={()=>toggleFlow && toggleFlow("login")} />
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">{t('TELL_US_MORE')}</p>
        <p className="text-gray-400 text-xs">{t('ENTER_DETAILS')}</p>
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
          required
          pattern="^[a-zA-Z]+(\s[a-zA-Z]+)?$"
          onInvalid={(e)=>{e.currentTarget.setCustomValidity("First & Last name cant be left empty")}}
          autoComplete="off"
        />
      </div>
      <div className="mt-4 flex relative">
        <input
          readOnly
          value={data.gender}
          id="gender"
          onClick={toggleGender}
          className=" w-full border-b-2 border-grey-300 px-4 py-2 cursor-pointer"
          type="text"
          placeholder="Gender"
          required
        />
        <span className="absolute right-2 bottom-3">
          {' '}
          <Toggle />
        </span>
      </div>
      <div className='mt-4 flex'>
        <input
          id="dob"
          value={data.dob}
          onChange={changeDob}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="number"
          name="dob"
          placeholder="Age(in years)"
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
  );
};

export default withRouter(Registration);
