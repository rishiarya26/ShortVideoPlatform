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
          total: 1,
          page: 1
        },
        data: {
          user_id: data.id,
          user_handle: data.userHandle,
          username: data.userName,
          profile_pic: data.userIcon,
          first_name: data.firstName,
          last_name: data.lastName,
          likes: data.likes,
          dob: data.dateOfBirth,
          pristine_image: data.pristine_image,
          bio: data.bio,
          social_id: data.getSocialId,
          followers: data.followers,
          following: data.following,
          profile_type: data.profileType,
          is_star: data.hipiStar,
          total_views: data.totalViews,
          settings: data.settings,
          is_following: data.isFollowing,
          follow_request: data.followRequest

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
