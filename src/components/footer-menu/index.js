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

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const login = dynamic(
  () => import('../auth-options'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function FooterMenu( { videoId,canShop, type="noShop", selectedTab} ){
  const router = useRouter();
  // const [liked, setLiked] = useState(false);
  const { show } = useDrawer();
console.log("this is the thing",videoId);
const info ={
  shop:  <Shop
  videoId={videoId}
  canShop={canShop}
/>,
 noShop: null
}

  const showLoginOptions = () => {
    show('', login, 'medium');
  };

  const toProfile = () => router.push({pathname: '/profile'});

  const selected = useAuth(showLoginOptions, toProfile);

  const toShow = () => {
    selected();
  };

  // const vobj = { videoId: 'cbvtest1mq99gi6b' };
  // console.log(props.id);
  // const { show } = useDrawer();
  // const { t } = useTranslation();
  return (
    <div>
      <div className="w-full bg-black fixed bottom-0 py-2 flex justify-around items-center h-16">
      <div onClick = {()=>router.push("/feed/for-you")} className="flex flex-col text-white text-xs items-center">
       {selectedTab === 'home' ? <><HomeActive/><p className="text-white text-xs mt-1.5">Home</p></>  : <><Home/><p className="text-gray-400 text-xs mt-1.5">Home</p></> } 
       
     </div> 
     <div onClick = {()=>router.push("/explore")} className="flex flex-col text-white text-xs items-center">
       {selectedTab === 'search' ? <><SearchActive/><p className="text-white text-xs mt-1.5">Explore</p></>  :<> <Search/><p className="text-gray-400 text-xs mt-1.5">Explore</p></> } 
       
     </div>
        <div>
          {info[type]}
        </div>
            <div
              onClick={() => show('', detectDeviceModal, 'extraSmall')}
              className="relative py-3  px-1 text-center flex flex-col text-white text-xs  items-center"
             >
                <Add />
                <p className="text-gray-400 text-xs mt-1.5">Create</p>
             </div>    
      <div onClick={()=>toShow()} className="flex flex-col  items-center justify-between">
      {selectedTab === 'profile' ?<> <ProfileActive/> <p className="text-white text-xs mt-1.5">Profile</p></> :<> <Profile/><p className="text-gray-400 text-xs mt-1.5">Profile</p></>} 
      
      </div>
      </div>
      <SnackBar />
      
    </div>
  );
}

export default FooterMenu;

