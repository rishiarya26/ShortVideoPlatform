import { transformModel, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';

function transformError() {
  const { payload } = getNewObjectCopy(transformModel);
  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    // data.getSocialToken = resp?.data?.shortsAuthToken
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
