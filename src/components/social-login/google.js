import { useEffect } from "react";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import Google from "../commons/svgicons/google";
import { GOOGLE_CLIENT_ID_PREROD } from "../../constants";
import { login } from "../../sources/social/google/login-one-tap"
import { register } from "../../sources/social/google/register-one-tap";
import {GoogleLogin} from "react-google-login"
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import * as fbq from '../../analytics/fb-pixel'
import { getItem, removeItem } from "../../utils/cookie";
import { toTrackClevertap } from "../../analytics/clevertap/events";
import { verifyUserOnly } from "../../sources/auth/verify-user";
import { useRouter } from "next/router";

export const GoogleButton =({loading, type,pageName, tabName=null, toggleFlow}) =>{
    const {close} = useDrawer();
    const { showSnackbar } = useSnackbar();
    const device = getItem('device-type');
    const router = useRouter();

    const onTokenFetched = async(data)=>{
      toTrackMixpanel('popupCta',{pageName:pageName, tabName:(tabName && tabName) || ''}, {name:type,ctaName:'Google',elemant:'Google'})
      toTrackClevertap('popupCta',{pageName:pageName, tabName:(tabName && tabName) || ''},{name:type,ctaName:'Google',elemant:'Google'})
        console.log("google api resp",data, data?.tokenId);
        // const allCookies = Cookies.getAll();
        const arrSplit = document?.cookie?.split(";");
  
        for(let i = 0; i < arrSplit?.length; i++)
        {
            const cookie = arrSplit?.[i]?.trim();
            const cookieName = cookie?.split("=")[0];
        
            // If the prefix of the cookie's name matches the one specified, remove it
            if(cookieName?.indexOf("_gs_auth_") === 0) {
               console.log("COOKIE",cookieName)
                // Remove the cookie
                cookieName && 
                removeItem(cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT");
                // document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }
         try{  
             toTrackMixpanel(`${type || ''}Initiated`,{pageName:pageName, tabName:(tabName && tabName) || '',method: 'google'})
             const verifyResponse = await verifyUserOnly({type:"email", email: data?.profileObj?.email})
             if(verifyResponse?.data?.code === 0) {
               const response = await login({googleToken: data?.tokenId});
               if(response.status === 'success') {
                showSnackbar({ message: 'Login Successful' })
                 close();
                 try{
                  toTrackMixpanel(`${type || ''}Success`,{pageName:pageName, tabName:(tabName && tabName) || '',method: 'google'})
                 fbq.defEvent('CompleteRegistration');
                }catch(e){
                    console.log('error in fb or mixpanel event')
                  }
              }
              console.log(response);
              } else if(verifyResponse?.data.code === 1) {
                //TODO add register flow
                const response = await registerUser(data?.tokenId);
                if(device === "desktop") {
                  toggleFlow("userHandle")
                } else {
                  close();
                  router.push("/createUsername");
                }
                console.log("google register resp:", response);
              }
        }
        catch(e){
          toTrackMixpanel(`${type || ''}Failure`,{pageName:pageName, tabName:(tabName && tabName) || '',method: 'google'})
            console.log('e',e)
        }
        }

    const initialzeGoogle =()=>{
      try{  
        window?.gapi?.load('auth2',()=>{
            window.gapi.auth2.init({
                // TO-DO client id should come from env
                client_id:GOOGLE_CLIENT_ID_PREROD
            })
        })
      }catch(e){
        console.log("ERROR IN AUTH2 GOOGLE")
      }
    }    
    // const loginGoogle = async()=>{
    //         window?.gapi?.load('signin2',()=>{
    //             const params = {
    //                 onsuccess :(resp)=>{
    //                    console.log('resp',resp);
    //                if(resp){
    //                onTokenFetched(resp);
    //                }
    //                 }
    //             }
    //             window.gapi.signin2.render('loginButton', params)
    //         })
    //     }
      
    useEffect(()=>{
            if(loading === false){
               try{
                  initialzeGoogle();
                console.log("l",loading); 
              }catch(e){
                console.log('ERROR IN AUTH2 GOOGLE');
              } 
            }
          },[loading])

    // const onGoogleClick =() =>{
    //     if(loading === false){
    //     loginGoogle();
    //     }
    // } 

    const registerUser = async(token) =>{
        try{
          const response = await register({token : token});
          console.log("register suucess", response)
          if(response.status === 'success'){
            showSnackbar({ message: 'Login Successful' })
            //  close();
             try{
            //  mixpanel('Login')
             fbq.defEvent('CompleteRegistration');
            }catch(e){
                console.log('error in fb or mixpanel event')
              }
         }
        }
        catch(error){
            showSnackbar({message: "Something went wrong.."})
           console.log("register error",error)
        }
      }
      
    //   const getToken = async(response)=>{
    //    try {
    //     const googleToken = response?.credential;
    //     await login(googleToken);
    //    } catch (error) {
    //      if(error.code === 2){  
    //        await registerUser(response?.credential);
    //      }
    //      console.log(error)
    //    }
    //   }

    //   useEffect(()=>{
    //     google.accounts.id.initialize({
    //         client_id: GOOGLE_CLIENT_ID_PREROD,
    //         callback: getToken
    //       });
    //     //   google.accounts.id.renderButton(
    //     //     document.getElementById("buttonDiv"),
    //     //     {  }  // customization attributes
    //     //   );
    //   })
// function onGoogleClick() {
//   google.accounts.id.initialize({
//     client_id: GOOGLE_CLIENT_ID_PREROD,
//     callback: getToken
//   });
//   google.accounts.id.renderButton(
//     document.getElementById("buttonDiv"),
//     { theme: "outline", size: "large", text: "Continue with Google" }  // customization attributes
//   );
//   google.accounts.id.prompt(); // also display the One Tap dialog
//   }

    return(
        <>
        <GoogleLogin
        clientId={GOOGLE_CLIENT_ID_PREROD}
        render={renderProps => (
            <><div onClick={renderProps.onClick} className="flex border border-1 border-gray-400 py-3 px-4 w-full my-2">
         <div className="justify-self-start"><Google/></div>
         <div className="flex justify-center items-center text-sm md:text-base w-full text-gray-600 font-semibold">
           <p>Continue with Google</p>
         </div>
      </div></>
          )}
        buttonText='Continue with Google'
        onSuccess={onTokenFetched}
        />

        </>
    //  <div  id ='buttonDiv' className="flex border border-1 border-gray-400 py-3 px-4 w-full my-2">
    //     <div className="justify-self-start"><Google/></div>
    //     <div className="flex justify-center w-full font-semibold">
    //       <p>Continue with google</p>
    //     </div>
    //  </div>
        )
    }