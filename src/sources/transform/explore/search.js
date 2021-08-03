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
  console.log('in trans', resp);
  const { payload } = getNewObjectCopy(transformModel);
  const [searchData, recommendationData] = resp;
  const { data = {} } = resp;
  console.log('in trans', data);
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    const responseData = [];
    // responseData.map((data,))
    recommendationData?.data?.responseData.push(searchData?.data?.responseData);
    payload.data = data?.responseData;
    payload.requestedWith = data?.requestedWith;
    console.log('recommendations list -', data?.responseData);
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
