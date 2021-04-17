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
  if (error['http-status']) {
    payload['http-status'] = error['http-status'];
  } else {
    payload['http-status'] = DEFAULT_ERROR_CODE;
  }
  if (data.statusCode || error['http-status']) {
    payload.errorCode = data.statusCode || error['http-status'];
  } else {
    payload.errorCode = DEFAULT_ERROR_CODE;
  }
  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  let data = {};
  try {
    if (!isSuccess(resp)) {
      return transformError(resp);
    }
    data = resp.data;
    payload.status = 'success';
    payload['http-status'] = resp['http-status'];
    payload.message = getMessage(resp, msgMap);
    payload.data = data;
    payload.requestedWith = { ...resp.requestedWith };
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
