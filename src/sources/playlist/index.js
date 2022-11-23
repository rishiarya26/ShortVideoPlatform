import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare, isObjectEmpty } from '../../network/utils';
import { getNewObjectCopy } from '../../utils/app';
import { getItem } from '../../utils/cookie';
import { getNetworkConnection } from '../../utils/device-details';
import { localStorage } from '../../utils/storage';
import { getMessage, isSuccess, transformModel } from '../transform';


let firstTimeCall = true;

const msgMap = {
  200: 'ok'
};

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload['http-status'] = resp['http-status'];
    payload.message = getMessage(data, msgMap);
    const networkConnection = getNetworkConnection();
    const {playlists} = data
    let videos = playlists?.[0]?.videos;
    const payloadData = [];
    videos?.forEach((d,z) => {
      const payloadObject = {};
      payloadObject.watch=z;
      payloadObject.data_id = d?.objectID || null;
      payloadObject.content_id = d?.id;
      let videoUrls = {}
      videoUrls.fast = d?.videoUrl?.AkamaiURL?.[2];
      videoUrls.medium = d?.videoUrl?.AkamaiURL?.[1];
      videoUrls.low = d?.akamaiUrl;
      const videoUrl = videoUrls[networkConnection];
      payloadObject.video_url = videoUrl;
      payloadObject.content_description = d?.description;
      payloadObject.userId = d?.videoOwnersId || d?.videoOwners?.id;
      payloadObject.videoOwnersId = d?.videoOwnersId || d?.videoOwners?.id;
      payloadObject.getSocialId = d?.getSocialId;
      payloadObject.id = d?.id;
      payloadObject.genre = d?.genre || null;
      payloadObject.userProfilePicUrl = d?.videoOwners?.profilePicImgUrl;
      payloadObject.userName = d?.videoOwners?.userName;
      payloadObject.likesCount = d?.lCount || (d?.likeCount && Number(d.likeCount)) || null;
      payloadObject.music_title = d?.sound?.name || null;
      payloadObject.hashtags = d?.hashtags;
      payloadObject.thumbnail = d?.thumbnailUrl;
      payloadObject.saveLook = false;
      payloadObject.thumbnailUrls = d?.optionalThumbnail;
      payloadObject.creatorTag = d?.videoOwners?.tag || null;
      payloadObject.firstFrame= d?.firstFrame || null;
      payloadObject.isLiked= false;
      payloadObject.firstName=d?.videoOwners?.firstName || '';
      payloadObject.lastName=d?.videoOwners?.lastName || '';
      payloadObject.shareCount=d?.sCount || '';
      payloadObject.commentCount=d?.cCount || '';
      payloadObject.verified=d?.videoOwners?.tag?.toLowerCase() || null;
      payloadObject.shoppable = d?.shoppable || false;
      payloadObject.language = d?.language?.name || '';
      payloadObject.createdOn = d?.createdOn || '';
      payloadObject.videoDuration = d?.videoDuration || '';
      payloadObject.videoSound = d?.sound ? !isObjectEmpty(d.sound) : false;
      payloadObject.adId = typeof d?.adId === 'object' && JSON.parse(d?.adId) || null;
      payloadObject.correlationID = d?.correlation_id || null;
      payloadObject.explain = d?.explanations?.[0] || null;
      payloadData.push(payloadObject);
    });
    payload.data = payloadData;
     const playlistArr = playlists.map((playlist) => ({name: playlist?.name, id: playlist?.id}));
    payload.playlists = playlistArr;
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

function transformError(data) {
  return data;
}

async function getPlaylistDetailsApi({playlistid, firstApiCall, creatorId=null}) {
    const guestToken = getItem('guest-token');
    let response = {};
    try {
      const apiPath = `${getApiBasePath('playlist')}/shorts/profile/playlist?${creatorId ? `creatorid=${creatorId}` : ``}${playlistid ? creatorId ? `&playlistid=${playlistid}` : `playlistid=${playlistid}` : ``}`;
      response = await get(apiPath, null, {
          'accept': 'application/json',
          'guest-token': guestToken,
      });
      response.data.firstApiCall = firstApiCall;
      console.log('resp-video',response)
      firstTimeCall = false;
      return Promise.resolve(response);
    } catch (err) {
      console.error("playlist api issue",err);
      return Promise.reject(err);
    }
}

const [getPlaylistDetails, clearPlayDetails] = apiMiddleWare(getPlaylistDetailsApi, transformSuccess, transformError);

export {getPlaylistDetails, clearPlayDetails};
