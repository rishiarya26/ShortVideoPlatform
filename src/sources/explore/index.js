import { get } from '../../network/index';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/explore/searchList';
import { getRecommendations } from './recommendations';

// async function fetchRecommendations() {
//   let response = {};
//   try {
//     const apiPath = `${getApiBasePath('hipi')}/v2/shorts/discover/recommendation`;
//     response = await get(apiPath);
//     console.log("resp",response);
//     response.data.requestedWith = { };
//     return Promise.resolve(response);
//   } catch (err) {
//     console.log(err);

//     return Promise.reject(err);
//   }
// }

async function fetchSearchData({ limit = '10', offset = '1' }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/discover?limit=${limit}&offset=${offset}`;
    response = await Promise.all([get(apiPath), getRecommendations()]);
    let [searchList, recommendationList] = response;
    searchList.data.recommendations = recommendationList?.data
    searchList.data.requestedWith = { limit, offset};
    return Promise.resolve(searchList);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getSearchData, clearSearchData] = apiMiddleWare(fetchSearchData, transformSuccess, transformError);

export {
   getSearchData, clearSearchData
};

