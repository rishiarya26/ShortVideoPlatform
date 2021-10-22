import { GOOGLE_CLIENT_ID_PREROD } from "../../../constants";
import { login } from "../../../sources/social/google/login-one-tap"
import { register } from "../../../sources/social/google/register-one-tap";

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
