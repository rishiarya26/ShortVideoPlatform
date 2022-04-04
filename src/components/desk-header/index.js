/*eslint-disable @next/next/no-img-element */
import { withBasePath } from "../../config";
import CloseSolid from "../commons/svgicons/close-solid";
import Search from "../commons/svgicons/search";

const Header = ()=>(
    <div className="w-full fixed top-0 z-10 flex bg-white head-shadow items-center justify-center">
   <div className="w-3/4  h-16 flex bg-white items-center px-6 justify-between">
      <div className="w-16">
      <img  src={withBasePath('icons/Logo_hipi.png')} />
      </div>

      <div>
         <div className="flex bg-gray-100 rounded-full py-2 px-6 items-center relative">
            <div>
            <input className="w-56 bg-gray-100 text-sm" type="search" value="" placeholder="Search accounts and videos " /> 
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
      <img alt="profile-pic" className="usrimg w-10 h-10 rounded-full" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />
      </div>
      </div> 
   </div>
)

export default Header;