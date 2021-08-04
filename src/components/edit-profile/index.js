import Link from 'next/link';
import { withRouter } from 'next/router';
import { getUserProfile } from '../../sources/users/profile';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import { Back } from '../commons/svgicons/back';
import Error from './error';
import Loader from './loader';
import RightArrow from '../commons/svgicons/right-arrow';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loader />);

const EditProfile = ({ router }) => {
  console.log(router);
  const userId = router?.query?.id;
  console.log(userId);
  const dataFetcher = () => getUserProfile(userId);
  const [fetchState, retry, data] = useFetcher(dataFetcher);
  const userData = data?.data;

  const handleBackClick = () => {
    router.back();
  };

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div>
        <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-center">
          <div onClick={handleBackClick} className="p-4 h-16 flex items-center justify-center absolute top-0 left-0">
            <Back />
          </div>
          <div className="font-bold">Edit Profile</div>
        </div>
        <div className="header flex w-full flex-col items-center pt-7 pb-2">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img src={userData?.profilePic} alt="PP" className="object-cover" />
            </div>
            <p className="p-2 text-sm">Change photo</p>
          </div>
        </div>
        <div className="flex p-4 flex-col">
          <div className="flex justify-between m-4">
            <div className="mr-2 font-medium">Name</div>
            <div className="flex">
              <Link href={`/edit/${userId}?field=name`}>
                <div className="text-gray-500">{`${userData?.firstName} ${userData?.lastName}`}</div>
              </Link>
              <RightArrow />
            </div>
          </div>
          <div className="flex justify-between m-4">
            <div className="mr-2 font-medium">Username</div>
            <div className="flex">
              <Link href={`/edit/${userId}?field=userHandle`}>
                <div className="text-gray-500">{userData?.userName}</div>
              </Link>
              <RightArrow />
            </div>
          </div>
          <div className="flex justify-between m-4">
            <div className="mr-2 font-medium">Bio</div>
            <div className="flex">
              <Link href={`/edit/${userId}?field=bio`}>
                <div className="text-gray-500">{userData?.bio}</div>
              </Link>
              <RightArrow />
            </div>
          </div>
        </div>
      </div>
    </ComponentStateHandler>
  );
};

export default withRouter(EditProfile);
