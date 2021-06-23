import { get, post, put } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/users/send-otp';

async function sendOtp({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/sendOtp`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function verifyOtpPassword({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/verifyOtp`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function forgotPassword({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/forgotPassword`;
    response = await post(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
async function updateProfile(payload) {
  let response = {};
  try {
    // const resp = await preCondition();
    // const { data = {} } = resp;
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile`;
    response = await put(apiPath, payload);
    //   , payload, {
    //   'Content-Type': 'multipart/form-data',
    //   Authorization: `Bearer ${data.authToken}`,
    //   'access-token': data.accessToken
    // });
    response.data.requestedWith = { payload };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function reportProfile({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/report`;
    response = await post(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function postComment() {
  console.log('commented');
}

async function postLike() {
  console.log('liked');
}

async function getComments() {
  return [{
    comment: 'this is a comment',
    user: 'ankit',
    time: '2 hrs ago',
    likes: 45
  }, {
    comment: 'this is a fancy comment',
    user: 'cristibin',
    time: '2 days ago',
    likes: 145
  }, {
    comment: 'this is another fancy comment',
    user: 'hariom',
    time: '1 min ago',
    likes: 2
  }];
}

const [srSendOtp] = apiMiddleWare(sendOtp, transformSuccess, transformError);
const [srVerifyOtpPassword] = apiMiddleWare(verifyOtpPassword, transformSuccess, transformError);
const [srForgotPassword] = apiMiddleWare(forgotPassword, transformSuccess, transformError);
const [srUpdateProfile] = apiMiddleWare(updateProfile, transformSuccess, transformError);
const [srReportProfile] = apiMiddleWare(reportProfile, transformSuccess, transformError);

export {
  postComment,
  postLike,
  getComments,
  srSendOtp,
  srVerifyOtpPassword,
  srForgotPassword,
  srUpdateProfile,
  srReportProfile
};
