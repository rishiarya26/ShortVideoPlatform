import { useState } from 'react';
import CircularProgress from '../circular-loader-small';

export const SubmitButton = ({ handleSubmit, text }) => {
  const [pending, setPending] = useState(false);
  return (
    <>
      <button
        disabled={pending}
        onClick={() => handleSubmit(setPending)}
        onKeyDown={() => handleSubmit(setPending)}
        className="bg-red-400 w-full px-4 py-2 text-white font-semibold"
      >
        {' '}
        {text}
        {!pending ? '' : <CircularProgress />}
      </button>
    </>
  );
};
