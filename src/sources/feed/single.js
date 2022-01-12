import { get } from 'network';
import { getApiBasePath, isMockMode } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { canShop } from '../can-shop';
import { transformSuccess, transformError } from '../transform/feed/single';

async function fetchEmbedFeed({ id }) {
  let response = {};
  let apiPath = '';
  try {
    if (isMockMode()) {
      apiPath = `${getApiBasePath('app')}/api/embed`;
      response = await get(apiPath);
     
      response.data.requestedWith = { id };

      return Promise.resolve(response.data);
    }
    apiPath = `${getApiBasePath('hipi')}/v1/shorts/video/detail?id=${id}`;
    

    response = await Promise.all([get(apiPath), canShop({ videoId: id })]);
    const [resp, shop] = response;
    console.log("single video",resp,shop)
    resp.data.requestedWith = { id };
    resp.data.canShop = shop;
    return Promise.resolve(resp);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getSingleVideo, clearSingleVideo] = apiMiddleWare(fetchEmbedFeed, transformSuccess, transformError);

export {
  getSingleVideo, clearSingleVideo
};

