/* eslint-disable react/no-unescaped-entities*/
import { useRouter, withRouter } from "next/router";
import { useState } from "react";
import useSnackbar from "../../../hooks/use-snackbar";
import useTranslation from "../../../hooks/use-translation";
import { resetPasswordEmail } from "../../../sources/auth/forgot-pass-email";
import { resetPasswordMobile } from "../../../sources/auth/forgot-pass-mobile";
import {  verifyUserOnly } from "../../../sources/auth/verify-user";
import { getItem } from "../../../utils/cookie";
import { CountryCode } from "../../commons/button/country-code"
import { SubmitButton } from "../../commons/button/submit";
import { Back } from "../../commons/svgicons/back"
import ResetPassword from "../reset-password";

 const ForgotPassword = ({router, toggleShowForgotPassComp, authOption}) =>{
    const [phoneData, setPhoneData] = useState({ mobile: '', countryCode: '91' });
    const [emailData, setEmailData] = useState({ email :'' })
    const [otp, setOtp] = useState('');

    const { showSnackbar } = useSnackbar();
    const type =  authOption;
    const {t} = useTranslation();
    const device = getItem('device-type');
    

    const disable = {
        mobile: ((phoneData.mobile?.length <= 0) ? 'true' : 'false'),
        email : 'false'
      };

    const onCountryCodeChange = selectedData => {
        const data = { ...phoneData };
        data.countryCode = selectedData.code;
        setPhoneData(data);
      };

      const getMappings = (e, data) => {
        const { id } = e.target;
        const { value } = e.target;
        data[id] = value;
        return data;
      };
    
      const processPhoneData = e => {
        let data = { ...phoneData };
        data = getMappings(e, data);
        setPhoneData(data);
      };  

       
      const processEmailData = e => {
        let data = { ...emailData };
        data = getMappings(e, data);
        setEmailData(data);
      };  

      const submit = {
          mobile : async(e)=>{
            e.preventDefault();
            try{ 
                    const mobile = `${phoneData?.countryCode}${phoneData?.mobile}`;
                    const resp = await verifyUserOnly({mobile: mobile, type:'mobile'});
                    if (resp.status === 'success') {
                        const response = await resetPasswordMobile(`${phoneData?.countryCode}${phoneData?.mobile}`);
                        if (response.data.code === 1) {        
                           if(device=== 'mobile'){  
                            router?.push({
                            pathname: '/verify-otp',
                            query: { ref: 'forgot-password', mobile: `${phoneData?.countryCode}-${phoneData?.mobile}`}
                          });
                       }
                     }
                    }
                }catch(e){
                    showSnackbar({ message: t('NOT_REGISTERED') });
                    console.log("e",e);
             }
           },

           email : async(e)=>{
            e.preventDefault();
            try{ 
                const email = emailData.email;
                const resp = await verifyUserOnly({email:email, type:"email"});
                if (resp.status === 'success') {
                const response = await resetPasswordEmail(emailData.email);
                if (response.data.code === 1) {        
                showSnackbar({ message: "Reset Password link sent to your mail. Please reset it & sign in" });
               if(device=== 'mobile'){ 
                   router?.push({
                   pathname: '/login/email',
                });
               }else if(device==='desktop'){
                   toggleShowForgotPassComp({show : false})
               }
            }}}catch(e){
                showSnackbar({ message: 'This Email is not registered with us. Please Sign up' });                 
                console.log("e",e);
             }
           },
      }

      const inputType = {
            email :  <input
            id="email"
            value={emailData.email}
            onChange={processEmailData}
            className=" w-full border-b-2 border-grey-300 px-4 py-2"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            required
        />,
            mobile :
            <>
                <CountryCode
                    onValueChange={onCountryCodeChange} 
                    text={phoneData.countryCode}
                />
                <input
                    id="mobile"
                    value={phoneData.mobile}
                    onChange={processPhoneData}
                    className=" w-full border-b-2 border-grey-300 px-4 py-2"
                    type="number"
                    name="phone"
                    autoComplete="off"
                    placeholder="Phone Number"
                    required
                />
            </>
      }

      const onChangeOtp = (e)=>{
          setOtp(e?.currentTarget?.value);
      }

    return(
  <div>
    <div className="flex justify-center h-16 items-center relative">
    <span className="absolute top-4 left-2" onClick={()=>toggleShowForgotPassComp({show : false})}> <Back/></span>  
    <div className="font-semibold" >Reset</div>
    </div>
    <div className="mt-4 flex flex-col px-6">
        <p className="font-bold w-full">Forget password</p>
        <p className="text-gray-400 text-xs mt-2">We'll SMS you a code to reset your password</p>
      </div>
    <div className="flex flex-col px-6 pt-6">
     <form onSubmit={submit[type]}> <div className="mt-4 relative flex">
       {inputType[type]}
      </div>
      <div className="mt-10 w-50">
        <button type='submit' className="bg-hipired w-full px-4 py-2 text-white font-semibold" >Reset</button>
      </div>
      </form>
      { type === 'mobile' && 
      <>
      <input
        id="otp"
        value={otp}
        onChange={onChangeOtp}
        className=" w-full border-b-2 border-grey-300 px-4 py-2"
        type="number"
        name="phone"
        autoComplete="off"
        placeholder="Enter code"
        required
      />     
      <ResetPassword otpCode={otp} phoneNo ={`${phoneData?.countryCode}${phoneData?.mobile}`}/>
      </>
      }
    </div>
  </div>
    )
}

export default withRouter(ForgotPassword);