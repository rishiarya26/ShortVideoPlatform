import { useState, useEffect } from 'react';
import { inject } from '../../analytics/async-script-loader';
import { CHARMBOARD_PLUGIN_URL } from '../../constants';
// import useTranslation from '../../hooks/use-translation';
import Img from '../commons/image';
import { Loading } from './loading';

function ProductCards({
  shopCards, videoId
}) {
  const [loading, setLoading] = useState(true);
  const loaded = () => {
    setLoading(false);
  };
  useEffect(() => {
    inject(CHARMBOARD_PLUGIN_URL, null, loaded);
  }, []);

  // const { t } = useTranslation();
  const shopCardsLength = shopCards?.length;

  return (
    <div
      className="flex w-6/12 h-24 justify-between items-center p-2 absolute bottom-14"
    >
      <div className="flex flex-col">
        <div className="flex">
          {!loading ? shopCardsLength > 0 && shopCards.map((data, id) => (
            <div
              key={id}
              className="w-14 h-14 mr-4 rounded-lg bg-gray-500 overflow-hidden relative"
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
    </div>
  );
}

export default ProductCards;
