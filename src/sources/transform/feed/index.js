import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';

const msgMap = {
  200: 'ok'
};

function transformError(error = {}) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload['http-status'] = error['http-status'];
  payload.errorCode = data.statusCode || error['http-status'];
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
    payload.message = getMessage(data, msgMap);
    payload['http-status'] = data.status;
    payload.data = data.data;
    payload.requestedWith = { ...data.requestedWith };
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
