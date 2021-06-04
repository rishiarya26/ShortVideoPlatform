import useTranslation from '../../../../hooks/use-translation';

function Loader() {
  const { t } = useTranslation();
  return (
    <>
      <button
        className="animate-pulse rounded-lg text-white py-1 px-4 bg-hipipink  tracking-wide xxs:text-sm xs:text-base"
        // eslint-disable-next-line no-undef
      >
        {t('SHOP')}
      </button>
    </>
  );
}

export default Loader;
