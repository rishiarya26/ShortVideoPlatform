import { useRouter } from 'next/router';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { userLogin } from '../../../sources/auth';
import { SubmitButton } from '../../commons/button/submit';

export default function PasswordLogin({ toggle, processPhoneData, data }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const submit = async setPending => {
    setPending(true);
    try {
      const finalData = { ...data };
      finalData.type = 'Mobile';
      const response = await userLogin(finalData);
      if (response.status === 'success') {
        setPending(false);
        router.push({
          pathname: '/feed/for-you'
        });
        showSnackbar({ message: t('SUCCESS_LOGIN') });
      }
    } catch (e) {
      setPending(false);
      showSnackbar({ message: t('FAIL_MOBILE_LOGIN') });
    }
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4">
        <input
          id="mobile"
          value={data.mobile}
          onChange={processPhoneData}
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
          onChange={processPhoneData}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="password"
          name="phone"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-between text-sm font-semibold mt-2 px-2">
        <p>Forgot password?</p>
        <p onClick={() => toggle('otp')} className="text-blue-400">Login with OTP</p>
      </div>
      <div className="mt-10">
        <SubmitButton submit={submit} text="Log in" />
      </div>
    </div>
  );
}
