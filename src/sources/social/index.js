import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/social';

const apiKey = 'abcd';
const appId = 'YInJ8G70y098';

const getActivityFeed = async ({ activityId = 1234 }) => {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('get-social')}/activities?target_id=${activityId}&app_id=${appId}`;
    response = await get(apiPath, null, {
      'X-GetSocial-API-Key': apiKey
    });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [getComments, clearComments] = apiMiddleWare(getActivityFeed, transformSuccess, transformError);

export { getComments, clearComments };
