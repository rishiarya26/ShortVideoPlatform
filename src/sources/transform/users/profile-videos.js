import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';
import { getNetworkConnection } from '../../../utils/device-details';
import { isObjectEmpty } from '../../../network/utils';

function transformError(error = {}) {
  console.log('Errore', error);
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
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    const { responseData = [] } = data;
    const networkConnection = getNetworkConnection();
    if (responseData?.length > 0) {
      const payloadData = [];
      data.responseData.forEach(d => {
        const payloadObject = {};
        payloadObject.data_id = d?.objectID;
        payloadObject.content_id = d?.id;
        let videoUrls = {}
        videoUrls.fast = d?.videoUrl?.AkamaiURL?.[2];
        videoUrls.medium = d?.videoUrl?.AkamaiURL?.[1];
        videoUrls.low = d?.akamaiUrl;
        const videoUrl = videoUrls[networkConnection];
        payloadObject.video_url = videoUrl;
        payloadObject.content_description = d?.description;
        payloadObject.userId = d?.videoOwnersId;
        payloadObject.videoOwnersId = d?.videoOwnersId;
        payloadObject.getSocialId = d?.getSocialId;
        payloadObject.id = d?.id;
        payloadObject.genre = d?.genre;
        payloadObject.userProfilePicUrl = d?.videoOwners?.profilePicImgUrl;
        payloadObject.userName = d?.videoOwners?.userName || null;
        payloadObject.likesCount = d?.lCount || (d?.likeCount && Number(d.likeCount)) || null;
        payloadObject.music_title = d?.sound?.name;
        payloadObject.hashTags = d?.hashtags;
        payloadObject.thumbnailUrl = d?.thumbnailUrl;
        payloadObject.viewCount = d?.viewCount;
        payloadObject.shoppable = d?.shoppable || false
        payloadObject.firstFrame= d?.firstFrame || null;
        payloadObject.firstName = d?.videoOwners?.firstName || null;
        payloadObject.lastName = d?.videoOwners?.lastName || null;
        payloadObject.createdOn = d?.createdOn || null
        payloadObject.createdTimestamp = d?.createdTimeStamp || null;
        payloadObject.verified=d?.videoOwners?.tag?.toLowerCase() || null;
        payloadObject.videoSound = d?.sound ? !isObjectEmpty(d.sound) : false;
        payloadObject.duration = d?.videoDuration || null;
        payloadObject.status = d?.status || null;

        payloadData.push(payloadObject);
      });

      if(data?.firstVideo){
        // data.firstVideo.video_url = data?.firstVideo?.video_urls[networkConnection];
        payloadData?.splice(0,0,data?.firstVideo);
      }
      payload.data = payloadData;
    } else {
      payload.data = responseData;
    }
    payload.requestedWith = { ...data.requestedWith };
    return payload;
  } catch (err) {
    console.log('err,', err);
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
