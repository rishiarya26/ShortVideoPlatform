import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';

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
//   console.log("add_banner",data)
  const {responseData = {}} = data;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    // payload.status = 'success';
    // payload.message = getMessage(data, {});
    // payload['http-status'] = data.status;
    const {bannerMeta = {}} = responseData;
    let tData={};
    if(bannerMeta){
    tData.displayName = bannerMeta?.title;
    tData.bannerUrl = bannerMeta?.url;
    tData.thumbnail = bannerMeta?.image;
    tData.position = bannerMeta?.position || 0;
    }
    payload.data = tData;
    // payload.requestedWith = { ...data.requestedWith };
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
