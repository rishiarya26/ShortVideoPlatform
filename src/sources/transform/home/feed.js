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
          total: data.total,
          page: data.page
        },
        data: {
          id: data.id,
          data_id: data.data_id,
          content_id: data.content_id,
          video_url: data.video_url,
          description: data.content_description,
          music_title: data.music_title,
          musicCoverTitle: data.musicCoverTitle,
          user_id: data.userId,
          video_owner_id: data.videoOwnersId,
          social_id: data.getSocialId,
          genre: data.genre,
          type: data.type,
          video_type: data.video_type,
          is_tagged: data.tagged_video,
          profile_img_url: data.userProfilePicUrl,
          username: data.userName,
          likes_count: data.likesCount,
          comments_count: data.commentsCount,
          content_warning: data.contentWarning

        }
      };
    }
    return message;
  } catch (err) {
    transformError(data);
    return message;
  }
}

export { transformSuccess, transformError };
