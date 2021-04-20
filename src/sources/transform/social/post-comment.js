import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';

const msgMap = {
  200: 'ok'
};

function fetchCommentsTextByLang(content) {
  // TODO get current language here, get social needs to support all languages supported by hipi
  const lang = 'en';
  return content.filter(item => item.language === lang)[0];
}

function transformError(error = {}) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload.data = [];
  payload['http-status'] = error['http-status'] || DEFAULT_ERROR_CODE;
  payload.errorCode = data.statusCode || error['http-status'] || DEFAULT_ERROR_CODE;
  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  let { data = {} } = resp;
  try {
    
    if (!isSuccess(resp)) {
      return transformError(resp);
    }
      payload.status = 'success';
      payload.message = getMessage(data, msgMap);
      payload['http-status'] = resp['http-status'];
      payload.data = data.activity
      payload.requestedWith = { ...data.requestedWith };
    if (!payload.data || payload.data.length === 0) {
      throw new Error('comments not found');
    }
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
