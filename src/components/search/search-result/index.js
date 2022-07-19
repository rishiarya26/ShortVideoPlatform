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
import { trimHash } from '../../../utils/string';
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';
import { DISCOVER_SEARCH_RESULTS, SEARCH_EVENT } from '../../../constants';
import { toTrackReco } from '../../../analytics/view-events';

function SearchResult({router}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('')

  const pageName = 'Discover Search Results'
  let searchedTerm = router?.query?.term;

  useEffect(()=>{
    let item = router?.query?.term;
    item = item?.indexOf('#') === 0 ? trimHash(item) : item;
    setSearchTerm(item);
    toTrackMixpanel('screenView',{pageName:DISCOVER_SEARCH_RESULTS, tabName: items?.display?.[selectedIndex]})
  },[])

  useEffect(()=>{
    let item = router?.query?.term;
    item = item?.indexOf('#') === 0 ? trimHash(item) : item;
    setSearchTerm(item)
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

 const items = {
   display : ['Top','Users', 'Videos', 'Hashtags'],
   defaultValue : selectedIndex
 }

 const onTabChange = (compNo)=>{
  try{
    const trackReco={
     0: null,
     1 : ()=>toTrackReco(SEARCH_EVENT,{"message": searchedTerm, "objectID": "user_tab_secondary_query", "position": "0", "queryID": "user_tab_secondary_query"}),
     2 : ()=>toTrackReco(SEARCH_EVENT,{"message": searchedTerm , "objectID": "video_tab_secondary_query", "position": "0", "queryID": "video_tab_secondary_query"}),
     3 : ()=>toTrackReco(SEARCH_EVENT,{ "message": searchedTerm, "objectID": "hashtag_tab_secondary_query", "position": "0", "queryID": "hashtag_tab_secondary_query"}) 
   }
   trackReco?.[compNo]?.();

   const trackMixpanel={
    0: ()=>toTrackReco('cta',{pageName:DISCOVER_SEARCH_RESULTS, tabName:items?.display?.[selectedIndex], elemant:items?.display?.[selectedIndex]}),
    1 : ()=>toTrackReco('cta',{pageName:DISCOVER_SEARCH_RESULTS, tabName:items?.display?.[selectedIndex], elemant:items?.display?.[selectedIndex]}),
    2 : ()=>toTrackReco('cta',{pageName:DISCOVER_SEARCH_RESULTS, tabName:items?.display?.[selectedIndex], elemant:items?.display?.[selectedIndex]}),
    3 : ()=>toTrackReco('cta',{pageName:DISCOVER_SEARCH_RESULTS, tabName:items?.display?.[selectedIndex], elemant:items?.display?.[selectedIndex]}) 
  }
  trackMixpanel?.[compNo]?.();
  }catch(e){
    console.error("reco event",e)
  }
   setSelectedIndex(compNo)
 }

//  console.log("si",selectedIndex)

  return (
    <div>
      <div className="h-screen  w-screen flex flex-col ">
        <div className="search_box w-full z-10 fixed top-0">
        <SearchItems type='results'/>
          <div />
        </div >
        <Tabs items={items} onTabChange={onTabChange} selectedIndex={selectedIndex}/>
        {components[selectedIndex]}
      </div>
    </div>
  );
  
}
export default withRouter(SearchResult);
