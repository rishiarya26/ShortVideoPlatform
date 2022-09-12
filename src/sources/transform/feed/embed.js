import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';
import { isObjectEmpty } from '../../../network/utils';

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
    const { responseData = {} } = data;
    const { videos = [] } = responseData;
    console.log("rrrr",responseData)
    if (videos?.length > 0) {
      const payloadObject = {};
      videos.forEach(d => {
        payloadObject.data_id = d?.objectID || null;
        payloadObject.content_id = d?.id || null;
        payloadObject.content_description = d?.description || null;
        payloadObject.userId = d?.videoOwnersId || null;
        payloadObject.videoOwnersId = d?.videoOwnersId || null;

        payloadObject.getSocialId = d?.getSocialId || null;
        payloadObject.id = d?.id || null;
        payloadObject.genre = d?.genre || null || null;
        payloadObject.userProfilePicUrl = d?.videoOwners?.profilePicImgUrl || null;
        payloadObject.userName = d?.videoOwners?.userName || null;
        payloadObject.likesCount = d?.lCount || (d?.likeCount && Number(d.likeCount)) || null;
        payloadObject.music_title = d?.sound?.name || null;
        payloadObject.hashTags = d?.hashtags || null;
        const videoUrls = {};
        videoUrls.fast = d?.videoUrl?.AkamaiURL?.[2];
        videoUrls.medium = d?.videoUrl?.AkamaiURL?.[1];
        videoUrls.low = d?.akamaiUrl || null;
        payloadObject.video_urls = videoUrls;
        payloadObject.thumbnail = d?.thumbnailUrl || null;
        payloadObject.videoOwnersDetail = d?.videoOwners || null;
        payloadObject.firstFrame = d?.firstFrame || null;
        payloadObject.createdOn = d?.createdOn || null
        payloadObject.videoSound = d?.sound ? !isObjectEmpty(d.sound) : false;
      });
      payload.data = payloadObject;
    } else {
      return transformError(data);
    }
    const { canShop = {} } = data;
    const { isShoppable = false } = canShop;
    const shop = {};
    if (isShoppable) {
      shop.status = 'success';
      shop.data = canShop?.data;
      shop.campaignId = canShop?.campaignId;
    } else {
      shop.status = 'fail';
    }
    payload.data.canShop = shop;
    payload.requestedWith = { ...data?.requestedWith || null };
    return payload;
  } catch (err) {
    // console.log("err",error)
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
