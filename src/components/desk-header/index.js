/*eslint-disable @next/next/no-img-element */
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
import fallbackUser from '../../../public/images/users.png' 

const Header = ()=>{
   const [userInfo, setUserInfo] = useState({});
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


//     const UserInfo = async()=> {
//        const isLogIn = useAuth('false','true');
//      if(isLogIn === 'true'){  
//         const userId = localStorage.get('user-id')
//        let data = {}
//        try{
//          data = await getUserProfile(userId);
//          console.log("user-data***",data)
//        }catch(e){
//           console.log('errorrrrt',e);
//        }
//       }
//        return (
//           <>
// {isLogIn === 'true' && <img src={data?.profilePic}/>
// }        </>
//        )
//     }    

    const isLoggedIn = useAuth('false','true' );

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


    console.log('isLoggedIn',isLoggedIn)

 
   return(
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
           {isLoggedIn === 'true'?
           <div className='w-10'><Img data={userInfo?.profilePic} fallback={fallbackUser?.src}/></div>
           :
           <button 
           onClick={() =>show('', login, 'big',{showMessage:showMessage})} 
           className="font-semibold border text-lg p-2 mt-4">
             Log in
         </button>
         }
      </div>
      </div> 
   </div>
)}

export default Header;