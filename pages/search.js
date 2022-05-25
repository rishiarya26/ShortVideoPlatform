import SearchResult from '../src/components/search/search-result';

import DeskSearchResults from '../src/components/desk-search-result/search-result'
import { getItem } from '../src/utils/cookie';

export default function Hipi() {
  const device = getItem('device-type');
  return (
   <>
   {device === 'mobile' ?  <SearchResult /> : 
    device === 'desktop' && <DeskSearchResults/>}
   </>
  );
}