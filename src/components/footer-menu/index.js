import Link from 'next/link';
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

const detectDeviceModal = dynamic(
  () => import('../download-app-widget'),
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

function FooterMenu( { videoId,canShop} ){
  const router = useRouter();
  // const [liked, setLiked] = useState(false);
  const { show } = useDrawer();

  const showLoginOptions = () => {
    show('', login, 'medium');
  };

  const toSearch = () => router.push({pathname: '/explore'});

  const selected = useAuth(showLoginOptions, toSearch);

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
        <Home />
     </div> 
     <div onClick = {()=>router.push("/explore")}>
        <Search />
     </div>
        <div>
          <Shop
                videoId={videoId}
                canShop={canShop}
          />
        </div>
            <div
              onClick={() => show('', detectDeviceModal, 'small')}
              className="relative py-3  px-1 text-center flex flex-col items-center"
             >
                <Add />
             </div>    
      <div onClick={()=>toShow()}>
        <Profile />
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

