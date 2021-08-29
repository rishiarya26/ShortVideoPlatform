/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import { get, post, put } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
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
async function updateProfile({
  id = null, profilePic, firstName, lastName = '', dateOfBirth, userHandle, onboarding, profileType, bio
}) {
  let response = {};
  try {
    let tokens = getItem('tokens');
    tokens = tokens && JSON.parse(tokens);
    const { shortsAuthToken = '' } = tokens;
    const { accessToken = '' } = tokens;
    const payload = {
      id,
      profilePic,
      firstName,
      lastName,
      dateOfBirth,
      userHandle,
      onboarding: null,
      profileType: null,
      bio
    };
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile`;
    /* eslint-disable no-restricted-syntax */
    const formData = new FormData();
    console.log(formData);

    formData.append('request', '{"id":"f999f4de-5c13-4b9f-8467-dfc417548169", "profilePic":null, "firstName":"Rishi", "lastName":"arya", "dateOfBirth":"10/11/2020", "userHandle":"rishi_arya", "onboarding":null, "profileType":null, "bio":"awesome"}');
    for (const p of formData.entries()) {
      console.log(`${p[0]}, ${p[1]}`);
    }
    console.log(formData);
    response = await put(apiPath, formData, {
      Authorization: `Bearer ${shortsAuthToken}`,
      'content-type': 'multipart/form-data',
      'access-token': accessToken
    });
    console.log('Update-Profile', response);
    response.data.requestedWith = { payload };
    return Promise.resolve(response);
  } catch (err) {
    console.log('Update-Profile-catch', err);
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
const [updateUserProfile] = apiMiddleWare(updateProfile, transformSuccess, transformError, { requiresAuth: true });
const [srReportProfile] = apiMiddleWare(reportProfile, transformSuccess, transformError);

export {
  postComment,
  postLike,
  getComments,
  srSendOtp,
  srVerifyOtpPassword,
  srForgotPassword,
  updateUserProfile,
  srReportProfile
};
