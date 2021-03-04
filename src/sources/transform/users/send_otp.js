/* eslint-disable no-console */
const transform = {

  success: data => {
    let message = {};
    try {
      if (data.code === 0) {
        message = {
          status: 200,
          message: data.message
        };
      }
      return message;
    } catch (err) {
      transform.error(data);
    }
    return message;
  },
  error: data => {
    let message = {};
    if (data.code === 2) {
      message = {
        status: 404,
        message: data.message
      };
    }
    return message;
  }

};

export default transform;
