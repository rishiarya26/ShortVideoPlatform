import { useState } from 'react';
import Video from '../video';
import { getHomeFeed } from '../../sources/home';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<div>Failed to fetch</div>);
const LoadComp = () => (<div>div that shimmers</div>);

export default function Feed() {
  const [items, setItems] = useState({});
  const dataFetcher = () => getHomeFeed();
  const onDataFetched = data => {
    console.log(data);
    setItems(data, () => {
      console.log(items);
    });
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div className="grid h-full">
        <div className="relative overflow-scroll w-full max-w-screen-sm Video_sheet">
          <Video />
          <Video />
          <Video />
        </div>
      </div>
    </ComponentStateHandler>
  );
}
