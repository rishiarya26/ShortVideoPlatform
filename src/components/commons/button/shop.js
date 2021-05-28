import { useEffect, useState } from 'react';
import useTranslation from '../../../hooks/use-translation';
import CircularProgress from '../circular-loader-small';
import { inject } from '../../../analytics/async-script-loader';

export const Shop = ({ videoId }) => {
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
      {!loading ? (
        <button
          className="rounded-lg text-white py-1 px-4 bg-hipipink  tracking-wide xxs:text-sm xs:text-base"
          // eslint-disable-next-line no-undef
          onClick={() => cbplugin && cbplugin.cbTouch({ videoId })}
        >
          {t('SHOP')}
        </button>
      ) : (
        <button
          className="rounded-lg text-white py-1 pl-4 pr-2 bg-hipipink  tracking-wide xxs:text-sm xs:text-base flex items-center"
        >
          <span>{t('SHOP')}</span>
          {' '}
          <span className="inline-block p-1"><CircularProgress /></span>
        </button>
      )}
    </>
  );
};
