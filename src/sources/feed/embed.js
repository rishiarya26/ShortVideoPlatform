import { get } from 'network';
import { getApiBasePath, isMockMode } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { canShop } from '../can-shop';
import { transformSuccess, transformError } from '../transform/feed/embed';

async function fetchEmbedFeed({ id }) {
  let response = {};
  let apiPath = '';
  try {
    if (isMockMode()) {
      apiPath = `${getApiBasePath('app')}/api/embed`;
    } else {
      apiPath = `${getApiBasePath('hipi')}/v1/shorts/video/detail?id=${id}`;
    }
    response = await Promise.all([get(apiPath), canShop({ videoId: id })]);
    response[0].data.requestedWith = { id };
    response[0].data.canShop = response[1].canShop;
    return Promise.resolve(response[0]);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getSingleFeed, clearSingleFeed] = apiMiddleWare(fetchEmbedFeed, transformSuccess, transformError);

export {
  getSingleFeed, clearSingleFeed
};
