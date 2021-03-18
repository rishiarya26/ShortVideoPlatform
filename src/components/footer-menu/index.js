import Home from '../commons/svgicons/home';
import Add from '../commons/svgicons/add';
import Search from '../commons/svgicons/search';
import Profile from '../commons/svgicons/profile';
import useDrawer from '../../hooks/use-drawer';
import useTranslation from '../../hooks/use-translation';

function FooterMenu() {
  const { show } = useDrawer();
  const { t } = useTranslation();
  return (
    <div className="w-full bg-black fixed bottom-0 py-2 flex justify-around items-center">
      <Home />
      <Search />
      <button
        className="rounded-full text-white py-0.5 px-4 bg-hipipink font-medium tracking-wide"
        onClick={() => show()}
      >
        {t('shop')}
      </button>
      <Add />
      <Profile />
    </div>
  );
}

export default FooterMenu;
