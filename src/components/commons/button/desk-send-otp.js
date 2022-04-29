import { useState } from 'react';
import CircularProgress from '../circular-loader-small';

export const DeskSendOtp = ({ fetchData, text, disable = false }) => {
  const [pending, setPending] = useState(false);

  const submit = async () => {
    try {
      setPending(true);
      await fetchData();
      setPending(false);
    } catch (e) {
      setPending(false);
    }
  };

  return (
    <>
      <button
        disabled={disable || pending}
        onClick={submit}
        onKeyDown={submit}
        className={disable ? 'bg-gray-100 w-full px-8 py-2 text-gray-600 text-sm cursor-pointer font-semibold relative' : 'bg-hipired w-full px-8 py-2 text-sm cursor-pointer text-white font-semibold relative cursor-pointer'}
      >
        {' '}
        {text}
        {!pending ? '' : <CircularProgress />}
      </button>
    </>
  );
};
