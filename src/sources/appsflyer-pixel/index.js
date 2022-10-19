import { get } from 'network';
import { SITE_ID } from '../../constants';
import { getItem } from '../../utils/cookie';

const appsflyerPixelImp = async({appId,advertiser})=>{
  try {
    const apiPath = `https://impression.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}`;
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

const appsflyerPixelClick = ({appId, iosAppId, advertiser,uri})=>{
    try {
      const encodedUTF8Uri = uri && (encodeURIComponent(uri) || null);
      const device = getItem('device-info');  
      const apiPath = 
      device === 'android' ? `https://app.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_android_url=${encodedUTF8Uri}&af_dp=${encodedUTF8Uri}`
     : device === 'ios' && `https://app.appsflyer.com/${iosAppId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_ios_url=${encodedUTF8Uri}&af_dp=${encodedUTF8Uri}`
    return apiPath;
    } catch (err) {
        console.error('error',err)
    }
  }  

export { appsflyerPixelImp , appsflyerPixelClick};
