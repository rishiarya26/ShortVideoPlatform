/*eslint-disable react/display-name*/
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Img from '../commons/image';
import fallbackShop from '../../../public/images/shop.png';
import useDrawer from '../../hooks/use-drawer';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import Carousel from '../commons/carousel';
import { getBrand } from '../../utils/web';
import { appsflyerPixelClick, appsflyerPixelImp } from '../../sources/appsflyer-pixel';

const charmboardDrawer = dynamic (
  () => import('../charmboard'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function LabelHolder({label}){
  return <><div className='bg-hipired px-1 py-0.5 w-16 h-3 opacity-60 absolute bottom-0 left-0'></div>
  <div className='text-10 px-1 py-0.5 w-16 flex justify-center absolute bottom-0 left-0 uppercase'>{label}</div>
  </>
}
let allAdCards = [];
const CardElement = ({data, pageName, tabName, videoId, comp, campaignId, show,appsflyerId}) => {
  return(
    <div className="relative flex flex-col">
      <div
      onClick={
        ()=> {
          if (comp === "feed") {
            toTrackMixpanel(
              "monetisationProductClick",
              { pageName: pageName, tabName: tabName },
              {
                content_id: videoId,
                productId: data?.card_id,
                productUrl: data?.product_url,
                brandName: getBrand(data?.product_url),
                campaignId,
                category: data?.category,
                subCategory: data?.sub_category,
                subSubCategory: data?.subsub_category,
                mainCategory: data?.main_category,
                appsflyerId : data?.appsflyer_id
              }
            );
            const usedAppsflyerLink = window.sessionStorage.getItem('used-impression-link') || null;
            const appsflyerLink = data?.appsflyer_id ? appsflyerPixelClick({appId:data?.appsflyer_id, iosAppId: data?.appsflyer_ios_id, advertiser:getBrand(data?.product_url),uri:data?.product_url,comp:'Feed',productId:data?.card_id}) : null;
            console.log("finalLink",appsflyerLink)
            usedAppsflyerLink !== 'true' && appsflyerLink && allAdCards?.length > 0 && allAdCards?.map((item)=>{
              appsflyerPixelImp({ advertiser:getBrand(item?.product_url), appId:item?.appsflyer_id, productId:item?.card_id,comp:'Feed'})
              toTrackMixpanel("appsflyerImpPixel",
              { pageName: pageName, tabName: tabName },
              {
                content_id: videoId,
                productId: item?.card_id,
                productUrl: item?.product_url,
                brandName: getBrand(item?.product_url),
                campaignId,
                category: item?.category,
                subCategory: item?.sub_category,
                subSubCategory: item?.subsub_category,
                mainCategory: item?.main_category,
                appsflyerId : item?.appsflyer_id
              }
              )
              window.sessionStorage.setItem('used-impression-link',true);
            }) 
            window.open(appsflyerLink || data?.product_url);
        } else {
            toTrackMixpanel(
              "monetisationProductClick",
              { pageName: pageName, tabName: tabName },
              {
                content_id: videoId,
                productId: data?.card_id,
                productUrl: data?.product_url,
                brandName: getBrand(data?.product_url),
                campaignId,
                category: data?.category,
                subCategory: data?.sub_category,
                subSubCategory: data?.subsub_category,
                mainCategory: data?.main_category,
                appsflyerId : data?.appsflyer_id
              }
            );
            show('',charmboardDrawer , 'big', { videoId : videoId, idToScroll: data?.card_id});
        }
        }
      }
        className="w-16 h-16 rounded-lg bg-gray-500 overflow-hidden relative"
        // eslint-disable-next-line no-undef
      >
        {/* <img height={50} width={50} src={data?.img_url}/> */}
        <Img data={data?.img_url} height={120} width={120} fallback={fallbackShop?.src}/>
        {data?.card_labels && data.card_labels !== "" && <LabelHolder label={data?.card_labels}/>}
      </div>
       
    </div>
  )
}

function AdCards({
  adCards, videoId, comp, loading, pageName, tabName, campaignId="NA"
}) {

  useEffect(()=>{console.log("ad-card",adCards, adCards?.[0]?.card_id)},[])
  const { show } = useDrawer();
  // const [loading, setLoading] = useState(true);
  // const loaded = () => {
  //   setLoading(false);
  // };
  useEffect(() => {
    allAdCards = adCards;
  //  adCards?.map { toTrackMixpanel('monetisationProductImp',{pageName:pageName, tabName:tabName},{content_id:videoId,productId:data?.card_id, brandUrl:data?.product_url})}
  }, []);

  // const { t } = useTranslation();
  const adCardsLength = adCards?.length;
  const type = {
    feed: 'bottom-0 flex right-2 justify-between items-center p-2 absolute',
    profile: 'bottom-0 flex right-2 justify-between items-center p-2 absolute',
    embed: 'bottom-4 flex h-24 right-2 justify-between items-center p-2 absolute',
    single: 'bottom-16 flex h-24 right-2 justify-between items-center p-2 fixed',
  };

  return (
    <div
      className={type[comp]}
    >
      {
        adCardsLength > 0 ? adCardsLength > 1 ? (
          <Carousel id={videoId} slideData={adCards} Children={CardElement} tabName={tabName} pageName={pageName} videoId={videoId} campaignId={campaignId} comp={comp} show={show}/>
        ) : (
          <CardElement comp={comp} data={adCards[0]} tabName={tabName} pageName={pageName} videoId={videoId} campaignId={campaignId} show={show} appsflyerId={adCards[0]?.appsflyer_id || null}/>
        ):''
      }
    </div>
  );
}

export default AdCards;
