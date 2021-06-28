import { useRouter } from 'next/router';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { verifyUser } from '../../../sources/auth/verify-user';
import { SubmitButton } from '../../commons/button/submit';
import { CountryCode } from '../../commons/button/country-code';

export default function OtpLogin({
  toggle, processPhoneData, data, onCountryCodeChange
}) {
  const router = useRouter();
  const phoneNo = data && data.mobile;
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const mobile = `${data?.countryCode}${phoneNo}`;
      const response = await verifyUser(mobile);
      if (response.status === 'success') {
        router.push({
          pathname: '/verify-otp/[pid]',
          query: { pid: mobile }
        });
        showSnackbar({ message: t('SUCCESS_OTP') });
      }
    } catch (e) {
      console.log(e);
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
      <button
        onClick={() => toggle('password')}
        onKeyDown={() => toggle('password')}
        className="flex justify-end text-sm font-semibold mt-2 px-2"
      >
        <p className="text-blue-400">Login with Password</p>
      </button>
      <div className="mt-10">
        <SubmitButton fetchData={fetchData} text="Send OTP" />
      </div>
    </div>
  );
}
