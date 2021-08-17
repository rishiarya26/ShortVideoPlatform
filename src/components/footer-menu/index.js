import Home from '../commons/svgicons/home';
import Add from '../commons/svgicons/add';
import Search from '../commons/svgicons/search';
import Profile from '../commons/svgicons/profile';
// import useDrawer from '../../hooks/use-drawer';
// import useTranslation from '../../hooks/use-translation';
// import ShoppingWidget from '../shopping-widget';
import SnackBar from '../commons/snackbar';
import { Shop } from '../commons/button/shop';

function FooterMenu( { videoId,canShop} ){
  const vobj = { videoId: 'cbvtest1mq99gi6b' };
  // console.log(props.id);
  // const { show } = useDrawer();
  // const { t } = useTranslation();
  return (
    <div>
      <div className="w-full bg-black fixed bottom-0 py-2 flex justify-around items-center h-12">
        <Home />
        <Search />
        <div className="w-1/5 flex justify-center">
        <Shop
              videoId={videoId}
              canShop={canShop}
            />
            </div>
        <Add />
        <Profile />
      </div>
      <SnackBar />
      <div id="cb_tg_d_wrapper">
        <div className="playkit-player" />
      </div>
    </div>
  );
}

export default FooterMenu;

