import { transformModel, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';

function transformError() {
  const { payload } = getNewObjectCopy(transformModel);
  payload.canShop = false;
  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.canShop = false;
    if (
      data.data?.[0]?.topCharms?.length > 0
    ) {
      payload.canShop = true;
    }
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
