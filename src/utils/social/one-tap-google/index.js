import { track } from "../../../analytics";
import { commonEvents } from "../../../analytics/mixpanel/events";
import { GOOGLE_CLIENT_ID_PREROD } from "../../../constants";
import { login } from "../../../sources/social/google/login-one-tap"
import { register } from "../../../sources/social/google/register-one-tap";
import * as fbq from '../../../analytics/fb-pixel'
import { verifyUserOnly } from "../../../sources/auth/verify-user";

//pass token as response.credential
// response {} with name and email
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
 var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
 }).join(''));

 return JSON.parse(jsonPayload);
};

const mixpanel = (type) =>{
  const mixpanelEvents = commonEvents();
  mixpanelEvents['Method'] = 'Google';
  track(`${type} Result`,mixpanelEvents );
}

const registerUser = async(token) =>{
  try{
    const resp = await register({token: token});
    if(resp.status === 'success'){
      mixpanel('Login')
    }
  }
  catch(error){
     console.log(error)
  }
}

const getToken = async(response)=>{
  console.log("google-one-tap-resp", response);
  // const data = parseJwt(response?.credential);
  // try {
  //   const verifyResponse = verifyUserOnly({type:"email", email: data?.email})
  //   if(verifyResponse?.data?.code === 0) {
  //     const resp = await login({googleToken, type: "oneTap"});
  //     console.log("resp*",resp)
  //     if(resp.status === 'success'){
  //       console.log("GOOGLE",resp)
  //       try{ 
  //         mixpanel('Login');
  //         fbq.defEvent('CompleteRegistration');
  //       }catch(e){
  //       console.log('error in fb or mixpanel event');
  //       }
  //     }
  //   } else if(verifyResponse?.data.code === 1) {
  //       const response = await registerUser(data?.tokenId);
  //       if(device === "desktop") {
  //         await delay();
  //         toggleFlow("userHandle")
  //       } else {
  //         close();
  //         router.push("/createUsername");
  //       }
  //   }
  // } catch(e) {
  //   console.log('google one tap error', e);
  // }
 try {
  const googleToken = response?.credential;
  const resp = await login({googleToken, type: "oneTap"});
  console.log("resp*",resp)
  if(resp.status === 'success'){
    console.log("GOOGLE",resp)
   try{ 
    mixpanel('Login');
    fbq.defEvent('CompleteRegistration');
   }catch(e){
   console.log('error in fb or mixpanel event');
   }
  }
 } catch (error) {
   if(error.code === 2){  
    console.log("one tap - register user")
     await registerUser(response?.credential);
   }
   console.log(error)
 }
}

export const oneTapGoogle = () =>{
  try{
     google.accounts.id.initialize({
         //TO-DO clinet_id will come from env
        client_id: GOOGLE_CLIENT_ID_PREROD,
        // client_id : '1026747734321-0fobt02rbhi5j36kk6ft8el2k0tev9af.apps.googleusercontent.com',
        callback: getToken
    })

     google.accounts.id.prompt(notification =>{
        console.log('on prompt', notification)
    })
  }catch(e){
    console.log("one-tap-error",e)
  }
}
