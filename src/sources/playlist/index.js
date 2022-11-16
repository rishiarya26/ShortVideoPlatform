import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { getNetworkConnection } from '../../utils/device-details';
import { localStorage } from '../../utils/storage';
const API = `http://middleware-stage.charmd.me/api/v1/shorts/profile/playlist`

function transformSuccess(data) {
  const networkConnection = getNetworkConnection();
  const { data: {playlists} } = data;
  playlists?.map((playlist) => {
    const videos = playlist?.videos;
    videos?.forEach((video,i) => {
      const d = JSON.parse(video.videoUrl);
      let videoUrls = {};
      videoUrls.fast = d?.AkamaiURL?.[2];
      videoUrls.medium = d?.AkamaiURL?.[1];
      videoUrls.low = video?.akamaiUrl;
      const videoUrl = videoUrls[networkConnection];
      video.video_url = videoUrl;
    })
  })
  return playlists;
}

function transformError(data) {
  return data;
}
/*"f43ca1a5-6ee8-4380-9272-e44db8656bf4"*/
async function getPlaylistDetailsApi({playlistid}) {
    const guestToken = getItem('guest-token');
    const userId =  localStorage.get('user-id');
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
