import { withRouter } from 'next/router';
import { useState } from 'react';
import useTranslation from '../../../hooks/use-translation';
import { verifyOTP } from '../../../sources/auth/verify-otp';
import { BackButton } from '../../commons/button/back';

const VerifyOTP = ({ router }) => {
  const [otp,setOtp] = useState(null)
  const { id } = router.query;
  const { t } = useTranslation();

  const handleOtpChange= (e)=>{
   const otp = e.currentTarget.value;
   setOtp(otp)
  }

  const handleSubmit =()=>{
    let payload = {
      mobile: id,
      otp: otp,
    }
   try{ 
     const response = verifyOTP(payload)
     console.log(response)
    }
   catch(error){

   }
  }
  return (
    <div className="flex flex-col px-4 pt-10">
      <BackButton back={router.back} />
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">Enter 4-digit code</p>
        <p className="text-gray-400 text-xs">{`Your code was messaged to +${id}`}</p>
      </div>
      <div className="mt-4">
        <input className=" w-full border-b-2 border-grey-300 px-4 py-2" type="password" name="phone" placeholder="OTP"
        onChange={handleOtpChange} />
      </div>
      <div className="mt-10">
        <button onClick={handleSubmit} className="bg-red-400 w-full px-4 py-2 text-white font-semibold">{t('VERIFY_OTP')}</button>
      </div>
    </div>
  );
};

export default withRouter(VerifyOTP);
