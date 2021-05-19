import { withRouter } from 'next/router';
import { useFetcher } from '../../src/components/commons/component-state-handler';
import Feed from '../../src/components/feed';
import { getHomeFeed } from '../../src/sources/feed';

function Hipi({ router }) {
  const { id } = router.query;

  const dataFetcher = () => getHomeFeed({ type: id });

  let [fetchState, retry, data] = useFetcher(dataFetcher, null, id);

  if (id === 'for-you') {
    const status = fetchState === 'success';
    const dataLength = data?.data?.length;

    fetchState = (status && !dataLength > 0) ? 'fail' : fetchState;
    data = (status && dataLength > 0) && data;
    retry = (status && !dataLength > 0) && retry;
  }

  return (
    <>
      <Feed
        {...{ fetchState, data, retry }}
      />
    </>
  );
}

export default withRouter(Hipi);

