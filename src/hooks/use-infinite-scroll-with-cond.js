import { useState, useEffect } from 'react';
import { getItem } from '../utils/cookie';

const useInfiniteScrollWithCond = (callback, valid ) => {
  const [isFetching, setIsFetching] = useState(false);
  const [validCond, setValidCond] = useState(valid);

  useEffect(() => {
    window?.addEventListener('scroll', handleScroll);
    return () => window?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    console.log("valid",valid)
    callback && callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  // useEffect(()=>{
  //   if(valid){
  //     setValidCond(true);
  //   }
  // },[valid])

  const device = getItem('device-info');
  const deviceType = getItem('device-type');

  function handleScroll() {
    // console.log((window?.scrollY) ,"<=", (document?.documentElement?.offsetHeight-window?.screen?.availHeight))
    // if ((window?.scrollY) !== (document?.documentElement?.offsetHeight-window?.screen?.availHeight) || isFetching) return;
if(deviceType === 'desktop'){
  console.log((window?.innerHeight + window?.scrollY) <= (document?.documentElement?.offsetHeight-1));
  if ((window?.innerHeight + window?.scrollY) <= (document?.documentElement?.offsetHeight-1) || isFetching) return;
}else if(deviceType === 'mobile'){
  if(device && device === 'android'){
    console.log((window?.screen?.availHeight - 63),'+',window?.scrollY,'=',(window?.screen?.availHeight - 93)+window?.scrollY,'<=',(document?.documentElement?.offsetHeight-1));
    if((window?.screen?.availHeight - 63)+window?.scrollY <= (document?.documentElement?.offsetHeight-1) || isFetching) return;
  }
  if(device && device === 'ios'){
    if ((window?.innerHeight + window?.scrollY) <= (document?.documentElement?.offsetHeight-1) || isFetching) return;
  }
}
   setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScrollWithCond;