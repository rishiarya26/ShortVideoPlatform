/*eslint-disable react/jsx-key */
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
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    const item = router?.query?.item;
    console.log(item)
    setSearchTerm(item)
  },[])

  useEffect(()=>{
    const item = router?.query?.item;
    console.log(item)
    setSearchTerm(item)
  },[router.asPath])
 
  const redirectTab = (selected) =>{
    setSelectedIndex(selected)
  }
  const components = [
      <TopItems item={searchTerm} redirectTab={redirectTab}/>, 
      <Users item={searchTerm}/>,
      <Videos item={searchTerm}/>, 
      <Sounds/>, 
      <Hashtags item={searchTerm}/>
  ]; 

 const items = {
   display : ['Top','Users', 'Videos', 'Sounds', 'Hashtags'],
   defaultValue : selectedIndex
 }

 const onTabChange = (compNo)=>{
   setSelectedIndex(compNo)
 }

  return (
    <div>
      <div className="h-screen  w-screen flex flex-col ">
        <div className="search_box p-4 w-full">
        <SearchItems type='results'/>
          <div />
        </div>
        <Tabs items={items} onTabChange={onTabChange} selectedIndex={selectedIndex}/>
        {components[selectedIndex]}
      </div>
    </div>
  );
  
}
export default withRouter(SearchResult);
