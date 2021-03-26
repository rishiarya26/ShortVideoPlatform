import Home from '../commons/svgicons/home';
import Add from '../commons/svgicons/add';
import Search from '../commons/svgicons/search';
import Profile from '../commons/svgicons/profile';
import useDrawer from '../../hooks/use-drawer';
import useTranslation from '../../hooks/use-translation';
// import ShoppingWidget from '../shopping-widget';

function FooterMenu() {

  const vobj = {'videoId' : 'cfcb3a92-50bb-4b37-a51d-b142ef3cc3be' };
  // const { show } = useDrawer();
  const { t } = useTranslation();
  return (
    <div className="w-full bg-black fixed bottom-0 py-2 flex justify-around items-center">
      <Home />
      <Search />
      <button
<<<<<<< HEAD
        className="rounded-full text-white py-0.5 px-4 bg-hipipink font-medium tracking-wide xxs:text-sm xs:text-base" onClick={() => cbplugin && cbplugin.cbTouch(vobj)}
=======
        className="rounded-full text-white py-1 px-4 bg-hipipink font-medium tracking-wide xxs:text-sm xs:text-base"
        onClick={() => show('', ShoppingWidget)}
>>>>>>> 94d1df9db19bc25c451e22fbc7123ec3eaff9179
      >
        {t('shop')}
      </button>
      <div id="cb_tg_d_wrapper">
        <div className="playkit-player">
            
        </div>
      </div>
      <Add />
      <Profile />
    </div>
  );
}

export default FooterMenu;


