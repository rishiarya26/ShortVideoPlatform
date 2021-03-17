import { useState } from 'react';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import { getHomeFeed } from '../../sources/feed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);


export default function embedFeed() {
  const [items, setItems] = useState({});
  const dataFetcher = () => getHomeFeed();
  const onDataFetched = data => {
    setItems(data);
    console.log(data);
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  console.log(items);
  
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
     <Video />
    </ComponentStateHandler>
  );
}
