import { useEffect, useState } from "react";
// import { login } from "../../sources/social/google/login";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import Google from "../commons/svgicons/google";
import { GOOGLE_CLIENT_ID_PREROD } from "../../constants";
import { login } from "../../sources/social/google/login-one-tap"
import { register } from "../../sources/social/google/register-one-tap";

export const GoogleButton =({loading}) =>{

    const {close} = useDrawer();
    const { showSnackbar } = useSnackbar();
    const onTokenFetched = async(token)=>{
        console.log("got token... about to call api",token)
        //  const googleToken = data?.Zb?.access_token;
         try{  
             const response = await login({googleToken : token});
             if(response.status === 'success'){
                showSnackbar({ message: 'Login Successful' })
                 close();
             }
           console.log(response);
        }
        catch(e){
            showSnackbar({message: 'Something went wrong..'})
            console.log('e',e)
        }
        }
    const initialzeGoogle =()=>{
        window?.gapi?.load('auth2',()=>{
            window.gapi.auth2.init({
                // TO-DO client id should come from env
                client_id:GOOGLE_CLIENT_ID_PREROD
                
            })
        })
    }    
    const loginGoogle = async()=>{
            window?.gapi?.load('signin2',()=>{
                const params = {
                    onsuccess :(resp)=>{
                       console.log('resp',resp);
                   if(resp){
                   onTokenFetched(resp);
                   }
                    }
                }
                window.gapi.signin2.render('loginButton', params)
            })
        }
      
    useEffect(()=>{
            if(loading === false){
                initialzeGoogle();
                console.log("l",loading)  
            }
          },[loading])

    // const onGoogleClick =() =>{
    //     if(loading === false){
    //     loginGoogle();
    //     }
    // } 

    const registerUser = async(token) =>{
        try{
          await register(token);
        }
        catch(error){
           console.log(error)
        }
      }
      
      const getToken = async(response)=>{
       try {
        const googleToken = response?.credential;
        await login(googleToken);
       } catch (error) {
         if(error.code === 2){  
           await registerUser(response?.credential);
         }
         console.log(error)
       }
      }
function onGoogleClick() {
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID_PREROD,
    callback: getToken
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }  // customization attributes
  );
//   google.accounts.id.prompt(); // also display the One Tap dialog
  }

    return(
     <div  id ='buttonDiv' onClick={onGoogleClick} className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
        <div className="justify-self-start"><Google/></div>
        <div className="flex justify-center w-full font-semibold">
          <p>Continue with google</p>
        </div>
     </div>
        )
    }