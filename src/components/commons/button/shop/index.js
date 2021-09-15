import { useState, useEffect } from 'react';
import { inject } from '../../../../analytics/async-script-loader';
import { CHARMBOARD_PLUGIN_URL } from '../../../../constants';
import useTranslation from '../../../../hooks/use-translation';

export const Shop = ({
  videoId, canShop
}) => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const loaded = () => {
    setLoading(false);
  };
  useEffect(() => {
    inject(CHARMBOARD_PLUGIN_URL, null, loaded);
    // charmboard_plugin- multiple object(player)
  }, []);

  useEffect(()=>{
    console.log('loading',loading)
    if(loading === false){
     console.log("plugin",cbplugin)
    }
  },[loading])

  const handleShop = ()=>{
    console.log('clicked')
    cbplugin && cbplugin.cbTouch({ videoId })
  }

  return (
    <>
      {!loading && canShop !== 'pending' ? canShop === 'success' && (
        <button
          className="rounded-lg text-white py-1 px-4 bg-hipired  tracking-wide xxs:text-sm xs:text-base uppercase focus:outline-none"
          // eslint-disable-next-line no-undef
          onClick={handleShop}
        >
          {t('SHOP')}
        </button>
      )
        : (
          <button
            className="animate-pulse rounded-lg text-white py-1 px-4 bg-hipired  tracking-wide xxs:text-sm xs:text-base uppercase focus:outline-none"
          >
            {t('SHOP')}
          </button>
        )}
    </>
  );
};
