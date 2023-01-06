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
import deskSearch from '../../desk-search';
import Header from '../../desk-header';
import DeskMenu from '../../desk-menu';
import { trimHash } from '../../../utils/string';
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';
import { toTrackClevertap } from '../../../analytics/clevertap/events';
import { DISCOVER_SEARCH_RESULTS } from '../../../constants';

function DeskSearchResults({router}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('')

  const items = {
    display : ['Top','Users', 'Videos', 'Hashtags'],
    defaultValue : selectedIndex
  }

  useEffect(() => {
    toTrackClevertap('screenView', {pageName: DISCOVER_SEARCH_RESULTS, tabName: items?.display?.[selectedIndex]});
    toTrackMixpanel('screenView', {pageName: DISCOVER_SEARCH_RESULTS, tabName: items?.display?.[selectedIndex]});
  }, [selectedIndex])

  useEffect(()=>{
    console.log('@RRR',router)
    let item = router?.query?.term;
    console.log("ROUER",router)
    item = item?.indexOf('#') === 0 ? trimHash(item) : item;
    setSearchTerm(item);
    setSelectedIndex(0);
  },[])

  useEffect(()=>{
    let item = router?.query?.term;
    item = item?.indexOf('#') === 0 ? trimHash(item) : item;
    setSearchTerm(item);
    setSelectedIndex(0);
  },[router?.asPath])
 
  const redirectTab = (selected) =>{
    setSelectedIndex(selected)
  }
  const components = [
      <TopItems item={searchTerm} redirectTab={redirectTab}/>, 
      <Users item={searchTerm}/>,
      <Videos item={searchTerm}/>, 
      // <Sounds/>, 
      <Hashtags item={searchTerm}/>
  ]; 


 const onTabChange = (compNo)=>{
   setSelectedIndex(compNo)
 }

//  console.log("si",selectedIndex)

  return (
    <div>
      <div className="h-screen items-center w-screen flex flex-col ">
        {/* <div className="search_box w-full z-10 fixed top-0"> </div >  */}
        <Header searchType='results'/>
        <div className="flex mt-2 bg-white  w-feed relative thin_bar w-feed">
          <div className='w-feed-menu menu-sm '>
          <DeskMenu width={'w-feed-menu menu-sm-w'}/>
          </div>
          <div className='W-search pl-6 pt-24 flex flex-col no_bar'>
            <div className='w-full bg-white sticky top-16 z-9'>
            <div className='w-3/5'>
          <Tabs items={items} onTabChange={onTabChange} selectedIndex={selectedIndex}/>
          </div>
          </div>
        {components[selectedIndex]}
        </div>
      </div>
    </div>
    </div>
  );
}
export default withRouter(DeskSearchResults);
