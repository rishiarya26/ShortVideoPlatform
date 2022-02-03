/*eslint-disable @next/next/no-img-element */

import CloseSolid from "../commons/svgicons/close-solid";
import SearchBlack from "../commons/svgicons/search-black";
import ShareOutline from "../commons/svgicons/share-outline";
import { withBasePath } from '../../config';
import Play from '../commons/svgicons/play-outlined';

function ProfileDesk() {
return (
<div className="flex flex-col w-screen h-screen">
   <div className="w-full h-20 flex bg-white drop-shadow-lg border-b-2 border-gray-200 items-center px-6 justify-between">
      <div className="w-16">
      <img  src={withBasePath('icons/Logo_hipi.png')} />
      </div>
      <div>
         <div className="flex bg-gray-100 rounded-full py-2 px-6 items-center relative">
            <div>
            <input className="w-56 bg-gray-100" type="search" value="" placeholder="Search accounts and videos " />
            </div>
            <div className="ml-16">
               <CloseSolid/>
            </div>
            <div className=" ml-4 w-px h-8 bg-gray-300">

            </div>
            <div className="pl-4">
               <SearchBlack/>
            </div>
         </div>
      </div>
      <div>
      <img alt="profile-pic" className="usrimg w-8 h-8 rounded-full  mr-4" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />
      </div>
   </div>


   <div className="flex w-full h-screen bg-white justify-center relative overflow-hidden">
      <div className="w-64 flex flex-col p-4">
         <div className="flex flex-col pb-6 border-b-2 border-gray-100">
               <p className="font-semibold text-lg py-2 pl-4">For You </p>
               <p className="font-semibold text-lg py-2 pl-4">Following </p>
               <p className="font-semibold text-lg py-2 pl-4">Explore </p>
         </div>
         <div className="flex flex-col pb-6 border-b-2 border-gray-100">
            <p className="font-medium hash_tag text-sm text-gray-500 py-2 ">Suggested Accounts</p>
            <div className="flex py-2">
               <img alt="profile-pic" className="usrimg w-10 h-10 rounded-full  mr-1" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />
               <div className="flex flex-col px-2">
                  <p className="font-semibold text-md ">Name</p>
                  <p className="text-sm text-gray-400">Username</p>
               </div>
               </div>

               <div className="flex py-2">
               <img alt="profile-pic" className="usrimg w-10 h-10 rounded-full  mr-1" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />
               <div className="flex flex-col px-2">
                  <p className="font-semibold text-md ">Name</p>
                  <p className="text-sm text-gray-400">Username</p>
               </div>
               </div>
         </div>
         <div className="flex flex-col text-sm text-gray-400">
            <div className="p-1 cursor-pointer">Privacy Policy</div>
            <div className="p-1 cursor-pointer">© 2022 Hipi</div>
         </div>
      </div>
      <div className="w-full ml-6 p-8 flex flex-col overflow-scroll">
         <div className="profile-details flex flex-col w-1/2 relative"> 
         <div className="absolute right-4 top-4">
            <ShareOutline/>
         </div>
            <div className="flex items-center pb-2">
               <div className="flex items-center">
                  <img alt="profile-pic" className="usrimg w-32 h-32 rounded-full  mr-4" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />    
               </div>
               <div className="flex flex-col h-32 justify-between">
                  <div>
                  <h3 className=" mb-1 mt-1.5 font-bold text-2xl ">@Princenarula</h3>
                  <p>Username</p>
                  </div>
                  <button className="font-semibold text-md border border-hipired rounded-md py-1 px-24 mr-1 h-10 bg-hipired text-white">Follow</button>
               </div>
            </div>
            <div className="list flex  mt-8">
                  <div className="flex text-gray-700 items-end">
                     <p className="font-semibold text-lg">544</p>
                     <p className="pl-2">Following</p>
                  </div>
                  <div className="flex text-gray-700 items-end ml-4">
                     <p className="font-semibold text-lg">150</p>
                     <p className="pl-2">Followers</p>
                  </div>
                  <div className="flex text-gray-700 items-end ml-4">
                     <p className="font-semibold text-lg">55</p>
                     <p className="pl-2">LIkes</p>
                  </div>
            </div>
            <div className="Bio">
               <p className="py-4 pr-12 text-gray-00 text-md text-center h-full flex items-center">
                                 Bio goes here
               </p>
            </div>
            </div>
            {/* profile head */}
            <div className="Video_gallery flex flex-col">
               <div className="flex tabs">
                  <div className="px-24 cursor-pointer font-semibold text-md py-2 border-b-2 border-black">
                     Videos
                  </div>
                  <div className="px-24 cursor-pointer font-semibold text-md text-gray-400 py-2">
                     Liked
                  </div>
               </div>
               <div className="video-tiles flex flex-wrap -ml-4">
                  <div className="w-13v  m-4 rounded-md relative overflow-hidden">
                  
                  <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 text-white text-md font-semibold flex items-center">
                     <Play/> 333k
                  </div>
                  <img className="h-16.6v" src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1643111692/hipi/videos/0b9adcb9-4269-4e56-add4-a71fd9e34f90/0b9adcb9-4269-4e56-add4-a71fd9e34f90_00.webp"/>
                  </div>
                  
                  <p>Description goes here </p>
                  </div>

                  <div className="w-13v  m-4 rounded-md relative overflow-hidden">
                  
                  <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 text-white text-md font-semibold flex items-center">
                     <Play/> 333k
                  </div>
                  <img className="h-16.6v" src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1643111692/hipi/videos/0b9adcb9-4269-4e56-add4-a71fd9e34f90/0b9adcb9-4269-4e56-add4-a71fd9e34f90_00.webp"/>
                  </div>
                  
                  <p>Description goes here </p>
                  </div>

                  <div className="w-13v  m-4 rounded-md relative overflow-hidden">
                  
                  <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 text-white text-md font-semibold flex items-center">
                     <Play/> 333k
                  </div>
                  <img className="h-16.6v" src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1643111692/hipi/videos/0b9adcb9-4269-4e56-add4-a71fd9e34f90/0b9adcb9-4269-4e56-add4-a71fd9e34f90_00.webp"/>
                  </div>
                  
                  <p>Description goes here </p>
                  </div>

                  <div className="w-13v  m-4 rounded-md relative overflow-hidden">
                  
                  <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 text-white text-md font-semibold flex items-center">
                     <Play/> 333k
                  </div>
                  <img className="h-16.6v" src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1643111692/hipi/videos/0b9adcb9-4269-4e56-add4-a71fd9e34f90/0b9adcb9-4269-4e56-add4-a71fd9e34f90_00.webp"/>
                  </div>
                  
                  <p>Description goes here </p>
                  </div>

                  <div className="w-13v  m-4 rounded-md relative overflow-hidden">
                  
                  <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 text-white text-md font-semibold flex items-center">
                     <Play/> 333k
                  </div>
                  <img className="h-16.6v" src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1643111692/hipi/videos/0b9adcb9-4269-4e56-add4-a71fd9e34f90/0b9adcb9-4269-4e56-add4-a71fd9e34f90_00.webp"/>
                  </div>
                  
                  <p>Description goes here </p>
                  </div>

                  <div className="w-13v  m-4 rounded-md relative overflow-hidden">
                  
                  <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 text-white text-md font-semibold flex items-center">
                     <Play/> 333k
                  </div>
                  <img className="h-16.6v" src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1643111692/hipi/videos/0b9adcb9-4269-4e56-add4-a71fd9e34f90/0b9adcb9-4269-4e56-add4-a71fd9e34f90_00.webp"/>
                  </div>
                  
                  <p>Description goes here </p>
                  </div>

                  <div className="w-13v  m-4 rounded-md relative overflow-hidden">
                  
                  <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 text-white text-md font-semibold flex items-center">
                     <Play/> 333k
                  </div>
                  <img className="h-16.6v" src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1643111692/hipi/videos/0b9adcb9-4269-4e56-add4-a71fd9e34f90/0b9adcb9-4269-4e56-add4-a71fd9e34f90_00.webp"/>
                  </div>
                  
                  <p>Description goes here </p>
                  </div>

                  <div className="w-13v  m-4 rounded-md relative overflow-hidden">
                  
                  <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 text-white text-md font-semibold flex items-center">
                     <Play/> 333k
                  </div>
                  <img className="h-16.6v" src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1643111692/hipi/videos/0b9adcb9-4269-4e56-add4-a71fd9e34f90/0b9adcb9-4269-4e56-add4-a71fd9e34f90_00.webp"/>
                  </div>
                  
                  <p>Description goes here </p>
                  </div>
                  
               </div>
               
            </div>
      </div>
   </div>
</div>
);
}
export default ProfileDesk;