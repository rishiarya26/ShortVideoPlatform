import Explore from '../src/components/explore';
import SearchResult from '../src/components/search/search-result'
import ExploreUserList from '../src/components/explore-user-list'
import HashTag from '../src/components/explore-hashtag'
import Hashtags from '../src/components/search/hash-tags'
import Users from '../src/components/search/users';
import Sounds from '../src/components/search/sounds';

export default function Hipi() {
  return (
    <div>
    {/* <Explore /> */}
    {/* <SearchResult/> */}
    {/* <ExploreUserList/> */}
    {/* <HashTag/> */}
    <Hashtags/>
    <Users/>
    <Sounds/>
    </div>
  );
}
