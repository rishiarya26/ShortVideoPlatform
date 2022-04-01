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

function VideoDetail({url,firstFrame,
userProfilePicUrl, userName, music_title, likesCount, muted, unMute,firstName, lastName,
description, updateActiveIndex, index, router, videoId, handleUpClick, handleDownClick,
hideVideoDetail, shareCount}) {

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
 window.history.replaceState('video detail page','detail',`/@${userName}/video/${videoId}`,
 )
},[videoId])

return (
<div className="flex w-screen h-screen">
   <div className="flex w-8/12 h-screen bg-black justify-center relative overflow-hidden">
      {/* <div className="video_blur w-8/12">
         <img src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1632757116/hipi/videos/6d362fe8-1f36-450b-b100-14514e4b998e/6d362fe8-1f36-450b-b100-14514e4b998e_00.webp"/>
      </div> */}
      <Video url={url} firstFrame={firstFrame} shareCount={shareCount}/>
      {/* <div className="absolute right-4 bottom-6 cursor-pointer">
         <Mute/>
      </div> */}
      <div onClick={handleDownClick} className="absolute right-4 top-1/2 -mt-16  bg-gray-300 p-2 bg-opacity-30 rounded-full cursor-pointer">
         <UpArrow/>
      </div>
      <div onClick={handleUpClick} className="absolute right-4 top-1/2  bg-gray-300 p-2 bg-opacity-30 rounded-full cursor-pointer">
         <DownArrow/>
      </div>
      <div onClick={hideVideoDetail} className="absolute left-4 bg-gray-300 p-2 bg-opacity-30 rounded-full top-6 cursor-pointer">
         <Close/>
      </div>
   </div>
   <div className="flex w-4/12 h-screen overflow-hidden bg-white flex-col">
      <div className="head-sec flex ">
         <div className="videoFooter__text w-full p-6 pb-2">
            {/* <div className="flex justify-between items-center pb-2">
            <div className="avatar">
                  <div className="flex items-center w-16 h-16 overflow-hidden rounded-full">
                     <img alt="profile-pic" className="usrimg" src={userProfilePicUrl} />    
                  </div>
               </div>
               <div className="flex justify-end">
                  <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 h-10 bg-hipired text-white">Follow</button>
               </div>
            </div> */}
            <div className="videoFooter__text w-full p-6 pb-2">
            <div className="flex justify-between items-center pb-2">
               <div className="flex items-center">
                  <img alt="profile-pic" className="usrimg w-12 h-12 rounded-full  mr-4" src={userProfilePicUrl} />
                  <h3 className=" mb-1 mt-1.5 font-semibold text-sm ">{userName}</h3>
               </div>
               <div className="flex justify-end">
                  <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 h-10 bg-hipired text-white">Follow</button>
               </div>
            </div>
            <div className=" text-sm w-9/12 mb-2 mt-1">
            {description && description?.replaceAll('\n',' ')?.split(' ').map((item,id)=>(
            <span key={id} className={item?.includes('#') ? 'text-sm font-semibold':''}  onClick={()=>item?.includes('#') ? (toHashTag(trimHash(item))) :
               item?.includes('@') ? toUser(item) : item?.includes('https') && window?.open(item)}>{item}{' '}
               </span>
            ))}
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
      <div className="flex px-6 py-2 justify-between border-b-2 border-gray-100">
         <div className="flex">
            <div className="pr-4">
               <Like />
            </div>
            <div className="pr-4">
               <Comment />
            </div>
            <div className="pr-4">
               <Share />
            </div>
         </div>
         <div className='cursor-pointer'>
            <EmbedIcon />
         </div>
      </div>
      <div className='flex'>
            <input readOnly value={`https://www.hipi.co.in/@${userName}/video/${videoId}`}></input>
            <button onClick={()=>CopyToClipBoard(`https://www.hipi.co.in/@${userName}/video/${videoId}`)}>Copy Link</button>
         </div>
      <Charmboard type='video-detail' videoId={videoId}/>
</div>
</div>
);
}
export default withRouter(VideoDetail);