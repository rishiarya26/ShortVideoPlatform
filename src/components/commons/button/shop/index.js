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
  return (
    <>
      {!loading && canShop !== 'pending' ? canShop === 'success' && (
        <button
          className="rounded-lg text-white py-1 px-4 bg-hipipink  tracking-wide xxs:text-sm xs:text-base"
          // eslint-disable-next-line no-undef
          onClick={() => cbplugin && cbplugin.cbTouch({ videoId })}
        >
          {t('SHOP')}
        </button>
      )
        : (
          <button
            className="animate-pulse rounded-lg text-white py-1 px-4 bg-hipipink  tracking-wide xxs:text-sm xs:text-base"
          >
            {t('SHOP')}
          </button>
        )}
    </>
  );
};
