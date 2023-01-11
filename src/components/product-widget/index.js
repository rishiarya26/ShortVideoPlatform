/*eslint-disable react/display-name */
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { inject } from '../../analytics/async-script-loader';
import useTranslation from '../../hooks/use-translation';
import Img from '../commons/image';
import Close from '../commons/svgicons/close-white';
import { Loading } from './loading';
// import fallbackShop from '../../../public/images/shop.png'
import useDrawer from '../../hooks/use-drawer';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { toTrackClevertap } from '../../analytics/clevertap/events';

function ProductWidget({
  shopCards, handleSaveLook, videoId, loading, shopType, setClose, pageName, tabName, campaignId='NA'
}) {

  const { t } = useTranslation();
  const shopCardsLength = shopCards?.length;

  const charmboardDrawer = dynamic (
    () => import('../charmboard'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

  useEffect(()=>{
    // toTrackMixpanel('shoppingPopUp',{pageName:pageName, tabName:tabName && tabName|| null},{content_id:videoId})
  },[])

  const {show } = useDrawer();

  return (
    <div className={`flex w-full bg-gray-900 bg-opacity-50 h-24 justify-between items-center p-2 absolute bottom-24 mb-3`}>
      <div className="flex flex-col">
        <div className="flex text-xs text-white mb-2">
          {shopType === 'recipe' ? 'Ingredients from this recipe' : t('PRODUCT_CAN_BUY')}
        </div>
        <div className="flex">
          {shopCardsLength > 0 ? shopCards.map((data, id) => (
            <div
              key={id}
              className="w-16 h-16 mr-4 rounded-lg bg-gray-500 overflow-hidden relative"
              // eslint-disable-next-line no-undef
              onClick={() => {
                toTrackMixpanel('shoppablePopupClicked',{pageName:pageName, tabName:tabName && tabName || ''},{productId:id || null}) 
                toTrackClevertap('shoppablePopupClicked',{pageName:pageName, tabName:tabName && tabName || ''},{productId:id || null}) 
                show('',charmboardDrawer , 'big', { videoId : videoId, setClose : setClose, campaignId})
                setClose('open');             
              }}
            >
              <Img data={data} height={120} width={120} fallback={"/images/shop.png"}/>
            </div>
          ))
            : (
              <Loading />
            )}
        </div>
      </div>
      <div className="flex p-4">
        <div
          className="flex rounded-full h-12 w-12 bg-red-600 justify-center items-center text-white"
          onClick={()=>handleSaveLook(true)}
        >
          <Close />
        </div>
      </div>
    </div>
  );
}

export default ProductWidget;
