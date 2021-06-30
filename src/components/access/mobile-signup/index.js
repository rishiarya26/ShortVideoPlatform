import { useRouter } from 'next/router';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { verifyUser } from '../../../sources/auth/verify-user';
import { CountryCode } from '../../commons/button/country-code';
import { SubmitButton } from '../../commons/button/submit';

export default function MobileSignup({ processPhoneData, data, onCountryCodeChange }) {
  const router = useRouter();
  const phoneNo = data?.mobile;
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const disable = !!(data.mobile.length === 0);

  /* if 404 then user not registered and can proceed with Sign Up flow. */
  /* TO-DO to make it in success from transform */
  const fetchData = async () => {
    try {
      const mobile = `${data?.countryCode}${phoneNo}`;
      const response = await verifyUser(mobile);
      if (response.status === 'success') {
        showSnackbar({ message: t('REGISTERED') });
      }
    } catch (e) {
      if (e.errorCode === 404) {
        showSnackbar({ message: t('SUCCESS_OTP') });
        const mobile = `${data?.countryCode}${phoneNo}`;
        router.push({
          pathname: '/verify-otp',
          query: { ref: 'signup', mobile }
        });
      }
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
      <div className="flex justify-end text-sm font-semibold mt-2 px-2">
        <p className="text-gray-400 text-xs">
          {t('POLICY')}
        </p>
      </div>
      <div className="mt-10">
        <SubmitButton disable={disable} fetchData={fetchData} text="Send OTP" />
      </div>
    </div>
  );
}
