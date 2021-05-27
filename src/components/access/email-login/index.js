import { useState } from 'react';
import { userLogin } from '../../../sources/auth';
import { SubmitButton } from '../../commons/button/submit-button';

export default function EmailLogin() {
  const [data, setData] = useState({ type: 'email' });
  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    setPending(true);
    try {
      console.log(data);
      const response = await userLogin(data);
      console.log(response);
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
    inputType === 'email' && (currentData.email = value);
    inputType === 'password' && (currentData.password = value);
    setData(currentData);
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4">
        <input
          id="email"
          onChange={handleChange}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="email"
          name="phone"
          placeholder="Email address"
        />
      </div>
      <div className="mt-4">
        <input
          id="password"
          onChange={handleChange}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="password"
          name="phone"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-start text-sm font-semibold mt-2 px-2">
        <p>Forgot password?</p>
      </div>
      <div className="mt-10">
        <SubmitButton handleSubmit={handleSubmit} text="Log in" pending={pending} />
      </div>
    </div>
  );
}
