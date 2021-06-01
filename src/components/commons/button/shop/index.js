import { useEffect, useState } from 'react';
import CircularProgress from '../../circular-loader-small';
import { inject } from '../../../../analytics/async-script-loader';
import Error from './error';
import Loader from './loader';
import ComponentStateHandler from '../../component-state-handler';
import useTranslation from '../../../../hooks/use-translation';

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loader />);

export const Shop = ({ videoId, setRetry, status, data }) => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  retry = setRetry;
  const loaded = () => {
    setLoading(false);
  };
  useEffect(() => {
    inject('https://devqa2.charmboard.com/zee5/kaltura_plugin.js', null, loaded);
  }, []);

return (
    <ComponentStateHandler
      state={status}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      {!loading ? (
       data?.canShop && 
        <button
          className="rounded-lg text-white py-1 px-4 bg-hipipink  tracking-wide xxs:text-sm xs:text-base"
          // eslint-disable-next-line no-undef
          onClick={() => cbplugin && cbplugin.cbTouch({ videoId : 'd14a56e9-45ba-43b2-8c48-6b6715ddeaa5' })}
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
    </ComponentStateHandler>

)
}
