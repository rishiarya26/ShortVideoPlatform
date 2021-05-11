import { useFetcher } from '../../src/components/commons/component-state-handler';
import Feed from '../../src/components/feed';
import { getHomeFeed } from '../../src/sources/feed';

export default function Hipi() {
  const dataFetcher = () => getHomeFeed({ type: 'forYou' });
  const [fetchState, setRetry, data] = useFetcher(dataFetcher);
  return (
    <>
      {
        fetchState === 'success'
          ? data?.data?.length > 0
            ? <Feed fetchState={fetchState} data={data} />
            : <Feed fetchState="fail" setRetry={setRetry} />
          : <Feed fetchState={fetchState} />
      }
    </>
  );
}
