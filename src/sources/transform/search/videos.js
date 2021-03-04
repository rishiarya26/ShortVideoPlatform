/* eslint-disable no-console */

function transformError(data) {
  let message = {};
  if (data.code === 2) {
    message = {
      status: 404,
      message: data.message
    };
  }
  return message;
}

function transformSuccess(data) {
  let message = {};
  try {
    if (data.code === 0) {
      message = {
        status: 200,
        message: data.message || 'default',
        meta: {
          total: data.totalPages,
          page: data.currentPage,
          page_size: data.pageSize
        },
        data: {
          id: data.musicId,
          music_icon: data.musicIcon,
          akamai_url: data.akamaiUrl,
          description: data.description,
          like_count: data.likeCount,
          duration: data.videoDuration,
          created_on: data.createdOn,
          updated_on: data.updatedOn,
          thumbnail: data.thumbnailDynamic,
          viewCount: data.viewCount,
          status: data.status,
          title: data.videoTitle,
          created_timeStamp: data.createdTimeStamp,
          hashtags: data.hashtags,
          hashtags_data: data.hashtagsData,
          videoOwners: data.videoOwners,
          video_owners_data: data.videoOwnersData,
          metas: data.metas,
          video_url: data.videoUrl,
          downloadUrl: data.downloadUrl,
          akamaiStatus: data.akamaiStatus,
          video_thumbnail: data.videoThumbnail,
          agency: data.agency,
          allow_sharing: data.allowSharing,
          allowDuet: data.allowDuet,
          social_id: data.getSocialId,
          allow_comments: data.allowComments,
          allow_like_dislike: data.allowLikeDislike,
          downloadable: data.downloadable,
          privacy_settings: data.privacySettings,
          allow_react: data.allowReact,
          upload_id: data.uploadId,
          sound_id: data.soundId,
          promotional: data.promotional,
          hipi_exclusive: data.hipiExclusive,
          hipi_spotLight: data.hipiSpotLight,
          silent: data.silent,
          draft: data.draft,
          s3Url: data.s3Url

        }
      };
    }
    return message;
  } catch (err) {
    transformError(data);
    return message;
  }
}

export default transformSuccess;
