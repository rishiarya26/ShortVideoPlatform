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
import Tabs from '../commons/tabs/desk-feed-tab'

const login = dynamic(
  () => import('../auth-options'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const DeskMenu = ({handleUpClick, handleDownClick}) =>{
    const {show} = useDrawer();
    const {showSnackbar} = useSnackbar();
    const {t} = useTranslation();
    const router = useRouter();

      const showMessage = ({message})=>{
        showSnackbar({message: message});
      }

      const tabs = [
        { display: `${t('FORYOU')}`, path: `${t('FOR-YOU')}`,
         icon: {active: <Following/>,inActive: <Home/>} },
        { display: `${t('FOLLOWING')}`, path: `${t('SFOLLOWING')}`,
         icon:{active: <Home/>, inActive: <Following/>} }
       ];

        const loginComp = <button 
        onClick={() =>show('', login, 'big',{showMessage:showMessage})} 
        className="font-semibold border text-lg p-2 mt-4">
          Log in
        </button>

       const isLoggedIn = useAuth(loginComp,'');

    return(
        <div className="w-feed-menu flex flex-col p-4 relative">
          <div className="flex flex-col fixed overscroll-y-auto pt-6 w-feed-menu">
        <div className="flex flex-col pb-10 border-b border-gray-200">
          <Tabs items={tabs}/>
        {/* <div onClick={router.push('/feed/for-you')} className='flex items-center'> <Home/> <p className="font-semibold text-lg py-2 pl-4">For You </p></div>
        <div onClick={router.push('/feed/following')} className='flex items-center'><Following/><p className="font-semibold text-lg py-2 pl-3">Following </p></div> */}
        </div>
        <div className="flex flex-col pb-6 pt- 4border-b border-gray-200">
              <p className="font-semibold text-sm text-gray-600 p-2">Log in to follow creators, like videos, and view comments.</p>
              {isLoggedIn}
        </div>
        </div>
     </div>
    )
}

export default DeskMenu;