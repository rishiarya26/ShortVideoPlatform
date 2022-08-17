/* eslint-disable max-len */

import { post } from "../../network";

async function postCreatorData({name,hipiHandle,instaHandle,mobile,email,genre}) {
  let payload = {
      Name:name,
      Genre:genre,
      'Hipi Handle':hipiHandle,
      'Insta Handle':instaHandle,
      Mobile:mobile,
      Email:email
  }  
  let response = {};
  try {
    const apiPath = `https://sheet.best/api/sheets/55998b34-0575-450d-8ffa-731901d6264e`;
    response = await post(apiPath,payload,{'content-type':'json'});
    console.log('resp**',response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function postStunnerData({name,ques,mobile,email}) {
  let payload = {
      Name:name,
      Question: ques,
      Mobile:mobile,
      Email:email
  }  
  let response = {};
  try {
    const apiPath = `https://sheet.best/api/sheets/94931255-c62e-4781-b95d-8e3d61d85ac2`;
    response = await post(apiPath,payload,{'content-type':'json'});
    console.log('resp**',response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { postCreatorData, postStunnerData };
