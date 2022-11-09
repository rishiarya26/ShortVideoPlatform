/*eslint-disable react/display-name */
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import DeskPopularUsersList from "../desk-popular-users";
import Fb from "../commons/svgicons/facebook-gray";
import Instagram from "../commons/svgicons/instagram-gray";
import TwitterW from "../commons/svgicons/twitter-white";
import Youtube from "../commons/svgicons/youtube-gray";
import TwitterG from "../commons/svgicons/twitter-gray";
import Wiki from "../commons/svgicons/wikipedia";

const login = dynamic(
  () => import('../auth-options'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const links={
  facebook : 'https://www.facebook.com/HiPiOfficialApp',
  twitter : 'https://twitter.com/HiPiOfficialApp',
  instagram : 'https://www.instagram.com/hipiofficialapp/?hl=en',
  youtube : 'https://www.youtube.com/channel/UCXEcEOyCcXzEU4UCLtBL6SQ',
  wiki : 'https://en.wikipedia.org/wiki/HiPi_(App)'
}

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
        <div className="flex flex-col pb-6 pt- 4 sm-menu border-b border-gray-200">
        <p className="text-sm font-small text-gray-400 p-2 mt-2 font-sans">
           Log in to follow creators, like videos, and view comments.
        </p>
        <button 
          onClick={() =>show('', login, 'big',{showMessage:showMessage})} 
          className="font-semibold border border-hipired rounded text-hipired text-base p-2 mt-4 ">
          Log in
        </button>
        </div>

const tokens = localStorage?.get('tokens') || null;

let isLoggedIn = useAuth(loginComp,'');

useEffect(()=>{
  if(tokens){
     isLoggedIn = ''
  }
},[tokens]);

    return(
        <div className={`${width} flex fixed max-h-100v menu_bar overflow-y-scroll bg-white flex-col p-4 pt-24 z-1`}>
          
        <div className="flex flex-col pb-4 border-b border-gray-200">
          <Tabs items={tabs}/>
        {/* <div onClick={router && router.push('/feed/for-you')} className='flex items-center'> <Home/> <p className="font-semibold text-lg py-2 pl-4">For You </p></div>
        <div onClick={router && router.push('/feed/following')} className='flex items-center'><Following/><p className="font-semibold text-lg py-2 pl-3">Following </p></div> */}
        </div>
              {isLoggedIn}
        <div className="pb-2 border-b border-gray-200 ">
          <DeskPopularUsersList />
        </div>
        <div className="flex text-xs text-gray-400 pt-4 pr-8 flex-wrap static_links sm-menu"> 
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=> router && router?.push('/about')}>About</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=> router && router?.push('/newsroom')}>Newsroom</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=> router && router?.push('/theedit')}>The Edit</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=> router && router?.push('/ads')}>Ads</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=> router && router?.push('/terms-conditions.html')}>Terms of Use</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=> router && router?.push('/community-guidelines.html')} >Community Guidelines</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=> router && router?.push('/privacy-policy.html')}>Privacy Policy</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=>router && router.push('/brand-assets')}>Brand Assets</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=>router && router.push('/grievance')}>Grievance</div>
          <div className="mr-2 cursor-pointer mb-2 hover:border-b" onClick={()=>router && router.push('/contact-us')}>Contact Us</div>
        </div>
        <div className="flex py-4 flex-wrap items-center sm-menu">
              <a target="_blank" href={links.facebook}  className="pr-4" rel="noreferrer">
                <Fb/>
              </a>
              <a target="_blank" href={links.instagram} className="pr-4" rel="noreferrer">
                <Instagram/>
              </a>
              <a target="_blank" href={links.twitter} className="pr-4" rel="noreferrer">
                <TwitterG/>
            </a>
              <a target="_blank" href={links.youtube} className="pr-4" rel="noreferrer">
                <Youtube/>
              </a>
              <a target="_blank" href={links.wiki} className="pr-4" rel="noreferrer">
              <Wiki/>
              </a>
        </div>
        {/* <div className="flex text-xs text-gray-400 pt-2">© 2022 TikTok</div> */}
        
     </div>
    )
}

export default DeskMenu;