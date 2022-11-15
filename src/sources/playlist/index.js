import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
const API = `http://middleware-stage.charmd.me/api/v1/shorts/profile/playlist`

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function getPlaylistDetailsApi({playlistid}) {
    const guestToken = getItem('guest-token');
    const userId = "f43ca1a5-6ee8-4380-9272-e44db8656bf4" || localStorage.getItem('user-id');
    let response = {};
    try {
      const apiPath = API;
      response = await get(apiPath, null, {
          'accept': 'application/json',
          'guest-token': guestToken,
          'creatorid': userId,
          ...(playlistid ? {'playlistid' : playlistid} : {}),
      });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
}

const [getPlaylistDetails, clearPlayDetails] = apiMiddleWare(getPlaylistDetailsApi, transformSuccess, transformError);

export {getPlaylistDetails, clearPlayDetails};
