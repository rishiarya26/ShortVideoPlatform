import { inject } from "../analytics/async-script-loader";
import { localStorage } from "../utils/storage";

let initiated = false;

export const init = async() => {

//    initGetSocial();
//    setTimeout(()=>{ 
    //    if(initiated){
    

    // console.log('r',r)
    try{
        localStorage.set('get-social','pending');
        // const guestGetSocialToken = localStorage?.get('guest-get-social');
        console.log("user *********** CALLED **********")
        GetSocialSDK?.GetSocial?.init({
            appId: 'YInJ8G70y098',
            appName: 'Hipi'
        }) 
    let tokens = localStorage.get('tokens');
    if (tokens && tokens?.shortsAuthToken && tokens?.accessToken && tokens?.getSocialToken) {
        auth();
    }else{
        asGuest();
    }
    }catch(e){
       console.log('user no tokens present during getSocial Auth',e);
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
       console.error('errorrrr getSocail',e);
    });
  }
  catch(e){
      console.error('error in getting getsocial token form localstorage',e)
  }
}

export const asGuest = (identityType='my_app')=>{
    console.log("user **")
    try{
    // const tokens = localStorage?.get('tokens');
    // const getSocialToken = tokens?.getSocialToken;
    const guestGetSocialToken = localStorage?.get('guest-get-social');
    console.log('user token',guestGetSocialToken)
    const params = {
        "identity_type": 'anonymous',
        "token" : guestGetSocialToken
        // "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyaXNoaTAxIiwiZXhwIjoxNjY4NTkxNDkxNzMxLCJpYXQiOjE2NjMzMjEwOTF9.Umoip73O2imhhr_IQlOmgNbzkcvDI5rPlFgE8M0ZUSM',
    };
    GetSocialSDK.Auth.authenticate(params)
    .then((response) => {
        console.log("user auth getsocial success",response)
        localStorage.set('get-social','success');
    })
    .catch((e)=>{
       console.error('user errorrrr guest getScoial',e);
    });
  }
  catch(e){
      console.error('error in getting getsocial token form localstorage in guest ',e)
  }
}

// const addIdentity = ()=>{
//     try{
//         const tokens = localStorage?.get('tokens');
//         const getSocialToken = tokens?.getSocialToken;

//     const user = GetSocialSDK.GetSocial.getCurrentUser();
//     const identity = GetSocialSDK.Identity.createTrustedIdentity('my_auth_method', getSocialToken);

//     user.addIdentity(identity)
//     .then(() => console.log('identity added for signup user'))
//     .catch((error) => {
//     // Make sure to take the first error if there are multiple ones (unlikely)
//     // if (Array?.isArray(error)) {
//     //   error = error?.pop();
//     // }
 
//     if (error instanceof GetSocialSDK.ConflictUser) {
//       console.error(`Conflict User: ${error?.displayName}`);
//     } else {
//       console.error(error);
//     }
//   });
// }catch(e){
//     console.error('issue in mapping identittes in getSocial after signup')
// }
// }

// const retry = ()=>{

// }

export const getActivityDetails = async(id)=> {
    let response;
    try{
      response = await GetSocialSDK.Communities.getActivity(id)
    //   console.log('response-activity',response);
    }catch(e){
      
    //     setTimeout(async()=>{
    //         console.log('GETSOCIAL',window)
    //         if(window?.GetSocialSDK){
    //             response = await GetSocialSDK.Communities.getActivity(id) 
    //         }else{
    //             init();
    //             response = await GetSocialSDK.Communities.getActivity(id) 
    //         }
    //     },1000)
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
    // return response
}

export const deleteReaction = (reaction,id) =>{
   let response;
    try{ 
        response = GetSocialSDK.Communities.removeReaction(reaction,id);
        // console.log("liked&&",response)
    }
    catch(e){
        init()
       console.log('error-delete-like',e);
    }
}

// export const isFollowing = (user1, user2) =>{
//     const userIds = GetSocialSDK.UserIdList.create([user1, user2]);
//     const followQuery = GetSocialSDK.FollowQuery.users(userIds);
//     GetSocialSDK.Communities.isFollowing(UserId.currentUser(), followQuery)
//     .then((result) => {
//         var user2Followed = result['user2'];
//         console.log('Current user is following user "user2": ' + user2Followed);
//     }, (error) => {
//         console.log('Failed to check followers of users, error: ' + error.message);
//     });
// }
