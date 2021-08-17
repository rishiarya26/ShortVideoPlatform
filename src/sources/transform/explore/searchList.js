import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';

function transformError(error = {}) {
  console.log(error)
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
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    const { recommendations = []} = data;
    const { responseData = []} = data;
    console.log(recommendations, responseData)
    const updateData = recommendations?.concat(responseData);
    payload.data = updateData;
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    payload.requestedWith = data?.requestedWith;
    console.log('final list -', updateData);
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
