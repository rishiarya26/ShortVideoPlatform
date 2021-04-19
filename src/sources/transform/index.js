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

export const isSuccess = resp => {
  const { data = {} } = resp;
  let apiStatus = true;
  const httpStatus = (resp['http-status'] > 199 && resp['http-status'] < 300);
  if (data.statusCode) {
    apiStatus = (data.statusCode > 199 && data.statusCode < 300);
  }
  return httpStatus && apiStatus;
};

