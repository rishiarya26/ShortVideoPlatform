import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/leaderboard';

async function leaderboardData({round = 1}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('leaderboard')}/leaderboard?round=${round}`;
    response = await get(apiPath,null, {'content-type':'noHeaders'});
    response.data.requestedWith = { round };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getLeaderboardData] = apiMiddleWare(leaderboardData, transformSuccess, transformError, {shouldCache : false});

export { getLeaderboardData };