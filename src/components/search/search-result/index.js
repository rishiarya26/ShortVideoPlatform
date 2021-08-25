
import Hash from '../../commons/svgicons/hash';
import Search from '../../commons/svgicons/search-black';
import RightArrow from '../../commons/svgicons/right-arrow'
import { withRouter } from 'next/router';
import ComponentStateHandler, { useFetcher } from '../../commons/component-state-handler';
import { useState } from 'react';
import { getTopSearches } from '../../../sources/explore/top';
import Img from '../../commons/image';
import { numberFormatter } from '../../../utils/convert-to-K';
import Tabs from '../../commons/tabs/search-tabs';
import TopItems from '../top';
import Users from '../users';
import Videos from '../videos';
import Sounds from '../sounds';
import Hashtags from '../hash-tags';


function SearchResult({router}) {
  const {item = ''} = router?.query;
  const components = [<TopItems item={item} />, <Users/>,<Videos/>, <Sounds/>, <Hashtags/>]; 
  const [compToShow, setCompToshow] = useState(components[0]);

 const items = {
   display : ['Top','Users', 'Videos', 'Sounds', 'Hashtags'],
   defaultValue : 0
 }

 const compToRender = (compNo)=>{
  setCompToshow(components[compNo]);
 }

  return (
    <div>
      <div className="h-screen  w-screen flex flex-col ">
        <div className="search_box p-4 w-full">
          <div className="relative">
            <input
              className=" w-full bg-gray-100 px-4 py-2 pl-8"
              type="text"
              name="Search"
              placeholder="Search" 
            />
            <div className="absolute left-1 top-2">
              <Search />
            </div>
          </div>
          <div />
        </div>

        <Tabs  items={items} compToRender={compToRender}/>
       {compToShow}
      </div>
    </div>
  );
  
}
export default withRouter(SearchResult);
