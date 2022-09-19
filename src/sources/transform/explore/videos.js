import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';
import { getNetworkConnection } from '../../../utils/device-details';
import { isObjectEmpty } from '../../../network/utils';

function transformError(error = {}) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload['http-status'] = error['http-status'] || DEFAULT_ERROR_CODE;
  payload.errorCode = data.statusCode || error['http-status'] || DEFAULT_ERROR_CODE;

  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  const {responseData = {}} = data;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    const networkConnection = getNetworkConnection();
    const respData = isObjectEmpty(responseData) ? [] : responseData?.videos?.length > 0 ? responseData.videos : [];
    if(respData?.length > 0){
      responseData?.videos?.map((d)=>{
        let videoUrls = {}
        videoUrls.fast = d?.videoUrl?.AkamaiURL?.[2];
        videoUrls.medium = d?.videoUrl?.AkamaiURL?.[1];
        videoUrls.low = d?.akamaiUrl;
        const videoUrl =  videoUrls[networkConnection];
        d.selected_video_url = videoUrl;
        d.shoppable = d?.shoppable || false;
        d.likesCount = d?.likeCount;
        d.videoSound = d?.sound ? !isObjectEmpty(d.sound) : false;
      })
    }else{
       responseData.videos = [];
    }
 
    console.log("d",responseData.videos)
    // console.log("tresp",responseData.videos)
    payload.data = responseData?.videos;
    console.log("tresp",payload.data)
    payload.requestedWith = { ...data.requestedWith };
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}


export { transformSuccess, transformError };
