/*eslint-disable react/display-name */
import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';
import MusicBlack from '../commons/svgicons/music-black';
import useDrawer from '../../hooks/use-drawer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { trimHash, trimSpace } from '../../utils/string';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  description
}) {
  const [loaded, setLoaded] = useState(false);
  // TO-DO common classes
  const type = {
    profile: `${canShop === 'success' ? 'bottom-36' : 'bottom-14'} videoFooter absolute left-0  flex text-white ml-2`,
    feed: `${saveLook ? ' bottom-32 ' : ' bottom-56 '} videoFooter absolute left-0  flex text-white ml-2`,
    embed: `${canShop === 'success' ? 'bottom-44' : 'bottom-22'} videoFooter   flex`,
    single: `${canShop === 'success' ? 'bottom-56' : 'bottom-32 mb-2'} videoFooter fixed left-0  flex text-white ml-2`,
  };
  const { show } = useDrawer();
  const router = useRouter()

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
    router?.push(`/hashtag/${finalValue}`)
  }

  const toUser =(username)=>{
    console.log("username****",username)
    // let finalValue = username;
    // if(hashtag?.includes('#')){
    //   finalValue = trimHash(hashtag)
    // }
    router?.push(`/${username}`)
  }

  return (
    <div
      className={type[comp]}
    >
      <div className="videoFooter__text w-2/3  break-words">
        {/*
        {canShop === 'success' && (
          <div className="bg-opacity-50 bg-white py-1 px-2 text-black font-semibold max-w-max rounded-lg my-1 text-sm ">
            Shoppable
          </div>
        )} */}

        <h3 onClick={()=>router?.push(`/@${userName}`)} className=" mb-1 mt-1.5 font-semibold text-sm ">@{userName}</h3>
        <div className=" text-xs  mb-3 mt-2">
          {description && description?.replaceAll('\n',' ')?.split(' ')?.splice(0,loaded ? description.replaceAll('\n',' ').split(' ').length : 4).map((item,id)=>(
            <span key={id} className={item?.includes('#') ? 'hashtag font-bold':''}  onClick={()=>item?.includes('#') ? (toHashTag(trimHash(item))) :
             item?.includes('@') ? toUser(item) : item?.includes('https') ? window?.open(item) : setLoaded(!loaded)}>{item}{' '}
             </span>
          ))}
         {description && description?.replaceAll('\n',' ')?.split(' ')?.length >= 5 && (loaded ?  
          <span className='ml-2' onClick={()=>{
           setLoaded(false)
          }}>LESS</span> :
          <span className='ml-2' onClick={()=>{
           setLoaded(true)
          }}>..MORE</span>)}
          {/* {hashTags
            && hashTags.map((data, id) => (
              <span onClick={()=>toHashTag(data?.name)} key={id}>{data?.name?.includes('#') ? `${data?.name}${' '}` : `#${data?.name}${' '}`}</span>
            ))} */}
        </div>
        {/* {musicCoverTitle}</p> */}
        <div className="w-8/12 my-1 text-sm">
          {music[comp]}
          <span onClick={()=>show('', detectDeviceModal, 'extraSmall', {text: "profile"})} className=" my-1 text-sm w-4/12">
            <Marquee text={musicTitle} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
