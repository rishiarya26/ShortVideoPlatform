import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';

function transformError(error = {}) {
  console.log("error",error)

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
  const { data = [] } = resp?.data;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    if (data?.length > 0) {  
      data.forEach((item)=>{
        item.profilepic = item?.profilepic?.replaceAll('upload','upload/w_50') || '';
      })
    }
    console.log("data22",data, data[0].profilepic)
      payload.data = data || [];

    payload.requestedWith = { ...data.requestedWith };
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
