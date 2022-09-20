/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/display-name*/
import React from 'react';
import Like from '../commons/svgicons/like';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import { useRouter } from 'next/router';
import { onStoreRedirect } from '../../utils/web';
import AdCards from '../ad-cards';

function EmbedVideoSidebar(props) {
const router = useRouter();
  // const { show } = useDrawer();

  // const stores = {
  //   android: ANDROID_STORE,
  //   ios: IOS_STORE
  // };

  // const onStoreRedirect =()=>{
  //   console.log('clicked')
  //   let deviceInfo = 'android';
  //  try{ 
  //    deviceInfo = getOS();
  //    deviceInfo && (window.open(`${stores[deviceInfo]}`));
  //   //  console.log('clicked','window',window.open,'e',getOS(),'f',`${stores[deviceInfo]}`)
  //  }
  //   catch(e){
  //     console.log('error in store redirect')
  //     return `${stores[deviceInfo]}`}
  //   }

    //  const onStoreRedirect =()=>{
    //    window?.open(ONE_TAP_DOWNLOAD);
    //  }

     const toStoreRedirect = async ()=>{
      onStoreRedirect({videoId : props?.videoId})
    }

  const info = {
    single : props?.canShop && props.adData?.monitisation ? 'bottom-20 fixed' : 'bottom-28 fixed',
    embed : props?.canShop && props?.adData?.monitisation ? 'bottom-0 absolute' : 'bottom-20 absolute'
  }

  return (
    <div className={`right-0 text-white flex flex-col items-end ${info[props.type]}`}>
      <div
        onClick={() => {
           router && router?.push(`/@${props?.userName}`);
        }}
        className="relative py-2 px-3 text-center flex justify-center"
      >
        <img
          alt="profile-pic"
          className="usrimg w-12 h-12 rounded-full"
          src={props.profilePic || "https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1625388234/hipi/videos/c3d292e4-2932-4f7f-ad09-b974207b1bbe/c3d292e4-2932-4f7f-ad09-b974207b1bbe_00.webp"}
        />
        <div
          onClick={toStoreRedirect}
          className="absolute bottom-0 left-1/3"
        >
          <Follow />
        </div>
      </div>
      <div
        onClick={toStoreRedirect}
        className="relative py-2 px-3 text-center flex flex-col items-center"
      >
        <Like />
        <p className="text-sm">{props.likes}</p>
      </div>
      <div
        onClick={toStoreRedirect}
        className="relative py-2 px-3 text-center flex flex-col items-center"
      >
        <Comment />
        {/* <p className="text-sm">{props.likes}</p> */}
      </div>
      <div
        onClick={toStoreRedirect}
        className="relative py-2 px-3 text-center flex flex-col items-center"
      >
        <Share />
        <p className="text-sm text-center">Share</p>
      </div>
      <div style={{width: "136px", height: "90px"}}>
          {props.adData?.monitisation &&
            <AdCards
            videoId={props.videoId}
            adCards={props?.adData?.monitisationCardArray}
            profileFeed={false}
            comp={"feed"}
            pageName={props.pageName}
            tabName={""}
            /> 
          }
      </div>
    </div>
  );
}

export default EmbedVideoSidebar;
