/*eslint-disable react/display-name*/
import Home from '../commons/svgicons/home';
import Add from '../commons/svgicons/add';
import Search from '../commons/svgicons/search';
import Profile from '../commons/svgicons/profile';
// import useDrawer from '../../hooks/use-drawer';
// import useTranslation from '../../hooks/use-translation';
// import ShoppingWidget from '../shopping-widget';
import SnackBar from '../commons/snackbar';
import { Shop } from '../commons/button/shop';
import useDrawer from '../../hooks/use-drawer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useAuth from "../../hooks/use-auth"
import SearchBlack from '../commons/svgicons/search-black';
import ProfileActive from '../commons/svgicons/profile-active';
import SearchActive from '../commons/svgicons/search-active';
import HomeActive from '../commons/svgicons/home-active';
import detectDeviceModal from '../open-in-app'
import login from "../auth-options"
import { localStorage } from '../../utils/storage';
import { useEffect } from 'react';

// const login = dynamic(
//   () => import('../auth-options'),
//   {
//     loading: () => <div />,
//     ssr: false
//   }
// );

function FooterMenu( { videoId,canShop, type="noShop", selectedTab,  shopType, shop,
 setClose} ){
  const router = useRouter();
  const { show } = useDrawer();

const info ={
  shop:  <Shop
  videoId={videoId}
  canShop={canShop}
  shopType={shopType && shopType}
  setClose={setClose}
/>,
 noShop: null
}

const toShow = {
  login :  ()=>show('', login, 'medium'),
  profile : ()=>{
   try{ 
     const userId = localStorage.get('user-id');
     router.push(`/@${userId}`)
  }catch(e){
     console.log('error occured while fetching user-id from cookies')
  }
  }
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
              onClick={() => show('', detectDeviceModal, 'extraSmall', {text: "create"})}
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
      
    </div>
  );
}

export default FooterMenu;
 
