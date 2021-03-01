import { get, post, put } from 'network';
import promiseMemoize from 'promise-memoize';
import { baseURL } from '../../api-base';

async function sendOtp({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/sendOtp`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function verifyOtpPassword({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/verifyOtp`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function forgotPassword({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/forgotPassword`;
    response = await post(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
async function updateProfile({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/profile`;
    response = await put(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function reportProfile({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/report`;
    response = await post(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const requestOtp = promiseMemoize(sendOtp, { resolve: 'json' });
const verifyOtp = promiseMemoize(verifyOtpPassword, { resolve: 'json' });
const resetPassword = promiseMemoize(forgotPassword, { resolve: 'json' });
const profileUpdate = promiseMemoize(updateProfile, { resolve: 'json' });
const reportUser = promiseMemoize(reportProfile, { resolve: 'json' });
export {
  resetPassword, profileUpdate, requestOtp, verifyOtp, reportUser
};
