/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/jsx-no-duplicate-props*/
import { useRouter } from "next/router"
import { useState } from "react"
import { withBasePath } from "../../config"
import Burger from "../commons/svgicons/burger"
import Close from "../commons/svgicons/close-white"
import List from "../commons/svgicons/list"
import PrivacyIco from "../commons/svgicons/privacy"
import Terms from "../commons/svgicons/terms"
import NewsroomIcon from "../commons/svgicons/newsroom";

const HamburgerMenu = ()=>{
   const [open, setOpen]= useState(false);

    const router = useRouter();
    return(
        <>
  <div onClick={()=>setOpen(true)} className="absolute top-0 left-4 burger mt-4 items-center flex justify-center p-4 z-20" >
     <Burger/>
  </div>
  <div className={`absolute w-3/4 h-screen top-0 bg-white z-20 transition-all duration-500 motion-reduce:transition-none ${open ? 'left-0' : 'invisible -left-3/4' }`}>
    <div onClick={()=>setOpen(false)} className="w-full  shadow-lg flex justify-between items-center bg-hipired p-4">
    <img className="w-12 h-8" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
        <Close/>
    </div>
      <div className="flex flex-col p-4">
        <div className="flex flex-col">
        <div onClick={()=> router && router?.push('/about')} className="flex items-center py-3">
            <p className="text-base px-3 text-gray-900 ">About</p>
          </div>
          <div onClick={()=> router && router?.push('/newsroom')} className="flex items-center py-3">
            {/* <NewsroomIcon height="20px" width="20px"/> */}
            <p className="text-base px-3 text-gray-900 ">Newsroom</p>
          </div>
          <div onClick={()=> router && router?.push('/ads')} className="flex items-center py-3">
            <p className="text-base px-3 text-gray-900 ">Ads</p>
          </div>
          <div onClick={()=> router && router?.push('/community-guidelines.html')} className="flex items-center py-3">
            {/* <List/> */}
            <p className="text-base px-3 text-gray-900 ">Community Guidelines</p>
          </div>
          <div onClick={()=> router && router?.push('/privacy-policy.html')} className="flex items-center py-3">
            {/* <PrivacyIco/> */}
            <p className="text-base px-3 text-gray-900 ">Privacy Policy</p>
          </div>
        
          <div onClick={()=> router && router?.push('/terms-conditions.html')} className="flex items-center py-3">
            {/* <Terms/> */}
            <p className="text-base px-3 text-gray-900 ">Terms of Use</p>
          </div>
          <div onClick={()=> router && router?.push('/grievance')} className="flex items-center py-3">
            <p className="text-base px-3 text-gray-900 ">Grievance</p>
          </div>
          <div onClick={()=> router && router?.push('/contact-us')} className="flex items-center py-3">
            <p className="text-base px-3 text-gray-900 ">Contact us</p>
          </div>
          {/* <div onClick={()=>showDialog('Logout', LogoutPopup)} className="flex items-center py-3">
            <Logout/>
            <p className="text-base px-3 text-gray-900 ">Logout</p>
          </div> */}
        </div>
    </div>
  </div>
</>
    )
}

export default HamburgerMenu;