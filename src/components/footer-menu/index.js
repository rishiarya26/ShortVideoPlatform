/*eslint-disable react/display-name*/
import dynamic from 'next/dynamic';
import SnackBar from '../commons/snackbar';
import { Shop } from '../commons/button/shop';
import useDrawer from '../../hooks/use-drawer';
import { useRouter } from 'next/router'; 
import useAuth from "../../hooks/use-auth"
import login from "../auth-options"
import { localStorage } from '../../utils/storage';
import { useState } from 'react';

const Home = dynamic(() => import('../commons/svgicons/home'),{
  loading: () => <div />,
  ssr: false
});
const Add = dynamic(() => import('../commons/svgicons/add'),{
  loading: () => <div />,
  ssr: false
});
const Search = dynamic(() => import('../commons/svgicons/search'),{
  loading: () => <div />,
  ssr: false
});
const Profile = dynamic(() => import('../commons/svgicons/profile'),{
  loading: () => <div />,
  ssr: false
});
const ProfileActive = dynamic(() => import('../commons/svgicons/profile-active'),{
  loading: () => <div />,
  ssr: false
});
const SearchActive = dynamic(() => import('../commons/svgicons/search-active'),{
    loading: () => <div />,
    ssr: false
});
const HomeActive = dynamic(() => import('../commons/svgicons/home-active'),{
    loading: () => <div />,
    ssr: false
});
const AppBanner = dynamic(() => import('../app-banner'),{
  loading: () => <div />,
  ssr: false
});


function FooterMenu( { videoId,canShop, type="noShop", selectedTab,  shopType,
 setClose,pageName, tabName=null} ){
  const router = useRouter();
  const { show } = useDrawer();

const info ={
  shop:  <Shop
  videoId={videoId}
  canShop={canShop}
  shopType={shopType && shopType}
  setClose={setClose}
  pageName={pageName}
  tabName={tabName}
/>,
 noShop: null
}

const toShow = {
  login :  ()=>show('', login, 'medium',{pageName:pageName, tabName:tabName&& tabName || ''}),
  profile : ()=>{
   try{ 
     const userId = localStorage.get('user-id');
     router.push(`/@${userId}`)
  }catch(e){
     console.log('error occured while fetching user-id from cookies')
  }
  }
}

const [showAppBanner, setShowAppBanner]=useState(false);
const showBanner=()=>{
  setShowAppBanner(true);
}
const notNowClick=()=>{
  setShowAppBanner(false);
}

const chooseProfile = useAuth(toShow.login, toShow.profile);

  return (
    <div>
      <div className="w-full bg-black fixed bottom-0 left-0 py-2 flex justify-around items-center h-16 relative">
      <div onClick={()=> router?.push({pathname: '/feed/[pid]',query: { pid: 'for-you' }})} className="flex flex-col text-white text-xs items-center">
       {selectedTab === 'home' ? <><HomeActive/><p className="text-white text-xxs mt-1.5 select-none">Home</p></>  : <><Home/><p className="text-gray-400 text-xxs mt-1.5 select-none">Home</p></> } 
       
     </div> 
     <div  onClick={()=>router?.push('/explore')} className="flex flex-col text-white text-xs items-center">
       {selectedTab === 'search' ? <><SearchActive/><p className="text-white text-xxs mt-1.5 select-none">Explore</p></>  :<> <Search/><p className="text-gray-400 text-xxs mt-1.5 select-none">Explore</p></> } 
       
     </div>
        <div>
          {info[type]}
        </div> 
            <div
              onClick={() => showBanner && showBanner()}
              className="relative py-3  px-1 text-center flex flex-col text-white text-xs  items-center"
             >
                <Add />
                <p className="text-gray-400 text-xxs mt-1.5 select-none">Create</p>
             </div>    
      <div  onClick={chooseProfile} className="flex flex-col  items-center justify-between">
      {selectedTab === 'profile' ?<> <ProfileActive/> <p className="text-white text-xxs mt-1.5 select-none">Profile</p></> :<> <Profile/><p className="text-gray-400 text-xxs mt-1.5 select-none">Profile</p></>} 
      
      </div>
      </div>
      <SnackBar />
      {showAppBanner ? <AppBanner notNowClick={notNowClick}/>:''}
    </div>
  );
}

export default FooterMenu;
 
