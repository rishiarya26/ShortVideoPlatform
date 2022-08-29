/*eslint-disable @next/next/no-img-element */

import { withBasePath } from "../../config";
import { useRouter } from "next/router";  

function HeaderBusiness({type = 'toFeed'}) {

   const router = useRouter();
   const redirect ={

      toFeed : '/feed/for-you',

      toAds : '/ads'

   }

return (
   <>
  
   <div className="w-full fixed top-0 z-10 flex bg-white head-shadow items-center justify-center z-10">
      <div className="w-3/4 w-feed h-16 flex bg-white items-center px-6 justify-between">
         <a className="w-14 cursor-pointer"  onClick={()=>router.push(redirect?.[type])} >
            <img alt="hipi logo"  src={withBasePath('icons/Logo_hipi.png')} />
         </a>
         <div className="flex items-center">
            {/* <div className="text-gray-700 font-medium px-4" onClick={()=>router?.push('/terms-conditions.html')}>
                Ad products
            </div>
            <div className="text-gray-700 font-medium px-4">
            Advertise 
            </div>
            <div className="text-gray-700 font-medium px-4">
            Engage 
            </div>
            <div className="text-gray-700 font-medium px-4">
            Commerce 
            </div> */}
            <a onClick={()=>router.push('/ads/#ad_form')} className=" m-4 mr-0 font-semibold text-sm border border-hipired rounded py-2 px-4 bg-hipired text-white cursor-pointer">
            Contact Us
            </a>
         </div>
         {/* <div className="flex md:hidden px-4">
               <BurgerGray/>
         </div> */}
      </div>
   </div>

   </>
);
}
export default HeaderBusiness;