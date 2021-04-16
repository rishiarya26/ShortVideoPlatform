import { transformModel, getMessage } from '../index';
import { getNewObjectCopy } from '../../../utils/app';

function transformError(error = {}) {
  const { payload } = getNewObjectCopy(transformModel);
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload['http-status'] = error.status;
  return payload;
}

function transformSuccess(data) {
  const { payload } = getNewObjectCopy(transformModel);
  try {
    if (data.code === 0) {
      payload.status = 'success';
      payload.message = getMessage(data, {});
      payload['http-status'] = data.status;
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
