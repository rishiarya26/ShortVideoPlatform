import { useState, useEffect } from 'react';
import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';

const Home = () => {
  const { t } = useTranslation();
  const [str, setStr] = useState('');
  useEffect(() => {
    setTimeout(() => (setStr('this is test title for hipi')), 1000);
  }, []);
  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: str
        }}
      />
      <span className="font-bold m-auto text-purple-800 text-4xl">{t('welcome')}</span>
    </div>
  );
};

export default Home;
