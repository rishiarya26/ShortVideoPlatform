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
      <div className="w-full bg-black fixed bottom-0 py-2 flex justify-around items-center h-12">
      <div onClick = {()=>router.push("/feed/for-you")}>
       {selectedTab === 'home' ? <HomeActive/> : <Home/>} 
     </div> 
     <div onClick = {()=>router.push("/explore")}>
       {selectedTab === 'search' ? <SearchActive/> : <Search/>} 
     </div>
        <div>
          {info[type]}
        </div>
            <div
              onClick={() => show('', detectDeviceModal, 'extraSmall')}
              className="relative py-3  px-1 text-center flex flex-col items-center"
             >
                <Add />
             </div>    
      <div onClick={()=>toShow()}>
      {selectedTab === 'profile' ? <ProfileActive/> : <Profile/>} 
      </div>
      </div>
      <SnackBar />
      <div id="cb_tg_d_wrapper">
        <div className="playkit-player" />
      </div>
    </div>
  );
}

export default FooterMenu;

