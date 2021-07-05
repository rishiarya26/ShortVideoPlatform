import useTranslation from '../../../hooks/use-translation';
import CircularProgress from '../../commons/circular-loader-small';

export default function Email({
  data, processEmailData, info, pending, submit
}) {
  const { t } = useTranslation();

  const type = {
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
      />
    </div>
    <div className="flex justify-start text-sm font-semibold mt-2 px-2">
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
      <form onSubmit={submit}>
        <div className="mt-4">
          <input
            id="email"
            value={data.email}
            onChange={processEmailData}
            className=" w-full border-b-2 border-grey-300 px-4 py-2"
            type="email"
            name="phone"
            placeholder="Email address"
          />
        </div>
        { type[info] }
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
