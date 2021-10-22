import { useEffect, useState } from "react";
import { login } from "../../sources/social/google/login";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import Google from "../commons/svgicons/google";

export const GoogleButton =({loading}) =>{
    const {close} = useDrawer();
    const { showSnackbar } = useSnackbar();
    const onTokenFetched = async(data)=>{
         const googleToken = data?.mc?.access_token;
         try{  
             const response = await login(googleToken);
             if(reponse.status === 'success'){
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
                client_id:'1089855202811-en5ek78kvh7sst9bfmu62femgr15u0tk.apps.googleusercontent.com'
                
            })
        })
    }    
    const loginGoogle =()=>{
            window?.gapi?.load('signin2',()=>{
                const params = {
                    onsuccess :(resp)=>{
                       console.log('resp',resp);
                      onTokenFetched(resp);
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
     <div id ='loginButton' onClick={onGoogleClick} className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
        <div className="justify-self-start"><Google/></div>
        <div className="flex justify-center w-full font-semibold">
          <p>Continue with google</p>
        </div>
     </div>
        )
    }