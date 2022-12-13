import { get } from 'network';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { getApiBasePath } from '../../config';
import { SITE_ID } from '../../constants';
import { getItem } from '../../utils/cookie';

// const appsflyerPixelImp = async({appId,advertiser,productId,comp})=>{
//   try {
//     const apiPath = `https://impression.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_sub1=${productId}&af_sub2=${comp}&af_sub3=web&af_click_lookback=7`;
//     response = await get(apiPath,null,{
//     'content-type':'noHeaders'
//     });
//     response.data.requestedWith = { appId };
//     return Promise.resolve(response);
//   } catch (err) {
//     console.error('error',err)
//     return Promise.resolve({ data: '' });
//   }
// }  

const appsflyerPixelClick = ({appId, iosAppId, advertiser,uri, productId, comp})=>{
    try {
      const encodedUTF8Uri = uri && (encodeURIComponent(uri) || null);
      const device = getItem('device-info');  
      const apiPath = 
      device === 'android' ? `https://app.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_android_url=${encodedUTF8Uri}&af_dp=${encodedUTF8Uri}af_sub1=${productId}&af_sub2=${comp}&af_sub3=web&af_click_lookback=7`
     : device === 'ios' && `https://app.appsflyer.com/${iosAppId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_ios_url=${encodedUTF8Uri}&af_dp=${encodedUTF8Uri}af_sub1=${productId}&af_sub2=${comp}&af_sub3=web&af_click_lookback=7`
    return apiPath;
    } catch (err) {
        console.error('error',err)
    }
  }  

  const appsflyerPixelWrapperImp = async({appId,advertiser,productId,comp,mixpanelProperties})=>{
    let response;
    let appsflyerImpUrl;
    let {pageName, tabName, id,shopName,productName,videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId} = mixpanelProperties;
    try {
      appsflyerImpUrl = `https://impression.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_sub1=${productId}&af_sub2=${comp}&af_sub3=web&af_click_lookback=7`;
      const encodedAppsflyerUrl = encodeURIComponent(appsflyerImpUrl);
      const apiPath = `${getApiBasePath('hipi')}/v1/shorts/impressionappsflyer?url=${encodedAppsflyerUrl}`;
      response = await get(apiPath);
      if(response?.data?.status === 200){
        toTrackMixpanel('appsflyerLogs',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId:appsflyerId,request:appsflyerImpUrl , response: response?.data})
      }
      console.log("APPSFLYER PIXEL IMP FIRED", response);
      response.data.requestedWith = { appId };
      return Promise.resolve(response);
    } catch (err) {
      try{
        toTrackMixpanel('appsflyerLogs',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId:appsflyerId,request:appsflyerImpUrl , response: err})
      }catch(e){
        console.error('error in calling mixpanel function');
      }
      console.error('appsflyer imp error',err)
      return Promise.resolve({ data: '' });
    }
  }  

  const impressionUrlWrapper = async({url})=>{
    let response;
    try {
      // const appsflyerImpUrl = `https://impression.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_sub1=${productId}&af_sub2=${comp}&af_sub3=web&af_click_lookback=7`;
      const encodedImpressionUrl = encodeURIComponent(url);
      const apiPath = `${getApiBasePath('hipi')}/v1/shorts/impressionappsflyer?url=${encodedImpressionUrl}`;
      response = await get(apiPath);
      console.log("APPSFLYER Impression AD PIXEL FIRED", response);
      response.data.requestedWith = { appId };
      return Promise.resolve(response);
    } catch (err) {
      console.error('error',err)
      return Promise.resolve({ data: '' });
    }
  }  

export { appsflyerPixelWrapperImp as appsflyerPixelImp , appsflyerPixelClick, impressionUrlWrapper};
