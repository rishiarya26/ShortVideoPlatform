import { get } from '../../network/index';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/explore/searchList';

async function fetchRecommendations() {
  let response = {};
  try {
    const apiPath = 'https://hipigwapi.zee5.com/api/v2/shorts/discover/recommendation';
    console.log(apiPath);
    response = await get(apiPath);
    console.log(response);
    response.data.requestedWith = { };
    return Promise.resolve(response);
  } catch (err) {
    console.log(err);

    return Promise.reject(err);
  }
}

async function fetchSearchData({ limit = '5', offset = '1' }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/discover?limit=${limit}&offset=${offset}`;
    response = await Promise.all([get(apiPath), fetchRecommendations()]);
    // response[0].data?.responseData = response[0].data?.responseData + response[1].data?.responseData
    // console.log("respppp",response)
    response.data.requestedWith = { };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getRecommendations, clearRecommendations] = apiMiddleWare(fetchRecommendations, transformSuccess, transformError);
const [getSearchData, clearSearchData] = apiMiddleWare(fetchSearchData, transformSuccess, transformError);

export {
  getRecommendations, getSearchData, clearSearchData, clearRecommendations
};

