import { useRouter } from 'next/router';
import { useState } from 'react';
import useSnackbar from '../../../hooks/use-snackbar';
import useTranslation from '../../../hooks/use-translation';
import { userLogin } from '../../../sources/auth';
import { verifyUserOnly } from '../../../sources/auth/verify-user';
import CircularProgress from '../../commons/circular-loader-small';

export default function Email({
  data, processEmailData, type
}) {
  const [pending, setPending] = useState(false);
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const submit = {
    login: async e => {
      e.preventDefault();
      setPending(true);
      try {
        const finalData = { ...data };
        finalData.type = 'email';
        const response = await userLogin(finalData);
        if (response.status === 'success') {
          router?.push({
            pathname: '/feed/for-you'
          });
          showSnackbar({ message: t('SUCCESS_LOGIN') });
          setPending(false);
        }
      } catch (e) {
        showSnackbar({ message: t('FAIL_EMAIL_LOGIN') });
        setPending(false);
      }
    },
    signup: async e => {
      e.preventDefault();
      setPending(true);
      let resp;
   try{  
      resp = await verifyUserOnly({email: data?.email, type:'email'});
      if (resp.status === 'success') {
      showSnackbar({message : 'User already registered. Please Sign In'})
      setPending(false);
    }
    }catch(e){
      router?.push({
        pathname: '/registration',
        query: { email: data?.email }
      });
      setTimeout(() => { setPending(false); }, 2000);
    }}
  };

  const submitText = {
    login: t('LOGIN'),
    signup: t('NEXT')
  };

  const info = {
    login:
  <>
    <div className="mt-4">
      <input
        id="password"
        value={data.password}
        onChange={processEmailData}
        className=" w-full border-b-2 border-grey-300 px-4 py-2"
        type="password"
        name="phone"
        placeholder="Password"
        autoComplete="off"
        required
      />
    </div>
    <div onClick={()=>router.push(
      {pathname: '/forgot-password',
       query : {type : 'email'}
    }
    )} className="flex justify-start text-sm font-semibold mt-2 px-2">
      {/* TO-DO  forgot password */}
      <p>Forgot password?</p>
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
      <form onSubmit={submit[type]}>
        <div className="mt-4">
          <input
            id="email"
            value={data.email}
            onChange={processEmailData}
            className=" w-full border-b-2 border-grey-300 px-4 py-2"
            type="email"
            name="phone"
            placeholder="Email address"
            autoComplete="off"
            required
          />
        </div>
        { info[type] }
        <div className="mt-10">
          <button
            type="submit"
            disabled={pending}
            className="bg-hipired w-full px-4 py-2 text-white font-semibold relative"
          >
            {' '}
            {submitText[type]}
            {!pending ? '' : <CircularProgress />}
          </button>
        </div>
      </form>
    </div>
  );
}
