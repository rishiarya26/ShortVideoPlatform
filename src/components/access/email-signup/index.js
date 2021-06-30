import { useRouter } from 'next/router';
import { useState } from 'react';
import useTranslation from '../../../hooks/use-translation';
import CircularProgress from '../../commons/circular-loader-small';

export default function EmailSignup({ processEmailData, data }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const redirect = async e => {
    e.preventDefault();
    setPending(true);
    router.push({
      pathname: '/registration',
      query: { email: data?.email }
    });
    setTimeout(() => { setPending(false); }, 2000);
  };

  return (
    <div className="flex flex-col px-4 pt-10">
      <form onSubmit={redirect}>
        <div className="mt-4">
          <input
            required
            id="email"
            value={data.email}
            onChange={processEmailData}
            className=" w-full border-b-2 border-grey-300 px-4 py-2"
            type="email"
            name="email"
            placeholder="Email Address"
          />
        </div>
        <div className="flex justify-end text-sm font-semibold mt-2 px-2">
          <p className="text-gray-400 text-xs">
            {t('POLICY')}
          </p>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={pending}
            className="bg-red-400 w-full px-4 py-2 text-white font-semibold relative"
          >
            {' '}
            {t('NEXT')}
            {!pending ? '' : <CircularProgress />}
          </button>
        </div>
      </form>
    </div>
  );
}
