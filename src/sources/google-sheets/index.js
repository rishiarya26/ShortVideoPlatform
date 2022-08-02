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
    const apiPath = `https://sheet.best/api/sheets/5d6b89fb-e584-4041-b82d-6f477d29b00b`;
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
    const apiPath = `https://sheet.best/api/sheets/cf9f504c-df62-4fd3-9cfc-873daa27c4d6`;
    response = await post(apiPath,payload,{'content-type':'json'});
    console.log('resp**',response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { postCreatorData, postStunnerData };
