import Home from '../commons/svgicons/home';
import Add from '../commons/svgicons/add';
import Search from '../commons/svgicons/search';
import Profile from '../commons/svgicons/profile';
import useDrawer from '../../hooks/use-drawer';
import useTranslation from '../../hooks/use-translation';
import ShoppingWidget from '../shopping-widget';
import SnackBar from '../commons/snackbar';

function FooterMenu() {
  const { show } = useDrawer();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full fixed bottom-0">
      <div id="progress-bar" className="w-1/4 h-1 bg-hipipink" />
      <div className="w-full bg-black  py-2 flex justify-around items-center">
        <Home />
        <Search />
        <button
          className="rounded-full flex bg-hipipink tracking-wide bg-opacity-50 cursor-pointer relative
        outline-none group"
          onClick={() => show('', ShoppingWidget)}
        >
          <span className={`transform-gpu -translate-y-1
          rounded-full text-white py-1 px-4 bg-hipipink 
          font-medium tracking-wide xxs:text-sm xs:text-base
          group-active:translate-y-0`}
          >
            {t('shop')}
          </span>
        </button>

        <Add />
        <Profile />
        <SnackBar />
      </div>
    </div>
  );
}

export default FooterMenu;
