/*eslint-disable @next/next/no-img-element */

import EmbedIcon from "../commons/svgicons/embedicon-black";
import Share from "../commons/svgicons/share-black";
import Comment from "../commons/svgicons/comment-black";
import Like from "../commons/svgicons/like-black";
import Mute from "../commons/svgicons/mute";
import Close from "../commons/svgicons/close-white";
import UpArrow from "../commons/svgicons/up-arrow";
import DownArrow from "../commons/svgicons/down-arrow";
import { withRouter } from "next/router";
import VideoInfo from "../desk-video-info";
import EmbedSeekbar from "../emded-seekbar";
import { withBasePath } from "../../config";
import Video from "./video";
import Charmboard from "../desk-charmboard";
import { useEffect } from "react";
import { CopyToClipBoard } from "../../utils/web";
import { trimHash, trimSpace } from "../../utils/string";
import { numberFormatter } from "../../utils/convert-to-K";
import useDrawer from "../../hooks/use-drawer";
import CopyEmbedCode from "../copy-embed-code.js";
import useSnackbar from "../../hooks/use-snackbar";
import useDialog from "../../hooks/use-dialog";
import Sidebar from "./sidebar"
import fallbackUser from "../../../public/images/users.png"
import Img from "../commons/image";
import DeskHoverInfo from "../desk-hover-info";
import VerifiedLg from "../commons/svgicons/verified-lg";
import Description from "../desk-description";
import Header from "../desk-header";
import DeskMenu from "../desk-menu";
import { analyticsCleanup, reportPlaybackEnded, videoAnalytics } from "../../analytics/conviva";

function VideoDetail({url,firstFrame,
userProfilePicUrl='', userName, music_title, likesCount, muted, unMute,firstName, lastName,
description, updateActiveIndex, index, router, videoId, handleUpClick, handleDownClick,
hideVideoDetail, shareCount, activeIndex, socialId, commentCount, type = 'feed',userVerified,
comp = 'normal'}) {

   const {show:showDialog} = useDialog();
   const {showSnackbar} = useSnackbar();

   console.log("FIRST",firstName, lastName)
   const toHashTag =(hashtag)=>{
      let finalValue = hashtag;
      if(hashtag?.includes('#')){
        hashtag = trimSpace(hashtag)
        finalValue = trimHash(hashtag)
      }
      // router?.push(`/hashtag/${finalValue}`)
    }
   
    const toUser =(username)=>{
      // let finalValue = username;
      // if(hashtag?.includes('#')){
      //   finalValue = trimHash(hashtag)
      // }
      // router?.push(`/${username}`)
    }

   

useEffect(()=>{
//  window.history.replaceState('video detail page','detail',`/@${userName}/video/${videoId}`
 comp !== 'deskSingleVideo' && window.history.replaceState('video detail page','detail',`/video/${videoId}`
 )
},[videoId])

useEffect(() => {
   if(typeof window !== undefined){
      window?.addEventListener("beforeunload", ()=>{
         if(videoAnalytics !== null) reportPlaybackEnded();
      })
   }
   return () => {
      window.removeEventListener('beforeunload', ()=>{
         if(videoAnalytics !== null) reportPlaybackEnded();
      });
      analyticsCleanup();
   }
}, [])

const onEmbedCopy =()=>{
   showSnackbar({ message: 'Copied to Clipboard' });
}

const pushToProfile = ()=>{
   window.location.href = `/@${userName}`
}

const gotUrl = window?.location?.href;
let domain = (new URL(gotUrl));
domain = domain?.origin;

// const redirect = (item) =>{
//    try{  
//      if(item?.indexOf('#')!==-1){
//        const trimmedHashtag = trimHash(item);
//        console.log("item",trimmedHashtag);
//        router?.push(`/hashtag/${trimmedHashtag}`);
//      }else
//      if(item?.indexOf('@')!==-1){
//        const userHandle = (item);
//        // console.log("item",trimmedHashtag);
//        router?.push(`/${userHandle}`);
//      }
//    }catch(e){
//        console.log("error in hashtag redirect",e)
//      }
//    }

   // const 

   const NavigationBtns = {
      normal : <>
       {activeIndex > 0 && <div onClick={handleDownClick} className="absolute right-4 top-1/2 -mt-16  bg-gray-300 p-2 bg-opacity-30 rounded-full cursor-pointer">
          <UpArrow/>
       </div>}
       <div onClick={handleUpClick} className="absolute right-4 top-1/2  bg-gray-300 p-2 bg-opacity-30 rounded-full cursor-pointer">
          <DownArrow/>
       </div>
       <div onClick={hideVideoDetail} className="absolute left-4 bg-gray-300 p-2 bg-opacity-30 rounded-full top-6 cursor-pointer">
          <Close/>
       </div>
       </>,
      deskSingleVideo : ''
   }

   const parentWidth = {
      normal : 'w-screen h-screen',
      deskSingleVideo : 'w-full h-full'
   }
   const videoheight= {
      normal : 'h-screen',
      deskSingleVideo : 'h-80v'
   }
return (
<div className={`flex ${parentWidth[comp]}`}>
   <div className={`flex ${videoheight[comp]} w-8/12 bg-black justify-center relative overflow-hidden`}>
      <Video url={url} firstFrame={firstFrame} shareCount={shareCount} comp={comp} videoId={videoId}/>
      {NavigationBtns[comp]}
   </div>
   <div className={`flex ${videoheight[comp]}  w-4/12 overflow-hidden bg-white flex-col`}>
      <div className="head-sec flex ">
         <div className="videoFooter__text w-full">
            <div className="videoFooter__text w-full px-6 pt-4 pb-2">
            <div className="flex justify-between items-center">
               <div className="flex items-center">
                  <div onClick={pushToProfile} className="flex items-center w-12 h-12 overflow-hidden cursor-pointer rounded-full mr-4">
                   <Img data={userProfilePicUrl} fallback={fallbackUser?.src}/>
                  </div>
                  <div className="flex flex-col">
                  <div className='flex items-center'>
                  <span  
                     className="usrhvr relative hover:border-b border-black font-semibold text-base text-gray-700 cursor-pointer">
                      <h1 onClick={pushToProfile} className="font-bold flex items-center text-md text-gray-700 cursor-pointer">
                       {userName} 
                      </h1>
                     <div className='usrdeck absolute z-50 top-4 -left-16'>
                     <DeskHoverInfo id={userName}/>
                     </div>  
                  </span>
                  <div className="ml-2">{userVerified === 'verified' ? <VerifiedLg/> : ''} </div>
                  </div>
                  <div className='text-sm text-gray-600'>{`${firstName ? firstName : ''} ${lastName ? lastName : ''}`}</div>
                  </div>
               </div>   
               <div className="flex justify-end">
               </div>
            </div>
            <div className=" text-sm w-8/12 mb-2 mt-1 text-gray-700">
            <Description description={description} />
           </div>
            <div className="w-8/12 my-1 text-sm">
               <svg className="float-left" width="20" height="20" viewBox="6 0 24 24" fill="none">
                  <path className="st0" fill="#000" d="M12,3v10.6c-0.6-0.3-1.3-0.6-2-0.6c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4V7h4V3H12z"></path>
               </svg>
               <span className=" my-1 text-sm w-4/12">
                  <p className="m-0 m-auto whitespace-nowrap overflow-hidden">
                     <span className="pl-100 inline-block animate-marquee">{music_title}</span>
                  </p>
               </span>
            </div>
         </div>
         </div>
      </div>
    
      <div className="flex px-6 pb-2 justify-between ">
      <Sidebar
      likesCount={likesCount}
      sharecount={shareCount}
      commentCount={commentCount}
      userName={userName}
      videoId={videoId}
      socialId={socialId}
      comp={comp}
   />
         {/* <div className="flex">
            <div className="pr-4 flex items-center">
               <Like />
               <span className=' text-xs font-semibold px-2'>
            {numberFormatter(likesCount)}
            </span>
            </div>
            <div className="pr-4 flex items-center">
               <Comment />
            </div>
            {/* <div className="pr-4 flex items-center">
               <Share />
               <span className=' text-xs font-semibold px-2'>
            {numberFormatter(shareCount)}
            </span>
            </div>  */}
         {/* </div> */}
         <div onClick={() => showDialog('Embed Code', CopyEmbedCode,'medium', { videoId, onEmbedCopy })} className='cursor-pointer'>
            <EmbedIcon />
         </div>
      </div>
      <div className='flex px-6 py-2 justify-between border-b-2 border-gray-100'>
           {domain && <div  className="flex bg-gray-100 border rounded items-center w-full"><p className="w-9/12 px-2 truncate text-sm text-gray-500 font-light">{`${domain}/video/${videoId}`}</p>
            <button className="w-3/12 cursor-pointer font-semibold bg-white text-sm border p-2 text-gray-700" onClick={
             ()=>{
                CopyToClipBoard(`${domain}/video/${videoId}`);
                showSnackbar({message : 'Copied to clipboard'});
                 }
            }>Copy Link</button>
            </div>}
         </div>
      <Charmboard type='video-detail' videoId={videoId}/>
</div>
</div>
);
}
export default withRouter(VideoDetail);