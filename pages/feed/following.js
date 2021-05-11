import { useFetcher } from '../../src/components/commons/component-state-handler';
import Feed from '../../src/components/feed';
import { getHomeFeed } from '../../src/sources/feed';

export default function Hipi() {
  const dataFetcher = () => getHomeFeed({ type: 'following' });
  const [fetchState, setRetry, data] = useFetcher(dataFetcher);
  return (
    <Feed fetchState={fetchState} setRetry={setRetry} data={data} />
  );
}
