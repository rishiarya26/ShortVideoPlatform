import { get, post, del } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/social';
import { getEpochTime } from '../../utils/date';
import { trimSpace } from '../../utils/string';

const apiKey = '4dbc881836c2a0130cda9cfcec0f3383';
const appId = 'YInJ8G70y098';

const middlewareSettings = {
  shouldCache: true,
  ttl: getEpochTime('MINUTE', 5)
};

const getActivityFeed = async ({ socialId = 0, nextCursor = '' }) => {
  let response = {};
  try {
    // eslint-disable-next-line max-len
    const apiPath = trimSpace(`
    ${getApiBasePath('get-social')}/activities
    ?target_type=ACTIVITY
    &target_id=${socialId}
    &app_id=${appId}
    ${(nextCursor ? `&next_cursor=${nextCursor}` : '')}
    `);
    response = await get(apiPath, null, {
      'X-GetSocial-API-Key': apiKey
    });
    response.data.status = 200;
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const postComment = async ({ text = '', socialId }) => {
  let response = {};
  try {
    const payload = {
      app_id: appId,
      activity: {
        content: {
          language: 'en',
          text
        },
        target: {
          type: 'ACTIVITY',
          id: socialId
        }
      }
    };
    const apiPath = `${getApiBasePath('get-social')}/activities`;
    response = await post(apiPath, payload, {
      'X-GetSocial-API-Key': apiKey
    });
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const postLike = async ({ socialId }) => {
  let response = {};
  try {
    const payload = {
      app_id: appId,
      reaction: {
        type: 'like',
        activity_ids: [
          socialId
        ]
      }
    };
    const apiPath = `${getApiBasePath('get-social')}/activities/reactions`;
    response = await post(apiPath, payload, {
      'X-GetSocial-API-Key': apiKey
    });

    response.data.status = 200;
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteLike = async ({ socialId }) => {
  let response = {};
  try {
    const payload = {
      app_id: appId,
      reaction: {
        type: 'like',
        activity_ids: [
          socialId
        ]
      }
    };
    const apiPath = `${getApiBasePath('get-social')}/activities/reactions`;
    response = await del(apiPath, payload, {
      'X-GetSocial-API-Key': apiKey
    });
    response.data.status = 200;
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [getComments, clearComments] = apiMiddleWare(getActivityFeed, transformSuccess, transformError, middlewareSettings);

export {
  getComments,
  clearComments,
  postComment,
  postLike,
  deleteLike
};
