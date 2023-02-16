import { post } from 'network';
import { initClevertapUser } from '../../analytics/clevertap';
import { getApiBasePath } from '../../config';
import { init } from '../../get-social';
/* eslint-disable import/no-cycle */
import { apiMiddleWare } from '../../network/utils';
import { localStorage } from '../../utils/storage';
import { getUserId } from '../../utils/user';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';
import { updateUserProfile } from '../users';
import { getUserProfile } from '../users/profile';

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const checkLanguageSelection = async(userId) =>{
  const languageCodes = localStorage.get('lang-codes-selected')?.lang || null;
  console.log('inside - before profile call to get user detials',userId)
  try{
    const userProfileDetails = await getUserProfile(userId);
    console.log("inside - after profile call got user details",userProfileDetails)
    userProfileDetails?.data && localStorage.set('user-details',userProfileDetails?.data);
    // localStorage.set('lang-24-hr','true');
    if(languageCodes){
      updateLanguageOnLogin(userProfileDetails?.data);
    }else{
      if(userProfileDetails?.data?.languages !== null){
        const languageCodes = userProfileDetails?.data?.languages?.reduce((acc,data)=>{
          acc.push(data?.code)
          return acc;       
         },[]);
        localStorage.set('lang-codes-selected',{lang: languageCodes, type : 'profile'});  
      }
    }
    console.log("UA",userProfileDetails)
  }catch(e){
    console.error("extracting user-details issue after login",e)
  }
}

const updateLanguageOnLogin = async(data) =>{
  const languageCodes = localStorage.get('lang-codes-selected')?.lang || null;
  let response;
  const payload = {
    id: data?.id,
    profilePic: data?.profilePic,
    firstName: data?.firstName,
    lastName: data?.lastName,
    dateOfBirth: data?.dateOfBirth,
    userHandle: data?.userHandle,
    onboarding: null,
    profileType: null,
    bio: data?.bio,
    languages:languageCodes
  };
  try {
    response = await updateUserProfile(payload);
    if (response.status === 'success') {
      console.log('insdie - languages updated successfully edit profile after login/signup');
    }
  } catch (e) {
    console.error('inside - languages updation failed',e);
    // showSnackbar({ message: 'Something went wrong' });
  }
}

const login = async ({ accessToken, refreshToken='', signupData=null, email="NA", mobile="NA", isSignup=false }) => {
  console.log("Response",accessToken,refreshToken)
  let response = {};
  // const url = window.location.href;
  // let domain = (new URL(url));
  // domain = domain.hostname;
  // console.log(domain);
  try {
    // TO-DO segregate doamin fetcing code
    const url = window?.location?.href;
    let domain = (new URL(url));
    domain = domain?.hostname;
    console.log("cookie set domain",domain);
    const urlencoded = new URLSearchParams();
    urlencoded.append('zee5Token', accessToken);
    if(signupData){
      urlencoded.append('lastName', signupData?.lastName);
      urlencoded.append('firstName', signupData?.firstName);
      urlencoded.append('gender', signupData?.gender);
      urlencoded.append('dateOfBirth',signupData?.birthday);
    }
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/login`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded',
      'guest-token': getUserId(),
    });
    const tokens = {
      shortsAuthToken: response?.data?.shortsAuthToken,
      accessToken,
      refreshToken,
      getSocialToken: response?.data?.getSocialToken || "NA"
    };
    // setItem('tokens', JSON.stringify(tokens), { path: '/', domain });
    localStorage.set('tokens',tokens);
    console.log("LOGIN__",response)
    const userId = response?.data?.userDetails?.id;  
     
    /* languages selected check */
    if(signupData || isSignup){
      sessionStorage.setItem("signup", true);
      await delay();
      checkLanguageSelection(userId);
      // const userDetails = response.data.userDetails;
      // localStorage.set("user-details", userDetails);
      // localStorage.set('lang-codes-selected',{lang: ["en", "hi"], type : 'profile'});
    }else{
      checkLanguageSelection(userId);
    }
    /* ************************ */

    // const userDetails = response?.data?.userDetails;
    localStorage.set('user-id', userId);
    // localStorage.set('user-details',userDetails);
   
    setTimeout(()=>{
      init();
      initClevertapUser({email, mobile});
    },200)
    // setItem('user-id', JSON.stringify(userId), { path: '/', domain });
    response.data.accessToken = accessToken;
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    console.log("hipi login err", err);
    return Promise.reject(err);
  }
};

const [hipiLogin, clearHipiLogin] = apiMiddleWare(login, transformSuccess, transformError);

export { hipiLogin, clearHipiLogin };
