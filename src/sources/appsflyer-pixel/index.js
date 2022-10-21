import { get } from 'network';
import { SITE_ID } from '../../constants';
import { getItem } from '../../utils/cookie';

const appsflyerPixelImp = async({appId,advertiser,productId,comp})=>{
  try {
    const apiPath = `https://impression.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_sub1=${productId}&af_sub2=${comp}&af_sub3=web&af_click_lookback=7`;
    response = await get(apiPath,null,{
    'content-type':'noHeaders'
    });
    response.data.requestedWith = { appId };
    return Promise.resolve(response);
  } catch (err) {
    console.error('error',err)
    return Promise.resolve({ data: '' });
  }
}  

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

export { appsflyerPixelImp , appsflyerPixelClick};
