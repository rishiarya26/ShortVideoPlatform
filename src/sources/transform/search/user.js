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
          page: data.page,
          page_size: data.pageSize
        },
        data: {
          id: data.id,
          user_id: data.userId,
          profile_pic: data.userIcon,
          user_handle: data.userHandle,
          first_name: data.firstName,
          last_name: data.lastName,
          pristine_image: data.pristine_image,
          followers: data.followers,
          is_star: data.hipiStar

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
