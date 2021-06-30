import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { registerUser } from '../../../sources/auth/register-user';
import { BackButton } from '../../commons/button/back';
import { SubmitButton } from '../../commons/button/submit';
import Toggle from '../../commons/svgicons/toggle';

const Registration = ({ router }) => {
  const [data, setData] = useState({
    type: '', value: '', gender: 'Male', firstName: '', lastName: '', password: '', name: ''
  });
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const info = router?.query;
  const disable = (!!(data.name.length === 0)
   || !!(data.gender.length === 0) || !!(data.password.length === 0));

  useEffect(() => {
    const dataToUpdate = { ...data };
    const type = Object.keys(info)?.[0];
    dataToUpdate.type = type;
    dataToUpdate.value = info[type];
    setData(dataToUpdate);
  }, []);

  const splitName = (fullName = '', data) => {
    const [firstName, lastName] = fullName?.split(' ');
    data.firstName = firstName;
    data.lastName = lastName;
    return data;
  };

  const getTypes = (e, data) => {
    try {
      const { id } = e.target;
      const { value } = e.target;
      data[id] = value;
    } catch (e) {
      console.log(e);
    }
    return data;
  };

  const processPhoneData = e => {
    try {
      let dataToUpdate = { ...data };
      dataToUpdate = getTypes(e, dataToUpdate);
      if (e.target?.id === 'name') {
        dataToUpdate = splitName(e.target?.value, dataToUpdate);
      }
      setData(dataToUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const sendData = async () => {
    try {
      const response = await registerUser(data);
      if (response.status === 'success') {
        router.push('/feed/for-you');
        showSnackbar({ message: t('SIGNUP_SUCCESS') });
      }
    } catch (e) {
      if (e.status === 'fail') {
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
      <BackButton back={router.back} />
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">{t('TELL_US_MORE')}</p>
        <p className="text-gray-400 text-xs">{t('ENTER_DETAILS')}</p>
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
        />
        <span className="absolute right-2 bottom-3">
          {' '}
          <Toggle />
        </span>
      </div>
      <div className="mt-4">
        <input
          required
          id="password"
          value={data.password}
          onChange={processPhoneData}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="password"
          name="phone"
          placeholder="Password"
        />
      </div>
      <div className="mt-10">
        <SubmitButton type="submit" fetchData={sendData} disable={disable} text="Complete" />
      </div>
    </div>
  );
};

export default withRouter(Registration);
