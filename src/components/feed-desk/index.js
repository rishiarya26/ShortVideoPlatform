
import CloseSolid from "../commons/svgicons/close-solid";
import Search from "../commons/svgicons/search";
import ShareOutline from "../commons/svgicons/share-outline";
import { withBasePath } from '../../config';

function FeedDesk() {
return (
<div className="flex flex-col w-screen h-screen items-center">
   <div className="w-full h-20 flex bg-white drop-shadow-lg border-b-2 border-gray-200 items-center px-6 justify-between">
      <div className="w-20">
      <img  src={withBasePath('icons/Logo_hipi.png')} />
      </div>
      <div>
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
      </div>
      <div>
      <img alt="profile-pic" className="usrimg w-8 h-8 rounded-full  mr-4" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />
      </div>
   </div>


   <div className="flex  bg-white justify-center relative overflow-hidden  w-3/4">
      <div className="w-2/6 flex flex-col p-4">
         <div className="flex flex-col pb-6 border-b-2 border-gray-200">
               <p className="font-semibold text-lg py-2 pl-4">For You </p>
               <p className="font-semibold text-lg py-2 pl-4">Following </p>
               <p className="font-semibold text-lg py-2 pl-4">Explore </p>
         </div>
      </div>
      <div className="w-4/6 p-8 flex overflow-scroll">
            <div className="avatar">
            <div className="flex items-center w-16 h-16 overflow-hidden rounded-full">
                  <img alt="profile-pic" className="usrimg" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />    
               </div>
            </div>
      </div>
   </div>
</div>
);
}
export default FeedDesk;