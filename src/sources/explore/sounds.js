/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/explore/hastags';

async function fetchSearchResult({
  lang, keyword, limit, offset
}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/search/result/sounds?keyword=${keyword}&limit=${limit}&offset=${offset}`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

fetchSearchResult();

const [getSounds, clearSounds] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getSounds, clearSounds };
