import Home from '../commons/svgicons/home';
import Add from '../commons/svgicons/add';
import Search from '../commons/svgicons/search';
import Profile from '../commons/svgicons/profile';
// import useDrawer from '../../hooks/use-drawer';
import useTranslation from '../../hooks/use-translation';
// import ShoppingWidget from '../shopping-widget';
import SnackBar from '../commons/snackbar';

function FooterMenu(props) {
  const vobj = { videoId: 'cbvtest1mq99gi6b' };
  // console.log(props.id);
  // const { show } = useDrawer();
  const { t } = useTranslation();
  return (
    <div>
      <div className="w-full bg-black fixed bottom-0 py-2 flex justify-around items-center">
        <Home />
        <Search />
        <button
          className="rounded-full text-white py-0.5 px-4 bg-hipipink font-medium tracking-wide xxs:text-sm xs:text-base"
          onClick={() => cbplugin && cbplugin.cbTouch(vobj)}
        >
          <span className={`transform-gpu -translate-y-1
          rounded-full text-white py-1 px-4 bg-hipipink 
          font-medium tracking-wide xxs:text-sm xs:text-base
          group-active:translate-y-0`}
          >
          SHOP  {/* {t('shop')} */}
          </span>
        </button>
        <div id="cb_tg_d_wrapper">
          <div className="playkit-player" />
        </div>
        <Add />
        <Profile />
      </div>
      <SnackBar />
    </div>
  );
}

export default FooterMenu;

