import { useState } from 'react';
import SearchResults from 'components/search-results';
import { srGetTopRepos } from 'sources/repos';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const GitHubRepoList = () => {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const dataFetcher = () => srGetTopRepos({ lang: 'ruby' });
  const onDataFetched = data => {
    setItems(data.items);
    setTotalCount(data.totalCount);
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  return (
    <ComponentStateHandler
      state={fetchState}
    >
      <SearchResults items={items} totalCount={totalCount} />
    </ComponentStateHandler>
  );
};

export default GitHubRepoList;
