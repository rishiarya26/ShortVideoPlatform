/*eslint-disable react/display-name*/
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { inject } from '../../analytics/async-script-loader';
import { CHARMBOARD_PLUGIN_URL } from '../../constants';
// import useTranslation from '../../hooks/use-translation';
import Img from '../commons/image';
import { Loading } from './loading';
import fallbackShop from '../../../public/images/shop.png';
import useDrawer from '../../hooks/use-drawer';

function ProductCards({
  shopCards, videoId, comp, loading,pageName,tabName
}) {
  const charmboardDrawer = dynamic (
    () => import('../charmboard'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

  const {show } = useDrawer();
  // const [loading, setLoading] = useState(true);
  // const loaded = () => {
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   inject(CHARMBOARD_PLUGIN_URL, null, loaded);
  // }, []);

  // const { t } = useTranslation();
  const shopCardsLength = shopCards?.length;
  const type = {
    profile: 'bottom-12 flex w-6/12 h-24 justify-between items-center p-2 absolute',
    embed: 'bottom-4 flex w-6/12 h-24 justify-between items-center p-2 absolute',
    single: 'bottom-16 flex w-6/12 h-24 justify-between items-center p-2 fixed',

  };
  return (
    <div
      className={type[comp]}
    >
      <div className="flex flex-col">
        <div className="flex">
          {shopCardsLength > 0 && shopCards.map((data, id) => (
            <div
              key={id}
              className="w-14 h-14 mr-4 rounded-lg bg-gray-500 overflow-hidden relative"
              // eslint-disable-next-line no-undef
              onClick={() =>   {
                toTrackMixpanel('shoppablePopupClicked',{pageName:pageName, tabName:tabName},{productId:id || null}) 
                show('',charmboardDrawer , 'big', { videoId : videoId})}}
            >
              <Img data={data} height={120} width={120} fallbakc={fallbackShop?.src}/>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
}

export default ProductCards;
