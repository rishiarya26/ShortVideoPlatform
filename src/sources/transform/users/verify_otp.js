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
        },
        data: {

        }
      };
    }
    return message;
  } catch (err) {
    transformError(data);
    return message;
  }
}
export default { transformSuccess, transformError };
