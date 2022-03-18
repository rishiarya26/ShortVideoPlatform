import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { registerUser } from '../../../sources/auth/register-user';
import { BackButton } from '../../commons/button/back';
import { SubmitButton } from '../../commons/button/submit';
import Toggle from '../../commons/svgicons/toggle';
import CircularProgress from '../../commons/circular-loader-small';
import { commonEvents } from '../../../analytics/mixpanel/events';
import { track } from '../../../analytics';
import useDrawer from '../../../hooks/use-drawer';
import { getItem } from '../../../utils/cookie';


const Registration = ({ router, toggleRegistration, dataType, dataValue }) => {
  const [data, setData] = useState({
    type: '',
    value: '',
    gender: 'Male',
    firstName: '',
    lastName: '',
    password: '',
    name: '',
    birthday: '',
    age: ''
  });
  const [pending, setPending] = useState(false);
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
 const {close} = useDrawer();
 const device = getItem('device-type');

  const info = router?.query;
  const disable = (!!(data.firstName?.length === 0) || !!(data.lastName?.length === 0) || !!(data.name.length === 0)
   || !!(data.gender.length === 0) || !!(data.password.length === 0) || !!(data.age < 18));

  useEffect(() => {
    const dataToUpdate = { ...data };
    if(device === 'mobile'){
    const type = Object.keys(info)?.[0];
    dataToUpdate.type = type;
    dataToUpdate.value = info[type];
    }else if (device === 'desktop'){
      console.log("beofre",dataType, dataValue)
     dataToUpdate.type = dataType;
     dataToUpdate.value = dataValue;
    }
    console.log(dataToUpdate)
    setData(dataToUpdate);
  }, []);
  /* eslint-disable no-param-reassign */
  const splitName = (fullName = '', data) => {
    const [firstName, lastName] = fullName?.split(' ');
    data.firstName = firstName;
    data.lastName = lastName || '';
  //   if(data.lastName?.length < 1){
  //     showSnackbar({message : 'Please Enter Last name'})
  //  }
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
           showSnackbar({message : 'Age should be above 18 years'})
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
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
   if(data.lastName?.length > 0 && data.password.length > 5){ 
     try {
      setPending(true);
      await sendData();
      setPending(false);
    } catch (e) {
      setPending(false);
    }}else{
      if(data.lastName?.length  < 1){ 
      showSnackbar({message : "Last name cant be left empty"})
    }else if(data.password?.length <6){
      showSnackbar({message : "Password length should be minimum of 6 characters"})
    }
  }};

  const sendData = async () => {
    try {
      const response = await registerUser(data);
      console.log("user registered",response.status)
      // console.log("suces rep",response)
      if (response.status === 'success') {
        /* Mixpanel */
        let method;
        if(device === 'mobile'){
          method = data?.type && data?.type === 'email' ? 'Email' : data?.type === 'mobile' && 'Mobile';
        }else if(device === 'desktop'){
          method = data && data?.type;
        }
        method && mixpanel('Signup',method);   
        fbq.defEvent('CompleteRegistration');
        /* Mixpanel */
        if(device === 'mobile'){
          router?.push('/feed/for-you');
        }else if (device === 'desktop'){
          close();
        }
        showSnackbar({ message: t('SIGNUP_SUCCESS') });
      }
    } catch (e) {
      if (e.status === 'fail') {
        console.log("user not registered",e)
        showSnackbar({ message: e.message });
      }
    }
  };

  const toggleGender = () => {
    const updateData = { ...data };
    updateData.gender === 'Male' ? updateData.gender = 'Female' : updateData.gender = 'Male';
    setData(updateData);
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <BackButton back={()=>toggleRegistration({show : false})} />
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">{t('TELL_US_MORE')}</p>
        <p className="text-gray-400 text-xs">{t('ENTER_DETAILS')}</p>
      </div>
      <form onSubmit={submit}>
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
          // formNoValidate
        />
      </div>
      <div className="mt-4 flex relative">
        <input
          readOnly
          value={data.gender}
          id="gender"
          onClick={toggleGender}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="text"
          placeholder="Gender"
          required
        />
        <span className="absolute right-2 bottom-3">
          {' '}
          <Toggle />
        </span>
      </div>
      <div className="mt-4">
        <input
          
          id="password"
          value={data.password}
          onChange={processPhoneData}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="password"
          name="phone"
          placeholder="Password"
          required
        />
      </div>
      <div className="mt-4">
        <input
         
          id="age"
          value={data.age}
          onChange={processPhoneData}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="number"
          name="age"
          placeholder="Age"
          required
        />
      </div>
      <div className="mt-10">
      <button
        // disabled={disable || pending}
        // onClick={()=>sendData()}
        // onKeyDown={submit}
        type="submit"
        className={'bg-hipired w-full px-4 py-2 text-white font-semibold relative'}
      >
        {' '}
        {"Complete"}
        {!pending ? '' : <CircularProgress />}
      </button>
        {/* <SubmitButton  fetchData={sendData} disable={disable} text="Complete" /> */}
      </div>
      </form>
    </div>
  );
};

export default withRouter(Registration);
