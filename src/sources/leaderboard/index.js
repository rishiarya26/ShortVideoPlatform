import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/leaderboard';

async function leaderboardData({round}) {
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

//Latest API
const fetchLeaderboardData = async(hashtag)=>{
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/leaderboard/challenge/details?id=${'leaderboardTest2'}`;
    response = await get(apiPath,null, {});
    response.data.requestedWith = { hashtag };
    return Promise.resolve(response);
  } catch (err) {
    console.error("Fetch leaderboard api issue",err)
    return Promise.reject(err);
  }
}

//Latest API
const fetchLeaderboardWinners = async(campaign)=>{
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/leaderboard/winners?id=${'leaderboardTest'}`;
    response = await get(apiPath,null, {});
    return Promise.resolve(response);
  } catch (err) {
    console.error("winners leaderboard api issue",err)
    return Promise.reject(err);
  }
}

const [getLeaderboardData] = apiMiddleWare(leaderboardData, transformSuccess, transformError, {shouldCache : false});

export { getLeaderboardData, fetchLeaderboardData, fetchLeaderboardWinners };