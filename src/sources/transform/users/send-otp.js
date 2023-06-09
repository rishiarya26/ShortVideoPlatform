import { transformModel, getMessage } from '../index';
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
  try {
    if (data.code === 0) {
      payload.status = 'success';
      payload.message = getMessage(data, {});
      payload['http-status'] = resp['http-status'];
      payload.data = { ...data.responseData };
      payload.requestedWith = { ...data.requestedWith };
    }
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
