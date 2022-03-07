import { inject } from "../analytics/async-script-loader";
import { localStorage } from "../utils/storage";

let initiated = false;

export const init = async() => {
    console.log("*********** CALLED **********")
//    initGetSocial();
//    setTimeout(()=>{ 
    //    if(initiated){
    
    GetSocialSDK?.GetSocial?.init({
        appId: 'YInJ8G70y098',
        appName: 'Hipi'
    }) 
    // console.log('r',r)
    try{
    let tokens = localStorage.get('tokens');
    if (tokens && tokens?.shortsAuthToken && tokens?.accessToken && tokens?.getSocialToken) {
        auth();
    }
    }catch(e){
       console.log('no tokens present during getSocial Auth')
    }    
        // setTimeout(()=>{
        //     getActivityDetails('661518306464375287');
        // },2000)
    //   } else{
    //       console.log("in else")
    //   }

//    },[500]);
};

export const auth = (identityType='my_app')=>{
    try{
    const tokens = localStorage?.get('tokens');
    const getSocialToken = tokens?.getSocialToken;
    // console.log('user',userId)
    const params = {
        "identity_type": 'my_auth_method',
        "token": getSocialToken,
    };
    GetSocialSDK.Auth.authenticate(params)
    .then((response) => {
        localStorage.set('get-social','success');
    })
    .catch((e)=>{
       console.log('error',e);
    });
  }
  catch(e){
      console.log('error in getting getsocial token form localstorage')
  }
}

export const getActivityDetails = async(id)=> {
    let response;
    try{
      response = await GetSocialSDK.Communities.getActivity(id)
    //   console.log('response-activity',response);
    }catch(e){
        // init()
      console.log('error-get-activity',e)
    }
    return response;
}

export const postReaction = async(reaction,id) =>{
    let response;
  try{  
    response = await GetSocialSDK.Communities.addReaction(reaction,id);
    }
   catch(e){
    init()
       console.log('error-post-like',e);
    }
}

export const deleteReaction = (reaction,id) =>{
   let response;
    try{ 
        response = GetSocialSDK.Communities.removeReaction(reaction,id);
    }
    catch(e){
        init()
       console.log('error-delete-like',e);
    }
}
