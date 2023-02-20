import { track } from "../../../analytics";
import { commonEvents } from "../../../analytics/mixpanel/events";
import { GOOGLE_CLIENT_ID_PREROD } from "../../../constants";
import { login } from "../../../sources/social/google/login-one-tap"
import { register } from "../../../sources/social/google/register-one-tap";
import * as fbq from '../../../analytics/fb-pixel'
import { verifyUserOnly } from "../../../sources/auth/verify-user";
import { snackbarInline } from "../../../hooks/use-snackbar";
import dynamic from "next/dynamic";
import { getItem } from "../../cookie";

const loginComp = dynamic(
  () => import('../../../components/auth-options'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

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


const getToken = async(response, open, close, router)=>{
  console.log("google-one-tap-resp", response);
  const data = parseJwt(response?.credential);
  const device = getItem('device-type');
  try {
    const verifyResponse = await verifyUserOnly({type:"email", email: data?.email})
    // if(verifyResponse?.data?.code === 0) {
      const resp = await login({googleToken: response?.credential, type: "oneTap"});
    //   console.log("resp*",resp)
    //   if(resp.status === 'success'){
    //     console.log("GOOGLE",resp)
    //     try{ 
    //       mixpanel('Login');
    //       fbq.defEvent('CompleteRegistration');
    //     }catch(e){
    //     console.log('error in fb or mixpanel event');
    //     }
    //   }
    // } else if(verifyResponse?.data?.code === 1) {
    //     const resp = await registerUser(response?.credential);
    //     if(resp.status === 'success') {
    //       if(device === "desktop") {
    //         await delay();
    //         open('', loginComp, 'big',{showMessage: snackbarInline, auth_method: "login", _flow: "userHandle"});
    //       } else {
    //         close();
    //         router.push("/createUsername");
    //       }
    //     }
    // }
    sessionStorage.setItem(
      "googleRegistrationData",
      JSON.stringify({
        name: data?.name || null,
        email: data?.email || null,
      })
    );
    if(device === "desktop") {
      await delay();
      open('', loginComp, 'big',{showMessage: snackbarInline, auth_method: "login", _flow: "registration"});
    } else {
      close();
      router.push("/registration");
    }   
  } catch(e) {
    console.log('google one tap error', e);
  }
}

export const oneTapGoogle = ({open, close, router}) =>{
  try{
     google.accounts.id.initialize({
         //TO-DO clinet_id will come from env
        client_id: GOOGLE_CLIENT_ID_PREROD,
        // client_id : '1026747734321-0fobt02rbhi5j36kk6ft8el2k0tev9af.apps.googleusercontent.com',
        callback: (res) => getToken(res, open, close, router)
    })

     google.accounts.id.prompt(notification =>{
        console.log('on prompt', notification)
    })
  }catch(e){
    console.log("one-tap-error",e)
  }
}
