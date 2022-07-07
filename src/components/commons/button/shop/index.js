/*eslint-disable react/display-name */
import dynamic from 'next/dynamic';
import { toTrackMixpanel } from '../../../../analytics/mixpanel/events';
import useDrawer from '../../../../hooks/use-drawer';
import useTranslation from '../../../../hooks/use-translation';

export const Shop = ({
  videoId, canShop, shopType, setClose,pageName, tabName
}) => {
  const { t } = useTranslation();
  const {show} = useDrawer();

  const charmboardDrawer = dynamic(
    () => import('../../../charmboard'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

  const handleShop = ()=>{
    toTrackMixpanel('cta',{pageName:pageName, tabName:tabName, name:'Shop',type:'Button'},{content_id:videoId});
    show('',charmboardDrawer , 'big', { videoId : videoId, setClose: setClose, pageName:pageName, tabName:tabName});
    setClose && setClose('open');
  }

  return (
    <>
      {canShop !== 'pending' ? canShop === 'success' && (
        <button
          className="rounded cursor-pointer text-white py-1 px-4 font-semibold bg-hipired  tracking-wide xxs:text-sm xs:text-base uppercase focus:outline-none"
          // eslint-disable-next-line no-undef
          onClick={handleShop}
        >
           {shopType && shopType === 'recipe' ? 'MAKE' :  t('SHOP')}
        </button>
      )
        : (
          <button
            className="animate-pulse rounded text-white py-1 px-4 bg-hipired  tracking-wide xxs:text-sm xs:text-base uppercase focus:outline-none"
          >
            {shopType && shopType === 'recipe' ? 'MAKE' :  t('SHOP')}
          </button>
        )}
    </>
  );
};
