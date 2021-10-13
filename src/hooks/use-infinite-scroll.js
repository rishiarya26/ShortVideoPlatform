import { useState, useEffect } from 'react';
import { getItem } from '../utils/cookie';

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

  const device = getItem('device-info');

  function handleScroll() {
    // console.log((window?.scrollY) ,"<=", (document?.documentElement?.offsetHeight-window?.screen?.availHeight))
    // if ((window?.scrollY) !== (document?.documentElement?.offsetHeight-window?.screen?.availHeight) || isFetching) return;

    if(device && device === 'android'){
      if((window?.screen?.availHeight - 93)+window?.scrollY <= (document?.documentElement?.offsetHeight-1) || isFetching) return;
    }
    if(device && device === 'ios'){
      if ((window?.innerHeight + window?.scrollY) <= (document?.documentElement?.offsetHeight-1) || isFetching) return;
    }
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;