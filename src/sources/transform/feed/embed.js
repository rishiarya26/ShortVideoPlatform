import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';

const msgMap = {
  200: 'ok'
};

function transformError(error = {}) {
  console.log('err', error);
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
    const { responseData = {} } = data;
    const { videos = [] } = responseData;
    if (videos?.length) {
      const payloadObject = {};
      videos.forEach(d => {
        payloadObject.data_id = d.objectID;
        payloadObject.content_id = d.id;
        payloadObject.content_description = d.description;
        payloadObject.userId = d.videoOwnersId;
        payloadObject.videoOwnersId = d.videoOwnersId;
        payloadObject.getSocialId = d.getSocialId;
        payloadObject.id = d.id;
        payloadObject.genre = d?.genre || null;
        payloadObject.userProfilePicUrl = d.videoOwners.profilePicImgUrl;
        payloadObject.userName = d.videoOwners.userName;
        payloadObject.likesCount = d.lCount;
        payloadObject.music_title = d.sound.name;
        payloadObject.hashTags = d.hashtags;
        const videoUrls = {};
        videoUrls.fast = d?.videoUrl?.AkamaiURL?.[2];
        videoUrls.medium = d?.videoUrl?.AkamaiURL?.[1];
        videoUrls.low = d.akamaiUrl;
        payloadObject.video_urls = videoUrls;
        payloadObject.thumbnail = d.thumbnailUrl;
      });
      payload.data = payloadObject;
    } else {
      return transformError(data);
    }
    console.log('shop', data.canShop);
    const { canShop = {} } = data;
    const { isShoppable = false } = canShop;
    const shop = {};
    if (isShoppable) {
      shop.status = 'success';
      shop.data = canShop?.data;
    } else {
      shop.status = 'fail';
    }
    payload.data.canShop = shop;
    payload.requestedWith = { ...data.requestedWith };
    console.log('payload', payload);
    return payload;
  } catch (err) {
    // console.log("err",error)
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
