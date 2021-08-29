import { useRouter } from 'next/router';
import useTranslation from '../../../hooks/use-translation';
import { SubmitButton } from '../../commons/button/submit';
import { CountryCode } from '../../commons/button/country-code';
import useSnackbar from '../../../hooks/use-snackbar';
import { userLogin } from '../../../sources/auth';
import { verifyUser } from '../../../sources/auth/verify-user';

export default function Mobile({
  toggle, processPhoneData, data, onCountryCodeChange, type
}) {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const disable = {
    loginPassword: (!!(data.mobile?.length === 0) || !!(data.password?.length === 0)),
    loginOtp: !!(data.mobile?.length === 0),
    signup: !!(data.mobile?.length === 0)
  };

  const submit = {
    loginPassword: async () => {
      try {
        const finalData = { ...data };
        finalData.type = 'Mobile';
        finalData.mobile = `${data?.countryCode}${data?.mobile}`;
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
    },
    loginOtp: async () => {
      try {
        const mobile = `${data?.countryCode}${data?.mobile}`;
        const response = await verifyUser(mobile);
        if (response.status === 'success') {
          router.push({
            pathname: '/verify-otp',
            query: { ref: 'login', mobile: `${data?.countryCode}-${data?.mobile}` }
          });
          showSnackbar({ message: t('SUCCESS_OTP') });
        }
      } catch (e) {
        if (e.errorCode === 404) {
          showSnackbar({ message: t('NOT_REGISTERED') });
        }
      }
    },
    signup: async () => {
      try {
        const mobile = `${data?.countryCode}${data?.mobile}`;
        const response = await verifyUser(mobile);
        if (response.status === 'success') {
          showSnackbar({ message: t('REGISTERED') });
        }
      } catch (e) {
        if (e.errorCode === 404) {
          showSnackbar({ message: t('SUCCESS_OTP') });
          router.push({
            pathname: '/verify-otp',
            query: { ref: 'signup', mobile: `${data?.countryCode}-${data?.mobile}` }
          });
        }
      }
    }
  };

  const submitText = {
    loginPassword: t('LOGIN'),
    loginOtp: t('SEND_OTP'),
    signup: t('SEND_OTP')
  };

  const info = {
    loginOtp:
  <button
    onClick={() => toggle('password')}
    onKeyDown={() => toggle('password')}
    className="flex justify-end text-sm font-semibold mt-2 px-2"
  >
    <p className="text-blue-400">Login with Password</p>
  </button>,
    loginPassword:
  <>
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
  </>,
    signup:
  <div className="flex justify-end text-sm font-semibold mt-2 px-2">
    <p className="text-gray-400 text-xs">
      {t('POLICY')}
    </p>
  </div>
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
      {info[type]}
      <div className="mt-10">
        <SubmitButton disable={disable[type]} fetchData={submit[type]} text={submitText[type]} />
      </div>
    </div>
  );
}