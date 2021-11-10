import { useEffect, useState } from "react";
import { login } from "../../sources/social/google/login";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import Google from "../commons/svgicons/google";
import { GOOGLE_CLIENT_ID_PREROD } from "../../constants";

export const GoogleButton =({loading}) =>{
    const {close} = useDrawer();
    const { showSnackbar } = useSnackbar();
    const onTokenFetched = async(data)=>{
        console.log("got token... about to call api",data, "token", data?.Zb?.access_token,  data?.access_token)
         const googleToken = data?.access_token;
         try{  
             const response = await login({googleToken : googleToken});
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

    const onGoogleClick =() =>{
        if(loading === false){
        loginGoogle();
        }
    }      


    return(
     <div  id ='loginButton' onClick={onGoogleClick} className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
        <div className="justify-self-start"><Google/></div>
        <div className="flex justify-center w-full font-semibold">
          <p>Continue with google</p>
        </div>
     </div>
        )
    }