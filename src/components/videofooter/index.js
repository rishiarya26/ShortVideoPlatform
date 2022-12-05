/*eslint-disable react/display-name */
import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';
import MusicBlack from '../commons/svgicons/music-black';
import useDrawer from '../../hooks/use-drawer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { trimHash, trimSpace } from '../../utils/string';
import fallbackUser from "../../../public/images/users.png"
import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { getItem } from '../../utils/cookie';
import Verified from '../commons/svgicons/verified';
import useSnackbar from '../../hooks/use-snackbar';
import Img from '../commons/image';
import { toTrackReco } from '../../analytics/view-events';

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);


function VideoFooter({
  userName,
  musicTitle,
  hashTags,
  canShop,
  saveLook,
  comp,
  description,
  adCards,
  showBanner,
  videoId,
  userVerified,
  videoSoundAvailable=true,
  isAdShowVisible,
  profilePic,
  activeVideoId,
  correlationID=null,
  explain=null,
  userId=null,
  tabName=null,
  pageName=null,
}) {
  const [loaded, setLoaded] = useState(false);
  const {showSnackbar} = useSnackbar();
  // TO-DO common classes
  const type = {
    profile: `${(canShop &&  !adCards?.monitisation) ? 'bottom-32' : 'bottom-12 '} videoFooter absolute left-0 w-2/3 pr-4 flex text-white ml-2`,
    feed: `${saveLook ? ' bottom-28 ' : ' bottom-56 '} videoFooter absolute left-0  flex text-white ml-2 w-2/3 pr-4`,
    embed: `${canShop ? 'bottom-44' : 'bottom-22'} videoFooter w-2/3 pr-4  flex`,
    single: `${canShop  ? adCards?.monitisation ? 'bottom-20' : 'bottom-36' : 'bottom-16 mb-2'} videoFooter fixed left-0 w-2/3 pr-4 flex text-white ml-2`
  };

  const { show } = useDrawer();
  const router = useRouter();

  const device = getItem('device-info');

  const music = {
    profile:    <Music />,
    feed:   <Music />,
    embed : <MusicBlack/>,
    single : <Music />,
  }

  const toHashTag =(hashtag)=>{
    console.log("***Hash****",hashtag)
    let finalValue = hashtag;
    if(hashtag?.includes('#')){
      console.log(hashtag)
      hashtag = trimSpace(hashtag)
      console.log(hashtag)
      finalValue = trimHash(hashtag)
    }
     router && router?.push(`/hashtag/${finalValue}`)
  }

  const toUser =(username)=>{
    console.log("username****",username)
    // let finalValue = username;
    // if(hashtag?.includes('#')){
    //   finalValue = trimHash(hashtag)
    // }
     router && router?.push(`/${username}`)
  }

  if(!!isAdShowVisible) return false;

  const userNameOnClick = () => {
    toTrackReco("click", {page: pageName, tab: tabName, correlation_id: correlationID, assetId: videoId, user_id: userId, objectID: userId, objectType: "creator"})
    router && router?.push(`/@${userName}`);
  }

  const hashtagOnClick = (item) => {
    toTrackReco("click", {page: pageName, tab: tabName, correlation_id: correlationID, assetId: videoId, user_id: userId, objectID: userId, objectType: "hashtag"})
    item?.includes('#') ? (toHashTag(trimHash(item))) :item?.includes('@') ? toUser(item) : item?.includes('https') ? window?.open(item) : setLoaded(!loaded);
  }

  return (
    <div className={type[comp]} >
      <div className="videoFooter__text w-full break-words">
        {/*
        {canShop === 'success' && (
          <div className="bg-opacity-50 bg-white py-1 px-2 text-black font-semibold max-w-max rounded-lg my-1 text-sm ">
            Shoppable
          </div>
        )} */}
        <h3 onClick={userNameOnClick} className=" mb-1 mt-1.5 font-semibold text-sm flex ">
          @{userName} {userVerified === 'verified' ? <div className="ml-2 mt-1"><Verified/></div>:''}
        </h3>
        <div className=" text-xs  mb-3 mt-2">
          {description && description?.replaceAll('\n',' ')?.split(' ')?.splice(0,loaded ? description?.replaceAll('\n',' ').split(' ').length : 4).map((item,id)=>(
            <span key={id} className={item?.includes('#') ? 'hashtag font-bold':''}  onClick={()=> hashtagOnClick(item)}>{item}{' '}
             </span>
          ))}
         {description && description?.replaceAll('\n',' ')?.split(' ')?.length >= 5 && (loaded ?  
          <span className='ml-2' onClick={()=>{
           setLoaded(false)
          }}>LESS</span> :
          <span className='' onClick={()=>{
           setLoaded(true)
          }}>..MORE</span>)}
          {/* {hashTags
            && hashTags.map((data, id) => (
              <span onClick={()=>toHashTag(data?.name)} key={id}>{data?.name?.includes('#') ? `${data?.name}${' '}` : `#${data?.name}${' '}`}</span>
            ))} */}
        </div>
        {/* {musicCoverTitle}</p> */}
       {videoSoundAvailable ? musicTitle && 
        <div className="w-8/12 flex items-center my-1 text-sm">
          {music[comp]}
          <span onClick={()=>{
            device === 'ios' &&  show('', detectDeviceModal, 'extraSmall', {videoId: videoId && videoId})
            device === 'android' &&  showBanner && showBanner()}} className=" ml-2 text-sm w-4/12">
            <Marquee text={musicTitle} />
          </span>
        </div>
        : 
        <div className="w-full my-1 text-sm">
          {music[comp]}
          <span className="ml-2 my-1 text-sm w-4/12 text-gray-300">
            Audio unavailable
          </span>
        </div>
       }
      </div>
    </div>
  );
}

export default memo(VideoFooter);
