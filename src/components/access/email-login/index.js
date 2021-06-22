import { useRouter } from 'next/router';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { userLogin } from '../../../sources/auth';
import { SubmitButton } from '../../commons/button/submit';

export default function EmailLogin({ emailData: data, handleChangeEmail }) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSubmit = async setPending => {
    setPending(true);
    try {
      const finalData = { ...data };
      finalData.type = 'email';
      const response = await userLogin(finalData);
      if (response.status === 'success') {
        setPending(false);
        router.push({
          pathname: '/feed/for-you'
        });
        showSnackbar({ message: t('SUCCESS_LOGIN') });
      }
    } catch (e) {
      showSnackbar({ message: t('FAIL_EMAIL_LOGIN') });
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4">
        <input
          id="email"
          value={data.email}
          onChange={handleChangeEmail}
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="email"
          name="phone"
          placeholder="Email address"
        />
      </div>
      <div className="mt-4">
        <input
          id="password"
          value={data.password}
          onChange={handleChangeEmail}
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
        <SubmitButton handleSubmit={handleSubmit} text="Log in" />
      </div>
    </div>
  );
}
