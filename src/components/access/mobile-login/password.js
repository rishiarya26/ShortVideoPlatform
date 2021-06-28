import { useRouter } from 'next/router';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { userLogin } from '../../../sources/auth';
import { SubmitButton } from '../../commons/button/submit';
import { CountryCode } from '../../commons/button/country-code';

export default function PasswordLogin({
  toggle, processPhoneData, data, onCountryCodeChange
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const fetchData = async () => {
    try {
      const finalData = { ...data };
      finalData.type = 'Mobile';
      finalData.mobile = `${data.countryCode}${data.mobile}`;
      const response = await userLogin(finalData);
      if (response.status === 'success') {
        router.push({
          pathname: '/feed/for-you'
        });
        showSnackbar({ message: t('SUCCESS_LOGIN') });
      }
    } catch (e) {
      showSnackbar({ message: t('FAIL_MOBILE_LOGIN') });
    }
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4 relative flex">
        <CountryCode
          onValueChange={onCountryCodeChange}
          text={data.countryCode}
        />
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
        <SubmitButton fetchData={fetchData} text="Log in" />
      </div>
    </div>
  );
}
