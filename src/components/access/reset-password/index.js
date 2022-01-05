import { withRouter } from "next/router";
import { useState } from "react";
import useSnackbar from "../../../hooks/use-snackbar";
import { userLogin } from "../../../sources/auth";
import {createNewPassword} from "../../../sources/auth/reset-password"
import { Back } from "../../commons/svgicons/back";

function ResetPassword({router}) {
  const [password, setPassword] = useState('');

  const {code} = router?.query;
  const {mobile} = router?.query;

  const { showSnackbar } = useSnackbar();

  const login = async() =>{
  let resp;
  try{   
    resp = await userLogin({mobile: mobile, password: password, type: "Mobile"});
  }
  catch(e){
  console.log("e",e);
  }
   return resp;
  }

const submit = async() => {
  try{
   const response =  await createNewPassword({ code: code, password: password, mobile: mobile });
   if(response?.data?.code === 1){
    const resp = await login();
    if(resp.status ==='success'){
      showSnackbar({ message: "Password Changed Successfully"});
      router?.push('/feed/for-you')
    }
   }   
  }catch(error){
  }
}

const onPasswordEnter =(e)=>{
  const password = e?.currentTarget?.value;
  password && setPassword(password)
}

  return (
    <div className="flex flex-col">
       <div className="flex justify-center h-16 items-center relative">
    <span className="absolute top-4 left-2" onClick={()=>router?.back()}> <Back/></span>  
    <div className="font-semibold" >Reset</div>
    </div>
      <div className="mt-4 flex flex-col px-6">
        <p className="font-bold w-full">Reset Password</p>
        <p className="text-gray-400 text-xs">Use 8-20 characters from atleast 2 categories: letters, numbers, special characters</p>
      </div>
      <div className="mt-4 px-6">
        <input 
          className=" w-full border-b-2 border-grey-300 px-4 py-2" 
          onChange={onPasswordEnter}
          type="password" 
          name="password" 
          placeholder="Password" 
        />
      </div>
      <div className="mt-10 px-6">
        <button disable={password.length<0} onClick={submit} className="bg-hipired w-full px-4 py-2 text-white font-semibold">Submit</button>
      </div>
    </div>
  );
}

export default  withRouter(ResetPassword);