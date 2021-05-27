import { useState } from 'react';
import { userLogin } from '../../../sources/auth';
import { SubmitButton } from '../../commons/button/submit-button';

export default function MobileLogin() {
  const [data, setData] = useState({ type: 'Mobile' });
  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    setPending(true);
    try {
      const response = await userLogin(data);
      if (response.data && response.data.accessToken) {
        setPending(false);
      }
    } catch (e) {
      setPending(false);
    }
  };

  const handleChange = e => {
    const currentData = { ...data };
    const inputType = e.target.id;
    const { value } = e.target;
    inputType === 'phone' && (currentData.mobile = value);
    inputType === 'password' && (currentData.password = value);
    setData(currentData);
  };
  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4">
        <input 
        id="phone" onChange={handleChange} 
        className=" w-full border-b-2 border-grey-300 px-4 py-2" 
        type="number" 
        name="phone" 
        placeholder="Phone Number" />
      </div>
      <div className="mt-4">
        <input 
        id="password" 
        onChange={handleChange} 
        className=" w-full border-b-2 border-grey-300 px-4 py-2" 
        type="password" 
        name="phone" 
        placeholder="Password" />
      </div>
      <div className="flex justify-between text-sm font-semibold mt-2 px-2">
        <p>Forgot password?</p>
        <p className="text-blue-400">Login with OTP</p>
      </div>
      <div className="mt-10">
        <SubmitButton handleSubmit={handleSubmit} text="Log in" pending={pending} />
      </div>
    </div>
  );
}
