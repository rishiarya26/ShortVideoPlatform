/* eslint-disable max-len */

import { STATIC_PAGE_CREATOR_KEY } from "../../constants";
import { post } from "../../network";

async function postCreatorData({name,hipiHandle,instaHandle,mobile,email,genre}) {
  let payload = {
      name,
      genre,
      hipiHandle,
      instaHandle,
      mobile,
      email
  }  
  let response = {};
  try {
    const apiPath = `https://mapi.charmboard.com/v3.6/user/paidCreator`;
    response = await post(apiPath,payload,{'content-type':'application/json','webkey': STATIC_PAGE_CREATOR_KEY});
    console.log('resp**',response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function postBusinessData({name, mobile, email, company, website, message}) {
  let payload = {
      name,
      mobile,
      email,
      company,
      website,
      message
  }  
  let response = {};
  try {
    const apiPath = `https://mapi.charmboard.com/v3.6/business/contact`;
    response = await post(apiPath,payload,{'content-type':'application/json','webkey': STATIC_PAGE_CREATOR_KEY});
    console.log('resp**',response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}


async function postStunnerData({name,ques,mobile,email}) {
  let payload = {
      name,
      question: ques,
      mobile,
      email
  }  
  let response = {};
  try {
    const apiPath = `https://mapi.charmboard.com/v3.6/user/hipiStunner`;
    response = await post(apiPath,payload,{'content-type':'application/json','webkey': STATIC_PAGE_CREATOR_KEY});
    console.log('resp**',response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
export { postCreatorData, postStunnerData, postBusinessData};
