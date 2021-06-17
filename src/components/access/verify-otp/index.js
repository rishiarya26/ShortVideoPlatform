import { withRouter } from 'next/router';
import { useState } from 'react';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { verifyOTP } from '../../../sources/auth/verify-otp';
import { BackButton } from '../../commons/button/back';
import { SubmitButton } from '../../commons/button/submit';

const VerifyOTP = ({ router }) => {
  const [otp, setOtp] = useState('');
  const { id } = router.query;
  const { t } = useTranslation();

  const { showSnackbar } = useSnackbar();

  const handleOtpChange = e => {
    const otp = e.currentTarget.value;
    setOtp(otp);
  };

  const handleSubmit = async setPending => {
    setPending(true);
    const payload = {
      mobile: id,
      otp
    };
    try {
      const response = await verifyOTP(payload);
      if (response.data.status === 200) {
        setPending(false);
        router.push({
          pathname: '/feed/for-you'
        });
        showSnackbar({ message: t('SUCCESS_LOGIN') });
      }
    } catch (error) {
      setPending(false);
      showSnackbar({ message: t('INCORRECT_OTP') });
    }
  };
  return (
    <div className="flex flex-col px-4 pt-10">
      <BackButton back={router.back} />
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">Enter 4-digit code</p>
        <p className="text-gray-400 text-xs">{`Your code was messaged to +${id}`}</p>
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
        <SubmitButton handleSubmit={handleSubmit} text={t('VERIFY_OTP')} />
      </div>
    </div>
  );
};

export default withRouter(VerifyOTP);
