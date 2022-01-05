/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../../sources/transform/explore/additional-banner';

async function fetchAdditionalBanner() {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/config`;
    response = await get(apiPath);
    // response.data.requestedWith = { keyword };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getAdditionalBanner, clearAdditionalBanner] = apiMiddleWare(fetchAdditionalBanner, transformSuccess, transformError);

export { getAdditionalBanner, clearAdditionalBanner };
