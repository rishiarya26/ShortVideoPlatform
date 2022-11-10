/*eslint-disable react/display-name*/
import { useState } from 'react';
import dynamic from 'next/dynamic';
import SnackBar from '../commons/snackbar';
import { Shop } from '../commons/button/shop';
import useDrawer from '../../hooks/use-drawer';
import { useRouter } from 'next/router'; 
import useAuth from '../../hooks/use-auth'
import login from '../auth-options'
import { localStorage } from '../../utils/storage';
import Home from '../commons/svgicons/home';
import Add from '../commons/svgicons/add';
import Search from '../commons/svgicons/search';
import Profile from '../commons/svgicons/profile';
import ProfileActive from '../commons/svgicons/profile-active';
import SearchActive from '../commons/svgicons/search-active';
import HomeActive from '../commons/svgicons/home-active'
import { getItem } from '../../utils/cookie';
import detectDeviceModal from '../open-in-app';
import { trimAtTheRate } from '../../utils/string';

const AppBanner = dynamic(
  () => import('../app-banner'),
  {
    loading: () => <div />,
    ssr: false
  }
);

// const detectDeviceModal = dynamic(
//   () => import('../open-in-app'),
//   {
//     loading: () => <div />,
//     ssr: false
//   }
// );

function FooterMenu( { videoId,canShop, type="noShop", selectedTab,  shopType, shop,
 setClose,pageName, tabName=null, campaignId="NA"} ){
  const router = useRouter();
  const { show } = useDrawer();
  const device = getItem('device-info')

const info ={
  shop:  <Shop
  videoId={videoId}
  canShop={canShop}
  shopType={shopType && shopType}
  setClose={setClose}
  pageName={pageName}
  tabName={tabName}
  campaignId={campaignId}
/>,
 noShop: null
}

const toShow = {
  login :  ()=>show('', login, 'medium',{pageName:pageName, tabName:tabName&& tabName || ''}),
  profile : ()=>{
   try{ 
     const userId = localStorage.get('user-id');
     const userHandle = trimAtTheRate(localStorage.get('user-details')?.userHandle);
     const user = userHandle || userId;
     window.location.href=`/@${user}`
    //  router && router && router.push(`/${userId}`)
  }catch(e){
     console.error('error occured while fetching user-id from cookies')
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
      <div className="w-full bg-black fixed bottom-0 left-0 py-2 flex justify-around items-center h-16">
      <div onClick={()=>  router && router?.push({pathname: '/feed/[pid]',query: { pid: 'for-you' }})} className="flex flex-col text-white text-xs items-center">
       {selectedTab === 'home' ? <><HomeActive/><p className="text-white text-xxs mt-1.5 select-none">Home</p></>  : <><Home/><p className="text-gray-400 text-xxs mt-1.5 select-none">Home</p></> } 
       
     </div> 
     <div  onClick={()=> router && router?.push('/explore')} className="flex flex-col text-white text-xs items-center">
       {selectedTab === 'search' ? <><SearchActive/><p className="text-white text-xxs mt-1.5 select-none">Explore</p></>  :<> <Search/><p className="text-gray-400 text-xxs mt-1.5 select-none">Explore</p></> } 
       
     </div>
        <div>
          {info[type]}
        </div> 
            <div
              onClick={() =>{
                console.log(device);
                device === 'ios' && show('', detectDeviceModal, 'extraSmall', {text: "create"});
                device === 'android' && showBanner && showBanner()}}
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
 
