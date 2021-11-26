import { transformModel, getMessage, isSuccess } from '../../index';
import { getNewObjectCopy } from '../../../../utils/app';
// import { trimLowerCase } from '../../../utils/string';
import { DEFAULT_ERROR_CODE } from '../../../../constants';

const msgMap = {
  200: 'ok'
};


function transformErrorViewCount(error = {}) {
    const  {payload}  = getNewObjectCopy(transformModel);
    const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload.data = [];
  payload['http-status'] = error['http-status'] || DEFAULT_ERROR_CODE;
  payload.errorCode = data.statusCode || error['http-status'] || DEFAULT_ERROR_CODE;
  return payload;
}

function transformSuccessViewCount(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload.message = getMessage(data, msgMap);
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccessViewCount, transformErrorViewCount };
