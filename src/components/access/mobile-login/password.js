import { useState } from 'react';
import { userLogin } from '../../../sources/auth';
import { SubmitButton } from '../../commons/button/submit';

export default function PasswordLogin({ handleToggle, handleChange, data }) {
  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    setPending(true);
    try {
      const finalData = { ...data };
      finalData.type = 'Mobile';
      const response = await userLogin(finalData);
      if (response?.data?.accessToken) {
        setPending(false);
      }
    } catch (e) {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4">
        <input
          id="phone"
          value={data.mobile}
          onChange={handleChange}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="number"
          name="phone"
          placeholder="Phone Number"
        />
      </div>
      <div className="mt-4">
        <input
          id="password"
          value={data.password}
          onChange={handleChange}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="password"
          name="phone"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-between text-sm font-semibold mt-2 px-2">
        <p>Forgot password?</p>
        <p onClick={() => handleToggle('otp')} className="text-blue-400">Login with OTP</p>
      </div>
      <div className="mt-10">
        <SubmitButton handleSubmit={handleSubmit} text="Log in" pending={pending} />
      </div>
    </div>
  );
}
