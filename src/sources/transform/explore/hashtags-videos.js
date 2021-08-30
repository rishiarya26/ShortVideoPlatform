import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';
import { getNetworkConnection } from '../../../utils/device-details';

function transformError(error = {}) {
    console.log(error)
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload['http-status'] = error['http-status'] || DEFAULT_ERROR_CODE;
  payload.errorCode = data.statusCode || error['http-status'] || DEFAULT_ERROR_CODE;

  return payload;
}

function transformSuccess(resp) {
    console.log(resp)
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    const networkConnection = getNetworkConnection();
    const { responseData = [] } = data;
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
        payloadObject.video_url = d?.akamaiUrl;
        payloadObject.content_description = d?.description;
        payloadObject.userId = d?.videoOwnersId;
        payloadObject.videoOwnersId = d?.videoOwnersId;
        payloadObject.getSocialId = d?.getSocialId;
        payloadObject.id = d?.id;
        payloadObject.genre = d?.genre;
        payloadObject.userProfilePicUrl = d?.videoOwners?.profilePicImgUrl;
        payloadObject.userName = d?.videoOwners.userName;
        payloadObject.likesCount = d?.lCount;
        payloadObject.music_title = d?.sound?.name;
        payloadObject.hashTags = d?.hashtags;
        payloadObject.thumbnailUrl = d?.thumbnailUrl;

        payloadData.push(payloadObject);
      });

      payload.data = payloadData;
      payload.details = data?.details;
      console.log(payload)
    } else {
      payload.data = responseData;
    }
    payload.requestedWith = { ...data.requestedWith };
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
