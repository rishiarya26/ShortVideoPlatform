/* eslint-disable react/no-unknown-property */
/*eslint-disable @next/next/no-img-element */

import CloseSolid from "../commons/svgicons/close-solid";
import Search from "../commons/svgicons/search";
import { withBasePath } from '../../config';
import Mute from "../commons/svgicons/mute";
import MusicBlack from "../commons/svgicons/music-black";
import Comment from "../commons/svgicons/comment-black"
import Like from "../commons/svgicons/like-black";
import Share from "../commons/svgicons/share-black";

function FeedDesk() {
return (
<div className="flex flex-col w-screen h-screen items-center">
   <div className="w-full h-20 flex bg-white drop-shadow-lg border-b-2 border-gray-200 items-center px-6 justify-between">
      <div className="w-16">
      <img  alt="hipi logo"    src={withBasePath('icons/Logo_hipi.png')} />
      </div>

      {/* <div>
         <div className="flex bg-gray-100 rounded-full py-2 px-6 items-center relative">
            <div>
            <input className="w-56 bg-gray-100" type="search" value="" placeholder="Search accounts and videos " />
            </div>
            <div className="ml-4">
               <CloseSolid/>
            </div>

            <div className=" ml-4 w-px h-8 bg-gray-300">

            </div>
            <div className="pl-4">
               <Search/>
            </div>
         </div>
      </div> */}
      <div>
      <img alt="profile-pic" className="usrimg w-8 h-8 rounded-full  mr-4" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />
      </div>
   </div>


   <div className="flex h-screen  bg-white justify-center relative overflow-hidden  w-3/4">
      <div className="w-4/12 flex flex-col p-4">
         <div className="flex flex-col pb-6 border-b-2 border-gray-200">
               <p className="font-semibold text-lg py-2 pl-4">For You </p>
               <p className="font-semibold text-lg py-2 pl-4">Following </p>
               <p className="font-semibold text-lg py-2 pl-4">Explore </p>
         </div>
      </div>
      <div className="w-8/12 p-8 flex flex-col overflow-scroll no_bar">
         <div className="feed_card flex border-b-2 border-gray-300 pb-8">
            <div className="avatar">
            <div className="flex items-center w-16 h-16 overflow-hidden rounded-full cursor-pointer">
                  <img alt="profile-pic" className="usrimg" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />    
               </div>
            </div>
            <div className="video_section flex flex-col  w-3/4 ml-4">
               <div className="header flex flex-col relative">
                     <p> <span className="font-semibold text-lg">NAME </span> Username</p>
                     <p className="font-semibold text-md my-2 mb-4"> <MusicBlack/> no my bestie is a bad b - Luke Franchina</p>
                     <div className="absolute rounded-md  px-6 right-4 top-0 border-2 p-2 border-hipired text-hipired">
                           Follow
                     </div>
               </div>
               <div className="Video flex items-end">
                     <div className="desk-feed rounded-md overflow-hidden relative">
                        <video playsinline="" autoPlay="" preload="auto" importance="high" loop="" className="vdo_player" src="https://z5shorts.akamaized.net/2022/0/21/807dc125-ef6c-49ac-b92e-8d12b4f0e3b8/807dc125-ef6c-49ac-b92e-8d12b4f0e3b8_1536.mp4?hdnea=st=1643353521~exp=1643367921~acl=/*~hmac=d664de68e5020f873bc6875de493f8173c800751822d4472926f736d25645b29" type="video/mp4"  poster="https://akamaividz2.zee5.com/image/upload/w_300/v1642760371/hipi/videos_ff/807dc125-ef6c-49ac-b92e-8d12b4f0e3b8/807dc125-ef6c-49ac-b92e-8d12b4f0e3b8.webp" objectfit="cover"></video>
                        <div className="absolute bottom-4 right-4">
                              <Mute/>
                        </div>
                     </div>
                     <div className="sidebar flex flex-col items-center ml-4">
                        <div className="flex flex-col items-center my-4">
                     <Like />
                     455
                     </div>
                     <div className="flex flex-col items-center my-4">
                     <Comment />
                     455
                     </div>
                     <div className="flex flex-col items-center my-4">
                     <Share />
                     455
                     </div>
                     </div>
               </div>
            </div>
            </div>
      </div>
   </div>
</div>
);
}
export default FeedDesk;