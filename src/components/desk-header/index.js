/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/display-name */
import { data } from "autoprefixer";
import dynamic from "next/dynamic";
import { withBasePath } from "../../config";
import useAuth from "../../hooks/use-auth";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import CloseSolid from "../commons/svgicons/close-solid";
import Search from "../commons/svgicons/search";
import {getUserProfile} from "../../sources/users/profile"
import { localStorage } from "../../utils/storage";
import { useEffect, useState } from "react";
import Img from "../commons/image";
// import fallbackUser from '../../../public/images/users.png' 
import Logout from "../commons/svgicons/logout";
import LogoutPopup from "../desk-logout-popup";
import { useRouter } from "next/router";
import DeskSearch from "../desk-search";
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import UploadPlusSvg from "../commons/svgicons/upload-plus";
import ProfileSm from "../commons/svgicons/profile-small";

const Header = ({doReload, type='normal', typeParam, searchType='explore'})=>{
   const [userInfo, setUserInfo] = useState({});
   const [showlogoutMenu,setShowlogoutMenu] = useState(false);

   const user = localStorage.get('user-details') ?? {};
   const trimmedUserHandle = user?.userHandle?.replace('@','');
   
   const login = dynamic(
      () => import('../auth-options'),
      {
        loading: () => <div />,
        ssr: false
      }
    );
    const showMessage=({message})=>{
      showSnackbar({message: message})
   }
   const {show} = useDrawer();
    const {showSnackbar} = useSnackbar();
    const router = useRouter();

    const tokens = localStorage?.get('tokens') || null;
    let isLoggedIn = useAuth('false','true');
    const userId = localStorage.get('user-id');

    useEffect(()=>{
      if(tokens){
         isLoggedIn = 'true';
      }
    },[tokens]);

    useEffect(()=>{
       if(isLoggedIn === 'true'){
          const userId = localStorage?.get('user-id');
         const getUserInfo = async()=>{
            const data = await getUserProfile(userId);
            setUserInfo(data?.data);
         }
         getUserInfo();
       }
    },[isLoggedIn])

    console.log('isLoggedIn',isLoggedIn);

const redirectToFeed = ()=>{
   // window.location.href = '/feed/for-you'
   router && router.push('/feed/for-you');
}

const naviagteToUploadPage = () => {
   let {id} = router.query;
   if(id !== 'upload') router && router.push('/upload');
}
 
   return(
    <div className="w-full fixed top-0 z-10 flex bg-white head-shadow items-center justify-center">
   <div className="w-3/4 w-feed h-16 flex bg-white items-center px-6 justify-between">
      <div onClick={typeParam === 'for-you' ? (doReload && (()=>doReload())) : redirectToFeed} className="w-14 cursor-pointer">
      <img alt="hipi logo"  src={withBasePath('icons/Logo_hipi.png')} />
      </div>
     <div>
        <DeskSearch type={searchType}/>
      </div> 
      {/* <div>
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
      </div> */}
       <div className="flex">
         <div id="uploadButton" className={`border border-gray-200 px-3 py-1 flex justify-center items-center rounded-sm w-28 cursor-pointer hover:bg-gray-100  text-gray-600 mr-4`}
         onClick={isLoggedIn === 'true' ? () => naviagteToUploadPage() : () =>show('', login, 'big',{showMessage:showMessage})}> 
            <UploadPlusSvg />
            <span className="text-sm font-semibold pl-2">
               Upload
            </span>
         </div>
           {isLoggedIn === 'true'?
           <div className="relative">
           <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-300 cursor-pointer' onClick={()=>setShowlogoutMenu(!showlogoutMenu)}>
             { userInfo?.profilePic ? 
             <Img data={userInfo?.profilePic} fallback={'/images/users.png'}/> : 
             Object.keys(userInfo)?.length > 0 && <div className='w-10 h-10 text-lg rounded-full cursor-pointer usricon flex items-center justify-center font-semibold'>
                {userInfo?.firstName?.split(' ')?.map(name =>name[0])?.join('').toUpperCase()}
             </div>
             }
           {showlogoutMenu && 
            <div className="absolute top-12 right-6 w-40 flex items-center cursor-pointer flex-col bg-white box_shadow_1 rounded-md p-2 ">
            <div className="flex items-center border-b border-gray-300 w-full py-3 px-2">
            <ProfileSm/>
            <p className="text-sm px-3 font-semibold" onClick={() => router.push(`/${userId}`)}>View profile</p>
            </div>
            <div onClick={()=>{
               toTrackMixpanel('cta',{name: 'Logout'})
               show('Logout', LogoutPopup, 'small',{page:typeParam, showMessage})}} className="flex items-center w-full py-3 px-2 ">
            <Logout/>
            <p className="text-sm px-3 font-semibold">Logout</p>
            </div>
           </div>}
           </div>
           </div>
           :
           <button 
           onClick={() =>show('', login, 'big',{showMessage:showMessage})} 
           className="rounded text-sm font-semibold  px-8 p-2 bg-hipired text-white">
             Log in
         </button>
         }
      </div>
      </div> 
   </div>
)}

export default Header;