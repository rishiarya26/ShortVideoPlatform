/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { localStorage } from '../../utils/storage';
import { transformSuccess, transformError } from '../transform/explore/hashtags-videos';
import { getHashTagDetails } from './hashtags-detail';

async function fetchSearchResult({
   keyword, limit='15', offset='1', videoId
}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/hashtag/videoDetails?id=${keyword}&limit=${limit}&offset=${offset}&type=hashtag`;
    response = await Promise.all([get(apiPath), getHashTagDetails({ keyword: keyword })]);
    const [resp, details] = response;
  console.log(resp,details)
  if(videoId && resp?.data?.responseData?.length > 0){
    const items = resp.data.responseData
    const index = items.findIndex((data)=>(data?.id === videoId))
    if(index !== -1){
      const video = items[index]
      items.splice(index,1);
      items.splice(0,0,video);
    }
    else{ 
      const video = localStorage.get('selected-hashtag-video')
        video && (resp.data.firstVideo = video);
    }
    // const data = await getSingleFeed({id : videoId});
    // video = data?.data;
    // response.data.firstVideo = video;
    // console.log("resppp", response, data)}
  }
     resp.data.details = details?.data;
     console.log(resp)
    resp.data.requestedWith = { keyword };
    return Promise.resolve(resp);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getHashTagVideos, clearHashTagVideos] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getHashTagVideos, clearHashTagVideos };
