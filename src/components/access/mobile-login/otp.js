import { useRouter } from 'next/router';
import { useState } from 'react';
import useSnackbar from '../../../hooks/use-snackbar';
import { verifyUser } from '../../../sources/auth/verify-user';
import { SubmitButton } from '../../commons/button/submit';

export default function OtpLogin({ handleToggle, handleChange, data }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const mobile = data && data.mobile;
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    setPending(true);
    try {
      const response = await verifyUser(mobile);
      if (response.data.status === 200) {
        setPending(false);
        router.push({
          pathname: '/verify-otp/[pid]',
          query: { pid: mobile }
        });
        showSnackbar({ message: 'otp send suucessfully' });
      }
    } catch (e) {
      setPending(false);
      showSnackbar({ message: 'mobile no is not registered with. Please Sign up' });
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
      <div
        onClick={() => handleToggle('password')}
        className="flex justify-end text-sm font-semibold mt-2 px-2"
      >
        <p className="text-blue-400">Login with Password</p>
      </div>
      <div className="mt-10">
        <SubmitButton handleSubmit={handleSubmit} text="Send OTP" pending={pending} />
      </div>
    </div>
  );
}
