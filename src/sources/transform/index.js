export const transformModel = {
  payload: {
    status: '',
    message: '',
    meta: {},
    data: {},
    requestedWith: {}
  }
};

const defaultMessage = 'something went wrong';
export const getMessage = (resp = {}, msgMap = {}) => (resp.message || msgMap[resp.status] || resp.appError || defaultMessage);
