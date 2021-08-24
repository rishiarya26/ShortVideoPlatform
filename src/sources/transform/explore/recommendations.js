import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';
import { isObjectEmpty } from '../../../network/utils';

function transformError(error = {}) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload['http-status'] = error['http-status'] || DEFAULT_ERROR_CODE;
  payload.errorCode = data.statusCode || error['http-status'] || DEFAULT_ERROR_CODE;

  return payload;
}
    //TO-DO merge both responseData & align accordingly

function transformSuccess(resp) {
  
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  const {responseData} = data;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    const respData = isObjectEmpty(responseData) ? [] : (responseData?.length > 0 && responseData);
    payload.data = respData;
    payload.requestedWith = data?.requestedWith;
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
