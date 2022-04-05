
import { useState, useEffect } from 'react';
import CircularLoader from './circular-loader';

function ComponentStateHandler({
  state, Loader, ErrorComp, children
}) {
  if (state === 'pending') {
    return Loader ? <Loader />
      : (<CircularLoader />);
  }
  if (state === 'fail') return ErrorComp ? <ErrorComp /> : null;
  if (state === 'success') return <>{children}</>;
}
/**
 *
 * @param {*} dataFetcher is a promise that resolves or rejects data, hence if the
 * data source is not an api we can have a function which promisifies data  - Promise.resolve(data)
 * @param {*} onDataFetched is a callback function which gets called with dataFetcher response as a param
 */
function useFetcher(dataFetcher, onDataFetched, dep) {
  const [fetchState, setFetchState] = useState('pending');
  const [retry, setRetry] = useState(false);
  const [data, setData] = useState(null);
  const dataFetch = async () => {
    try {
      const data = await dataFetcher();
      if (data.status === 'fail') {
        console.log(data)
        setFetchState('fail');
        return;
      }
      setData(data);
      if (onDataFetched) onDataFetched(data);
      console.log("success", data)

      setFetchState('success');
    } catch (e) {
      
      console.log("fail",e)
      setFetchState('fail');
    }
  };
  useEffect(() => {
    setFetchState('pending');
    dataFetch();
  }, [dep]);

  useEffect(() => {
    dataFetch();
  }, []);

  if (retry) {
    dataFetch();
    setRetry(false);
  }
  return [fetchState, setRetry, data];
}

export { useFetcher };

export default ComponentStateHandler;
