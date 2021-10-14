import { withRouter } from 'next/router';
import { useState } from 'react';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { verifyOTP } from '../../../sources/auth/verify-otp';
import { BackButton } from '../../commons/button/back';
import { SubmitButton } from '../../commons/button/submit';

const VerifyOTP = ({ router }) => {
  const [otp, setOtp] = useState('');
  const { ref } = router?.query;
  const { mobile } = router?.query;
  const [countryCode, phone] = mobile?.split('-');
  const phoneNo = `${countryCode}${phone}`;
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const types = {
    login: {
      pathname: '/feed/for-you'
    },
    signup: {
      pathname: '/registration',
      query: { mobile: phoneNo }
    }
  };

  const handleOtpChange = e => {
    const otp = e.currentTarget.value;
    setOtp(otp);
  };

  const fetchData = async () => {
    const payload = {
      mobile: phoneNo,
      otp
    };
    try {
      const response = await verifyOTP(payload);
      if (response.data.status === 200) {
        router?.push(types[ref]);
        showSnackbar({ message: t('SUCCESS_LOGIN') });
      }
    } catch (error) {
      showSnackbar({ message: t('INCORRECT_OTP') });
    }
  };
  return (
    <div className="flex flex-col px-4 pt-10">
      <BackButton back={() => router?.push({
        pathname: `/${ref}/phone`,
        query: { option: 'otp', mobile }
      })}
      />
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">Enter 4-digit code</p>
        <p className="text-gray-400 text-xs">{`Your code was messaged to +${mobile}`}</p>
      </div>
      <div className="mt-4">
        <input
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="password"
          name="phone"
          placeholder="OTP"
          value={otp}
          onChange={handleOtpChange}
        />
      </div>
      <div className="mt-10">
        <SubmitButton fetchData={fetchData} text={t('VERIFY_OTP')} />
      </div>
    </div>
  );
};

export default withRouter(VerifyOTP);
