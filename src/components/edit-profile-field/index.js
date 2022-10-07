import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { updateUserProfile } from '../../sources/users';
import useSnackbar from '../../hooks/use-snackbar';
import Error from './error';
import Loader from './loader';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import { getUserProfile } from '../../sources/users/profile';
import Cancel from '../commons/svgicons/cancel';
import { localStorage } from '../../utils/storage';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loader />);

const EditProfileField = ({ router }) => {
  const [data, setData] = useState({});

  const info = {
    userHandle: 'Username',
    bio: 'Bio',
    name: 'Name'
  };

  const type = router?.query?.field;
  const userId = router?.query?.id;

  const { showSnackbar } = useSnackbar();

  const handleBackClick = () => {
    router?.back();
  };

  const onValueChange = e => {
    const updateData = { ...data };
    const { id } = e?.currentTarget;
    const { value } = e?.currentTarget;
    updateData[id] = value;
    if (e.currentTarget.id === 'name') {
      const [firstName, lastName] = e.currentTarget.value.split(' ');
      updateData.firstName = firstName;
      updateData.lastName = lastName;
    }
    setData(updateData);
  };

  const onDataFetched = data => {
    setData(data.data);
  };

  const dataFetcher = () => getUserProfile(userId);
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  const languages = localStorage.get('lang-codes-selected')?.lang || [];
  const toUpdateValue = async () => {
    let response;
    const payload = {
      id: userId,
      profilePic: data?.profilePic,
      firstName: data?.firstName,
      lastName: data?.lastName,
      dateOfBirth: data?.dateOfBirth,
      userHandle: data?.userHandle,
      onboarding: null,
      profileType: null,
      bio: data?.bio,
      languages:languages
    };
    try {
      response = await updateUserProfile(payload);
      if (response.status === 'success') {
        console.log("inside- langauges updated succesfully");
      }
    } catch (e) {
      showSnackbar({ message: 'Something went wrong' });
    }
  };
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div>
        <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-between p-4">
          <div onClick={handleBackClick} className="h-full flex items-center justify-center text-gray-400">
            Cancel
          </div>
          <div className="font-bold">{info[type]}</div>
          <div onClick={toUpdateValue} className="text-red-500 font-medium">Save</div>
        </div>
        <div className="flex p-4 flex-col">
          <div className="py-2 text-gray-400">Name</div>
          <div className="flex justify-between py-4">
            <input id={type} type="text" onChange={onValueChange} className="text-lg text-gray-700" placeholder="Guest User" />
            <Cancel />
          </div>
        </div>
        {/* <div className="relative">
        <div className="flex relative m-20 ">
            <div className="">Name</div>
            <div className="">{`${firstName} ${lastName}re`}</div>
        </div>
        <div className="flex relative m-20">
            <div className="">Username</div>
            <div className=" ">{userName}</div>
        </div>
        <div className="flex relative m-20 ">
            <div className="">Bio</div>
            <div className="">{bio}</div>
        </div>
    </div> */}
      </div>
    </ComponentStateHandler>
  );
};

export default withRouter(EditProfileField);
