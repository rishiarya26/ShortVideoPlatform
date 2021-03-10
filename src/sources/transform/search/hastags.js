/* eslint-disable no-console */

export function transformError(data) {
  let message = {};
  if (data.code === 2) {
    message = {
      status: 404,
      message: data.message
    };
  }
  return message;
}

export function transformSuccess(data) {
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
          id: data.id,
          hashtag: data.hashtag,
          profile_pic: data.hashtagLikeCount,
          user_handle: data.hashtagPlayCount,
          hashtag_id: data.hashtagId,
          hashtag_thumbnail: data.hashtagThumbnail,
          pristine_image: data.pristine_image

        }
      };
    }
    return message;
  } catch (err) {
    transformError(data);
    return message;
  }
}
