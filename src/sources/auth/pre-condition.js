/* eslint-disable import/no-cycle */
import { renewTokens } from './renew-tokens';

const reAuthenticate = async (dataFetcher, params) => {
  console.log('called from reauth')
  let response = {};
  let resp = {};
  try {
    response = await renewTokens();
    if (response.data.status === 200) {
      resp = await dataFetcher(params);
    }
  } catch (error) {
    console.log('error in reAuth');
    return error;
  }
  return resp;
};

const preCondition = async (dataFetcher, params) => {
  let resp = {};
  try {
    console.log('called from precondition ', dataFetcher);
    resp = await dataFetcher(params);
  } catch (error) {
    if (error?.statusCode === 401) {
      const response = await reAuthenticate(dataFetcher, params);
      return response;
    }
  }
  return resp;
};

export default preCondition;
