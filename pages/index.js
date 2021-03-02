import useTranslation from '../src/hooks/use-translation';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen">
      <span className="font-bold m-auto text-purple-800 text-4xl">{t('welcome')}</span>
    </div>
  );
};

export default Home;
