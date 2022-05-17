/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/explore/users';

async function fetchSearchResult({
  keyword, limit='18', offset='1'
}) {
  console.log("keyword",keyword)
  let response = {};
  try {
    console.log(keyword)
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/search/result/users?keyword=${keyword}&limit=${limit}&offset=${offset}`;
    response = await get(apiPath);
    response.data.requestedWith = { keyword };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getUsers, clearUsers] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getUsers, clearUsers };
