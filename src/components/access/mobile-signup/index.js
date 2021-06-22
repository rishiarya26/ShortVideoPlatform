import { useRouter } from 'next/router';
import useSnackbar from '../../../hooks/use-snackbar';
import { verifyUser } from '../../../sources/auth/verify-user';
import { SubmitButton } from '../../commons/button/submit';

export default function MobileSignup({ handleChange, data }) {
  const router = useRouter();
  const mobile = data && data.mobile;
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async setPending => {
    setPending(true);
    try {
      const response = await verifyUser(mobile);
      if (response.status === 'success') {
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
      <div className="flex justify-end text-sm font-semibold mt-2 px-2">
        <p className="text-gray-400 text-xs">
          By continuing, you agree to Hipi's
          <span>Terms of Use</span>
          {' '}
          and confirm that you have read Hipi's
          <span>Privacy Policy</span>
          . if you sign up with SMS, SMS fee may apply.
        </p>
      </div>
      <div className="mt-10">
        <SubmitButton handleSubmit={handleSubmit} text="Send OTP" />
      </div>
    </div>
  );
}
