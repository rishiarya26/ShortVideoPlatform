// import { renewTokens } from './renew-tokens';

async function reAuthenticate(dataFetcher, params) {
  const response = {};
  const resp = {};
  try {
    console.log('error in reAuth');
    // response = await renewTokens();
    // if (response.data.status === 200) {
    //   resp = await dataFetcher(params);
    // }
  } catch (error) {
    console.log('error in reAuth');
    return error;
  }
  return resp;
}

// const preCondition = async (dataFetcher, params) => {
//   let resp = {};
//   try {
//     resp = await dataFetcher(params);
//   } catch (error) {
//     if (error?.statusCode === 401) {
//       const response = await reAuthenticate(dataFetcher, params);
//       return response;
//     }
//   }
//   return resp;
// };

export default reAuthenticate;
