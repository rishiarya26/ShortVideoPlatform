import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window?.addEventListener('scroll', handleScroll);
    return () => window?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  function handleScroll() {
    console.log(window.innerHeight,"+",window?.scrollY,'=',window.innerHeight+document?.documentElement?.scrollTop,"<=",document?.documentElement?.offsetHeight-1 ,"||",isFetching)
    if ((window?.innerHeight + window?.scrollY) <= (document?.documentElement?.offsetHeight-1) || isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;