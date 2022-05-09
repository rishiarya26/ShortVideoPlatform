import { get } from 'network';
import { getApiBasePath } from '../../config';
import useAuth from '../../hooks/use-auth';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';
import { detectGeoLocationByZee } from '../geo-location';
import { transformSuccess, transformError } from '../transform/feed';
import { getSingleFeed } from './embed';
import { getSingleVideo } from './single';

let firstTimeCall = true;
let geoData = localStorage?.get('geo-info') || null;

/* Feed API with login */
async function fetchHomeFeedWithLogin({ type = 'forYou', page = 1, total = 5, videoId, firstApiCall, campaign_id='' }) {

  let response = {};
  try {
    const condition = type === 'for-you' ? 'forYou' : 'following';
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}&campaign_id=${campaign_id || ''}`;
     let tokens = localStorage.get('tokens');
      const { shortsAuthToken = '' } = tokens;
      const { accessToken = '' } = tokens;
   if(geoData){     
        response = await get(apiPath,null,{
        Authorization: `Bearer ${shortsAuthToken}`,
        'access-token': accessToken,
        'X-GEO-IPADDR' : geoData?.ip || '',
        'X-GEO-COUNTRY-CODE':geoData?.country || '',
        'X-GEO-REGION-CODE':geoData?.state_code || '',
        'X-GEO-CITY':geoData?.city || '',
        'X-GEO-LATLONG':`${geoData?.lat || ''}${(geoData?.lat && geoData?.long) ? ',' : ''}${geoData?.long || ''}`,
        'X-GEO-PINCODE':geoData?.pin || ''
      })
    }else{
      const respGeoInfo = await detectGeoLocationByZee();
        const geoLocationInfo = respGeoInfo?.data;
          if(geoLocationInfo){
            console.log("No GEO_DATA*****",geoLocationInfo );
            response = await get(apiPath,null,{
              'X-GEO-COUNTRY-CODE':geoLocationInfo?.country_code || '',
              'X-GEO-REGION-CODE':geoLocationInfo?.state_code || '',
              'X-GEO-CITY':geoLocationInfo?.city || '',
              'X-GEO-LATLONG':`${geoLocationInfo?.lat || ''}${(geoLocationInfo?.lat && geoLocationInfo?.long) ? ',' : ''}${geoLocationInfo?.long || ''}`,
              'X-GEO-PINCODE':geoLocationInfo?.pin || '',
          })
      }}

      if(firstApiCall && videoId && response?.data?.responseData?.videos?.length > 0){
        const data = await getSingleVideo({id : videoId});
        console.log("l",data)
        const video = data?.data;
        console.log("l",data)
        response.data.firstVideo = video;
        console.log('first',video)
      }

    response.data.requestedWith = { page, total };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

/* Feed API without login */
async function fetchHomeFeed({ type = 'forYou', page = 1, total = 5, videoId , firstApiCall, campaign_id=''}) {
   console.log('fT',firstTimeCall)
  let response = {};
  try {
    const condition = type === 'for-you' ? 'forYou' : 'following';
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}&campaign_id=${campaign_id || ''}`;
    if(geoData){
      response = await get(apiPath,null,{
        'X-GEO-IPADDR' : geoData?.ip || '',
        'X-GEO-COUNTRY-CODE':geoData?.country || '',
        'X-GEO-REGION-CODE':geoData?.state_code || '',
        'X-GEO-CITY':geoData?.city || '',
        'X-GEO-LATLONG':`${geoData?.lat || ''}${(geoData?.lat && geoData?.long) ? ',' : ''}${geoData?.long || ''}`,
        'X-GEO-PINCODE':geoData?.pin || ''
    })
  }else{
    const respGeoInfo = await detectGeoLocationByZee();
    const geoLocationInfo = respGeoInfo?.data;
      if(geoLocationInfo){
        console.log("No GEO_DATA*****",geoLocationInfo );
        response = await get(apiPath,null,{
          'X-GEO-COUNTRY-CODE':geoLocationInfo?.country_code || '',
          'X-GEO-REGION-CODE':geoLocationInfo?.state_code || '',
          'X-GEO-CITY':geoLocationInfo?.city || '',
          'X-GEO-LATLONG':`${geoLocationInfo?.lat || ''}${(geoLocationInfo?.lat && geoLocationInfo?.long) ? ',' : ''}${geoLocationInfo?.long || ''}`,
          'X-GEO-PINCODE':geoLocationInfo?.pin || '',
      })
  }}
    
    console.log('v-id',videoId)
    if(firstApiCall && videoId && response?.data?.responseData?.videos?.length > 0){
      // const items = response.data.responseData;
      const data = await getSingleVideo({id : videoId});
      console.log("l",data)
      const video = data?.data;
      console.log("l",data)
      response.data.firstVideo = video;
      console.log('first',video)
      // console.log("resppp", response, data)
    }
      // const index = items.findIndex((data)=>(data?.id === videoId))
      // if(index !== -1){
      //   const video = items[index]
      //   items.splice(index,1);
      //   items.splice(0,0,video);
      // }
      // else{ 
      //   const video = localStorage.get('selected-profile-video')
      //     video && (response.data.firstVideo = video);
      // }
      console.log('resp-video',response)
      firstTimeCall = false;
    response.data.requestedWith = { page, total };
    return Promise.resolve(response);
  } catch (err) {
    firstTimeCall = false;
    return Promise.reject(err);
  }
}

// const options = selected === info[after]
const [getHomeFeed, clearHomeFeed] = apiMiddleWare(fetchHomeFeed, transformSuccess, transformError, {shouldCache : false});
const [getHomeFeedWLogin, clearHomeFeedWLogin] = apiMiddleWare(fetchHomeFeedWithLogin, transformSuccess, transformError, 
    {shouldCache : false, requiresAuth: true});

export { getHomeFeed, clearHomeFeed };
export { getHomeFeedWLogin, clearHomeFeedWLogin };
