import { transformModel, getMessage } from '../index';
import { getNewObjectCopy } from '../../../utils/app';

const msgMap = {
  200: 'ok'
};

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
    if (data.status > 199 && data.status < 300) {
      payload.status = 'success';
      payload.message = getMessage(data, msgMap);
      payload['http-status'] = data.status;
      payload.data = data.data;
      payload.requestedWith = { ...data.requestedWith };
    }
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
