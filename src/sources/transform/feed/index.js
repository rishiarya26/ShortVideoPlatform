import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';

const msgMap = {
  200: 'ok'
};

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
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload['http-status'] = resp['http-status'];
    payload.message = getMessage(data, msgMap);
    // COMMENTED - for production feed api
    // const networkConnection = getNetworkConnection();
    /* const { responseData = {} } = data;
    const { videos = [] } = responseData;
    const payloadData = [];
    videos?.forEach(d => {
      const payloadObject = {};
      payloadObject.data_id = d.objectID;
      payloadObject.content_id = d.id;
      let videoUrls = {}
      videoUrls.fast = d.videoUrl?.AkamaiURL?.[2];
      videoUrls.medium = d.videoUrl?.AkamaiURL?.[1];
      videoUrls.low = d.akamaiUrl;
      const videoUrl = getEffectiveVideoUrl(videoUrls);
      payloadObject.video_url = videoUrl;
      payloadObject.content_description = d.description;
      payloadObject.userId = d.videoOwnersId;
      payloadObject.videoOwnersId = d.videoOwnersId;
      payloadObject.getSocialId = d.getSocialId;
      payloadObject.id = d.id;
      payloadObject.genre = d.genre;
      payloadObject.userProfilePicUrl = d.videoOwners.profilePicImgUrl;
      payloadObject.userName = d.videoOwners.userName;
      payloadObject.likesCount = d.lCount;
      payloadObject.music_title = d.sound.name;
      payloadObject.hashtags = d.hashtags;
      payloadObject.thumbnail = d.thumbnailUrl;

      payloadData.push(payloadObject);
    });
  */

    const { response = [] } = data;
    const tResponse = [...response];
    tResponse.forEach(data => {
      data.saveLook = false;
    });
    payload.data = tResponse;

    payload.requestedWith = { ...data.requestedWith };
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
