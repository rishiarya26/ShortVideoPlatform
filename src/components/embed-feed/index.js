import { useState } from 'react';
import Embedvideo from '../embedvideo';
import Error from './error';
import Loading from './loader';
import { getSingleFeed } from '../../sources/feed/embed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

export default function EmbedFeed() {
  const [items, setItems] = useState({});
  const dataFetcher = () => getSingleFeed({
    page: 1
  });
  const onDataFetched = data => {
    setItems(data);
    console.log(JSON.stringify(data));
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  console.log(items);
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <Loading />
      <Embedvideo />
    </ComponentStateHandler>
  );
}
