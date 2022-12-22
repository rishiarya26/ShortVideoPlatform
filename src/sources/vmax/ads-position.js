import { get } from 'network';
import { getApiBasePath } from '../../config';
import { DEFAULT_ERROR_CODE } from '../../constants';
import { apiMiddleWare } from '../../network/utils';
import { getNewObjectCopy } from '../../utils/app';
import { getMessage, transformModel } from '../transform';

function transformError(error = {}) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload['http-status'] = error['http-status'] || DEFAULT_ERROR_CODE;
  payload.errorCode = data.statusCode || error['http-status'] || DEFAULT_ERROR_CODE;
  return payload;
}

const isSuccess = resp => {
  const { responseData = {} } = resp;
  let apiStatus = true;
  if (responseData.status) {
    apiStatus = (responseData.status > 199 && responseData.status < 300);
    console.log(apiStatus)
  }
  return apiStatus;
};

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { responseData = {} } = resp;
  const { ad_position = [] } = responseData;
  try {
    if (!isSuccess(resp)) {
      return transformError(responseData);
    }
    payload['http-status'] = resp['status'];
    payload['status'] = "success";
  
    payload.adPosition = ad_position?.[0] || "";
    return payload;
  } catch (err) {
    responseData.appError = err.message;
    return transformError(responseData);
  }
}

async function getAdPosition({ limit = 5 }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/ads-position?limit=${limit}`;
    response = await get(apiPath);
    response.data.requestedWith = { limit };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getAdPositions] = apiMiddleWare(getAdPosition, transformSuccess, transformError);

export { getAdPositions };
