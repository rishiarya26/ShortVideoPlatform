import CircularProgress from '../circular-loader';

export const SubmitButton = ({ handleSubmit, text, pending }) => (
  <>
    {!pending
      ? (
        <button
          onClick={handleSubmit}
          className="bg-red-400 w-full px-4 py-2 text-white font-semibold"
        >
          {text}
        </button>
      )
      : (
        <button
          disabled
          onClick={handleSubmit}
          className="bg-red-400 w-full px-4 py-2 text-white font-semibold"
        >
          {text}
          <CircularProgress />
        </button>
      )}
  </>
);
