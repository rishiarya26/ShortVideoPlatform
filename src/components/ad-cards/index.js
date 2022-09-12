/*eslint-disable react/display-name*/
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Img from '../commons/image';
import fallbackShop from '../../../public/images/shop.png';
import useDrawer from '../../hooks/use-drawer';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { getBrand } from '../../utils/web';

function AdCards({
  adCards, videoId, comp, loading, pageName, tabName, campaignId="NA"
}) {
  const charmboardDrawer = dynamic (
    () => import('../charmboard'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

  useEffect(()=>{console.log("ad-card",adCards, adCards?.[0]?.card_id)},[])
  const {show } = useDrawer();
  // const [loading, setLoading] = useState(true);
  // const loaded = () => {
  //   setLoading(false);
  // };
  useEffect(() => {
  //  adCards?.map { toTrackMixpanel('monetisationProductImp',{pageName:pageName, tabName:tabName},{content_id:videoId,productId:data?.card_id, brandUrl:data?.product_url})}
  }, []);

  // const { t } = useTranslation();
  const adCardsLength = adCards?.length;
  const type = {
    feed: 'bottom-0 flex right-0 justify-between items-center p-2 absolute',
    profile: 'bottom-0 flex right-0 justify-between items-center p-2 absolute',
    embed: 'bottom-4 flex h-24 right-0 justify-between items-center p-2 absolute',
    single: 'bottom-16 flex h-24 right-0 justify-between items-center p-2 fixed',
  };


  return (
    <div
      className={type[comp]}
    >
          {adCardsLength > 0 && adCards.map((data, id) => (
            <div
              key={id}
              className="w-14 h-14 ml-2 rounded-lg bg-gray-500 overflow-hidden relative"
              // eslint-disable-next-line no-undef
              onClick={comp === 'feed' ? 
              ()=>{
                toTrackMixpanel('monetisationProductClick',{pageName:pageName, tabName:tabName},{content_id:videoId,productId:data?.card_id, productUrl:data?.product_url, brandName: getBrand(data?.product_url), campaignId})
                window.open(data?.product_url)} :
              () => {
                toTrackMixpanel('monetisationProductClick',{pageName:pageName, tabName:tabName},{content_id:videoId,productId:data?.card_id, productUrl:data?.product_url, brandName: getBrand(data?.product_url), campaignId})
                show('',charmboardDrawer , 'big', { videoId : videoId, idToScroll: data?.card_id, campaignId})}
            }
            >
              <Img data={data?.img_url} height={120} width={120} fallbakc={fallbackShop?.src}/>
            </div>
          ))
          }
    </div>
  );
}

export default AdCards;
