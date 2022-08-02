/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/display-name */
import { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { getUserProfile, getUserProfileWLogin, toFollow } from '../../sources/users/profile';
import { numberFormatter } from '../../utils/convert-to-K';
import useDrawer from '../../hooks/use-drawer';
import dynamic from 'next/dynamic';
import Img from '../commons/image';
import fallbackUser from '../../../public/images/users.png' 
import useAuth from '../../hooks/use-auth';
import login from "../auth-options"
import { localStorage } from '../../utils/storage';
import useSnackbar from '../../hooks/use-snackbar';
import Verified from '../commons/svgicons/verified';
import Loader from './loader';

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const LandscapeView = dynamic(
  () => import('../landscape'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function DeskHoverInfo({id}) {
  const [item, setItem] = useState({});
  const [selectedTab, setSelectedTab] = useState('all');
//   const [showLoading, setShowLoading] = useState(isFetching)
  const [isFollowing,setIsFollowing] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
//   useEffect(()=>{
//     setIsFollowing(isFollow);
//   },[isFollow])

//   useEffect(()=>{setShowLoading(isFetching)},[isFetching])

  const { show } = useDrawer();
  const { t } = useTranslation();

  const getProfileInfo = useAuth(getUserProfile ,getUserProfileWLogin)

  const dataFetcher = async() => {
    try{
        const resp = await getProfileInfo(id);
        resp?.data && setItem(resp.data);
        console.log()
        setIsFollowing(resp?.data?.isFollowing);
        setLoading(false);
    }catch(e){
      console.log(e);
      setLoading(false);
    }
    }

  useEffect(()=>{
      dataFetcher();
  },[id])

  const followUser = async(followerId,userId, follow) =>{
    const response = await toFollow({ userId:followerId,followerId:userId,follow:follow});
    if(response){
     setIsFollowing(!isFollowing);
  } 
  }

  const userId = localStorage.get('user-id');
  const followFunc = !isFollowing;

  const {showSnackbar} = useSnackbar();
  const showMessage=({message})=>{
    showSnackbar({message: message})
 }

  const toShowFollow = useAuth( ()=>show('',login, 'big',{showMessage:showMessage}), ()=>followUser(item?.id, userId, followFunc))

  return ( 
    <>{loading ? <Loader /> : 
    <div className="flex flex-col pt-10 rounded-md w-520 "> 
    <div className='opacity-0'></div>
    <div className="flex flex-col bg-white p-6 rounded-md w-320 shadow-lg border border-gray-100"> 
    <div className="flex justify-between">
      <div className='flex flex-col'> 
          <div onClick={()=>router.push(`/${item?.userHandle}`)} className="flex items-center w-12 h-12 overflow-hidden cursor-pointer rounded-full">
              <Img data={item?.profilePic} title="Hipi" fallback={fallbackUser?.src} />
          </div>
          <h3  onClick={()=>router.push(`/${item?.userHandle}`)} 
          className="border-black font-semibold text-base text-gray-700 cursor-pointer mt-2 flex items-center">
            {item?.userHandle} 
           <span className='ml-1'>{item?.tag === 'Verified' ? <Verified/> : ''}</span>
          </h3>
          <p className="text-sm font-normal text-gray-500">{item?.firstName} {item?.lastName}</p>
      </div>
        <div>
        <button 
          onClick={toShowFollow}
          // onClick={handleFollow} 
          className={isFollowing ? "font-semibold text-sm border border-black rounded py-1 px-9 mr-1 bg-white text-black" : "font-semibold text-sm border border-hipired rounded py-1 px-9 mr-1 bg-white text-hipired"}>
            {isFollowing ? 'Following' : t('FOLLOW')}
          </button>
        </div>
      </div>
      <div className="list flex mt-2">
                  <div className="flex text-gray-700 items-center ">
                     <p className="font-bold text-lg">{numberFormatter(item?.followers)}</p>
                     <p className="pl-2 font-normal">Followers</p>
                  </div>
                  <div className="flex text-gray-700 items-center ml-4">
                     <p className="font-bold text-lg">{numberFormatter(item?.totalLikes)}</p>
                     <p className="pl-2 font-normal text-sm">Likes</p>
                  </div>
            </div>
            {item?.bio && <div className="Bio border-t pt-3 mt-3">
               <p className=" pr-12 h-full flex items-center  text-sm font-light text-gray-600">
                                 {item?.bio}
               </p>
            </div>}
   </div>
    </div>
    }</>
  );
}

export default withRouter(DeskHoverInfo);
