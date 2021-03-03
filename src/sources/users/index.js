import { get, post, put } from 'network';
import { baseURL } from '../../api-base';
import { apiMiddleWare } from '../../utils/app';

// TODO add transforms per call
function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

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

const shouldCache = false;

const [srSendOtp] = apiMiddleWare(sendOtp, transformSuccess, transformError, shouldCache);
const [srVerifyOtpPassword] = apiMiddleWare(verifyOtpPassword, transformSuccess, transformError, shouldCache);
const [srForgotPassword] = apiMiddleWare(forgotPassword, transformSuccess, transformError, shouldCache);
const [srUpdateProfile] = apiMiddleWare(updateProfile, transformSuccess, transformError, shouldCache);
const [srReportProfile] = apiMiddleWare(reportProfile, transformSuccess, transformError, shouldCache);

export {
  srSendOtp,
  srVerifyOtpPassword,
  srForgotPassword,
  srUpdateProfile,
  srReportProfile
};
