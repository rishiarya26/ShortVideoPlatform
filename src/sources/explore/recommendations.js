import { get } from '../../network/index';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess , transformError  } from '../transform/explore/recommendations';

async function fetchRecommendations() {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/discover/recommendation`;
    response = await get(apiPath);
    response.data.requestedWith = { };
    return Promise.resolve(response);
  } catch (err) {
    console.log(err);

    return Promise.reject(err);
  }
}

const [getRecommendations, clearRecommendations] = apiMiddleWare(fetchRecommendations, transformSuccess, transformError);

export {
  getRecommendations, clearRecommendations
};
