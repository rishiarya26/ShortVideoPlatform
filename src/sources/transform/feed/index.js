import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE, INDEX_TO_SHOW_LANG, INDEX_TO_SHOW_LANG_IPHONE } from '../../../constants';
import { getNetworkConnection } from '../../../utils/device-details';
import { localStorage } from '../../../utils/storage';
import { isObjectEmpty } from '../../../network/utils';
import { getItem } from '../../../utils/cookie';

const msgMap = {
  200: 'ok'
};

function transformError(error = {}) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload['http-status'] = error['http-status'] || DEFAULT_ERROR_CODE;
  payload.errorCode = data.statusCode || error['http-status'] || DEFAULT_ERROR_CODE;
  return payload;
}

function transformSuccess(resp) {

  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    if(data.loadFeed){
      payload.status = 'success';
    }else{
      payload.status = 'notFound'
    }

    const device = getItem('device-type');
    const deviceType = getItem('device-info');
    const indexToShowLang = {
      android : INDEX_TO_SHOW_LANG,
      ios : INDEX_TO_SHOW_LANG
    }
   
    payload['http-status'] = resp['http-status'];
    payload.message = getMessage(data, msgMap);

    // COMMENTED - for production feed api
    const networkConnection = getNetworkConnection();
    const { responseData = {} } = data;
    const { videos = [] } = responseData;
    const payloadData = [];
    // for(let i=1;i<=videos.length;i++){
    //   payloadObject.watchId = ((data.requestedWith.offset * data.requestedWith.offset+1) + z);
    // }
    videos?.forEach((d,z) => {
      const payloadObject = {};
      //   if(data.requestedWith.offset >=1){
      //     payloadObject.watchId = ((6 * (data.requestedWith.offset)) + z);
      // }else{
      //     payloadObject.watchId = z;
      // }
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
      payloadObject.adId = d?.adId && typeof d?.adId === 'string' && JSON.parse(d?.adId) || null;
      // payloadObject.vmaxAd = d?.vmaxAd || null;
      // payloadObject.feedVmaxAd = d?.feedVmaxAd || null;
      payloadObject.correlationID = d?.correlation_id || null;
      payloadObject.explain = d?.explanations?.[0] || null;
      payloadObject.playlistId = d?.playlists?.[0]?.id || null;
      payloadObject.playlistName = d?.playlists?.[0]?.name || null;
    //  z === 2 && (payloadObject.videoSound =false)
      
      payloadData.push(payloadObject);
    });
    console.log("FV",data)
    if(data?.loadFeed && data?.firstVideo){
      // data.firstVideo.video_url = data?.firstVideo?.video_urls[networkConnection];
      payloadData?.splice(0,0,data?.firstVideo);
    }

    // putting this upside to make sure the add should not get replaced by language slide
    if(!isObjectEmpty(data?.vmaxAdVideo) && data?.vmaxVideoIndex){      
      // delete data?.vmaxAdVideo?.adId; //Need to remove this
      payloadData?.splice(data?.vmaxVideoIndex,0,data?.vmaxAdVideo);
    }

    if(device === 'mobile' && deviceType === 'ios'){
      try{
      const languagesSelected = localStorage.get('lang-codes-selected')?.lang || null;
      const lang24ShowOnce = localStorage.get('lang-24-hr');

      if(!languagesSelected && data?.firstApiCall && lang24ShowOnce === 'false'){
      payloadData?.splice(indexToShowLang?.[deviceType],0,{'data':'languageSlide'})
      }}catch(e){
        console.error('issue in lang-select slide adding in transform')
      }
    }

 
    /*for stagging api */
    // const { response = [] } = data;
    // const tResponse = [...response];
    // tResponse.forEach(data => {
    //   data.saveLook = false;
    // });
    // payload.data = tResponse;
 
    payload.data = payloadData;
    console.log(payload.data,"payload.data")
    // payload.requestedWith = data.requestedWith;
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
