
import Search from '../../commons/svgicons/search-black';
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Tabs from '../../commons/tabs/search-tabs';
import TopItems from '../top';
import Users from '../users';
import Videos from '../videos';
import Sounds from '../sounds';
import Hashtags from '../hash-tags';
import SearchItems from '../../search-items';

function SearchResult({router}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [compToShow, setCompToshow] = useState();

  const {item = ''} = router?.query;
  const redirectTab = (selected) =>{
    setSelectedIndex(selected)
  }
  const components = [<TopItems item={item} redirectTab={redirectTab}/>, <Users item={item}/>,<Videos item={item}/>, <Sounds/>, <Hashtags item={item}/>]; 

 const items = {
   display : ['Top','Users', 'Videos', 'Sounds', 'Hashtags'],
   defaultValue : selectedIndex
 }

 const onTabChange = (compNo)=>{
   setSelectedIndex(compNo)
 }

 useEffect(()=>{
   setCompToshow(components[selectedIndex])
 },[selectedIndex])

  return (
    <div>
      <div className="h-screen  w-screen flex flex-col ">
        <div className="search_box p-4 w-full">
          <SearchItems/>
          {/* <div className="relative">
            <input
              className=" w-full bg-gray-100 px-4 py-2 pl-8"
              type="text"
              name="Search"
              placeholder="Search" 
            />
            <div className="absolute left-1 top-2">
              <Search />
            </div>
          </div> */}
          <div />
        </div>

        <Tabs  items={items} onTabChange={onTabChange} selectedIndex={selectedIndex}/>
       {compToShow}
      </div>
    </div>
  );
  
}
export default withRouter(SearchResult);
