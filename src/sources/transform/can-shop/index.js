import { transformModel, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';

function transformError() {
  const { payload } = getNewObjectCopy(transformModel);
  payload.isShoppable = false;
  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.isShoppable = false;
    if (
      data.data?.[0]?.topCharms?.length > 0
    ) {
      payload.data = data.data[0].topCharms?.[0]?.contentImageUrlArray;
      payload.type = data.data[0]?.topCharms?.[0]?.charm_type;
      payload.isShoppable = true;
    }
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
