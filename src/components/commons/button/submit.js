import { useState } from 'react';
import CircularProgress from '../circular-loader-small';

export const SubmitButton = ({ submit, text }) => {
  const [pending, setPending] = useState(false);
  return (
    <>
      <button
        disabled={pending}
        onClick={() => submit(setPending)}
        onKeyDown={() => submit(setPending)}
        className="bg-red-400 w-full px-4 py-2 text-white font-semibold"
      >
        {' '}
        {text}
        {!pending ? '' : <CircularProgress />}
      </button>
    </>
  );
};
