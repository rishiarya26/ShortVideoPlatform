/*eslint-disable react/display-name */
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { track } from '../../../../analytics';
import { inject } from '../../../../analytics/async-script-loader';
import { commonEvents } from '../../../../analytics/mixpanel/events';
import { CHARMBOARD_PLUGIN_URL } from '../../../../constants';
import useDrawer from '../../../../hooks/use-drawer';
import useTranslation from '../../../../hooks/use-translation';

export const Shop = ({
  videoId, canShop, shopType, setClose
}) => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const {show} = useDrawer();
  const loaded = () => {
    setLoading(false);
  };

  const charmboardDrawer = dynamic(
    () => import('../../../charmboard'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

  /******* Mixpanel *********/
  const toTrackMixpanel = (type) =>{
    const toTrack ={
      'cta': () => {
        mixpanelEvents['Element'] = 'Shop',
        mixpanelEvents['Button Type'] = 'CTA',
        track('CTAs', mixpanelEvents)
      }
    }

    const mixpanelEvents = commonEvents();
    toTrack?.[type]();
  }
  /***************************/

  useEffect(() => {
   setTimeout(()=>{
    //  alert('shop intiated')
    inject(CHARMBOARD_PLUGIN_URL, null, loaded);
   },1000)
    // charmboard_plugin- multiple object(player)
  }, []);

  useEffect(()=>{
    if(loading === false){
    }
  },[loading])

  const handleShop = ()=>{
    toTrackMixpanel('cta');
    show('',charmboardDrawer , 'big', { videoId : videoId, setClose: setClose});
    setClose && setClose('open');
    // cbplugin && cbplugin.cbTouch({ videoId })
  }

  return (
    <>
      {!loading && canShop !== 'pending' ? canShop === 'success' && (
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
