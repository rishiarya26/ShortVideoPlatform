/*eslint-disable react/display-name */
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import useTranslation from "../../hooks/use-translation";
import Following from "../commons/svgicons/following";
import Home from '../commons/svgicons/home';
import Tabs from '../commons/tabs/desk-feed-tab';
import HomeRed from "../commons/svgicons/home-red";
import FollowingRed from "../commons/svgicons/following-red";
import { localStorage } from "../../utils/storage";

const login = dynamic(
  () => import('../auth-options'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const DeskMenu = ({handleUpClick, handleDownClick, width='w-full'}) =>{
    const {show} = useDrawer();
    const {showSnackbar} = useSnackbar();
    const {t} = useTranslation();
    const router = useRouter();
  
      const showMessage = ({message})=>{
        showSnackbar({message: message});
      }

      const tabs = [
        { display: `${t('FORYOU')}`, path: `${t('FOR-YOU')}`,
         icon: {active: <HomeRed/>,inActive: <Home/>} },
        { display: `${t('FOLLOWING')}`, path: `${t('SFOLLOWING')}`,
         icon:{active: <FollowingRed/> , inActive: <Following/>} }
       ];

        const loginComp = 
        <>
        <p className="text-sm font-small text-gray-400 p-2 mt-2 font-sans">
           Log in to follow creators, like videos, and view comments.
        </p>
        <button 
          onClick={() =>show('', login, 'big',{showMessage:showMessage})} 
          className="font-semibold border border-hipired rounded text-hipired text-base p-2 mt-4 ">
          Log in
        </button>
        </>

const tokens = localStorage?.get('tokens') || null;

let isLoggedIn = useAuth(loginComp,'');

useEffect(()=>{
  if(tokens){
     isLoggedIn = ''
  }
},[tokens]);

    return(
        <div className={`${width} flex fixed flex-col p-4 pt-0 relative`}>
         
        <div className="flex flex-col pb-4 border-b border-gray-200">
          <Tabs items={tabs}/>
        {/* <div onClick={router.push('/feed/for-you')} className='flex items-center'> <Home/> <p className="font-semibold text-lg py-2 pl-4">For You </p></div>
        <div onClick={router.push('/feed/following')} className='flex items-center'><Following/><p className="font-semibold text-lg py-2 pl-3">Following </p></div> */}
        </div>
        <div className="flex flex-col pb-6 pt- 4border-b border-gray-200">
              {isLoggedIn}
        </div>
        
     </div>
    )
}

export default DeskMenu;