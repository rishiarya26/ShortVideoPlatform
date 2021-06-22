import { useState, useEffect } from 'react';
import { inject } from '../../analytics/async-script-loader';
import { CHARMBOARD_PLUGIN_URL } from '../../constants';
import useTranslation from '../../hooks/use-translation';
import Img from '../commons/image';
import Close from '../commons/svgicons/close-white';
import { Loading } from './loading';

function ProductWidget({
  shopCards, handleSaveLook, videoId, profileFeed
}) {
  const [loading, setLoading] = useState(true);
  const loaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    inject(CHARMBOARD_PLUGIN_URL, null, loaded);
  }, []);

  const { t } = useTranslation();
  const shopCardsLength = shopCards?.length;

  return (
    <div
      className={profileFeed
        ? 'flex w-6/12 h-24 justify-between items-center p-2'
        : 'flex w-full bg-gray-900 bg-opacity-50 h-24 justify-between items-center p-2'}
    >
      <div className="flex flex-col">
        {!profileFeed && (
          <div className="flex text-xs text-white mb-2">
            {t('PRODUCT_CAN_BUY')}
            {' '}
            |
            {' '}
            {shopCardsLength}
            {' '}
            {t('ITEMS')}
          </div>
        )}
        <div className="flex">
          {!loading ? shopCardsLength > 0 && shopCards.map((data, id) => (
            <div
              key={id}
              className="w-14 h-14 mr-4 rounded-lg bg-gray-500 overflow-hidden"
              // eslint-disable-next-line no-undef
              onClick={() => cbplugin && cbplugin.cbTouch({ videoId })}
            >
              <Img data={data} height={120} width={120} />
            </div>
          ))
            : (
              <Loading />
            )}
        </div>
      </div>
      {!profileFeed && (
        <div className="flex p-4">
          <div
            className="flex rounded-full h-10 w-10 bg-hipipink justify-center items-center text-white"
            onClick={handleSaveLook}
          >
            <Close />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductWidget;
