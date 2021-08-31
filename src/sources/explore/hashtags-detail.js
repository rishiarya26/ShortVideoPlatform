/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../../sources/transform/explore/hashtags-detail';

async function fetchSearchResult({
   keyword
}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/hashtag/details?id=${keyword}`;
    response = await get(apiPath);
    response.data.requestedWith = { keyword };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getHashTagDetails, clearHashTagDetails] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getHashTagDetails, clearHashTagDetails };
