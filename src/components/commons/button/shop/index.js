import { useEffect, useState } from 'react';
import { inject } from '../../../../analytics/async-script-loader';
import useTranslation from '../../../../hooks/use-translation';

export const Shop = ({
  videoId, status, data
}) => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const loaded = () => {
    setLoading(false);
  };
  useEffect(() => {
    inject('https://devqa2.charmboard.com/zee5/kaltura_plugin.js', null, loaded);
  }, []);

  return (
    <>
      {!loading && status === 'success' ? (
        data?.canShop
        && (
          <button
            className="rounded-lg text-white py-1 px-4 bg-hipipink  tracking-wide xxs:text-sm xs:text-base"
            // eslint-disable-next-line no-undef
            onClick={() => cbplugin && cbplugin.cbTouch({ videoId })}
          >
            {t('SHOP')}
          </button>
        )
      ) : (
        <button
          className="animate-pulse rounded-lg text-white py-1 px-4 bg-hipipink  tracking-wide xxs:text-sm xs:text-base"
        >
          {t('SHOP')}
        </button>
      )}
    </>

  );
};
