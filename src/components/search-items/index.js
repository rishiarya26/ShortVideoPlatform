import { withRouter } from "next/router";
import Clock from "../commons/svgicons/clock";
import Close from "../commons/svgicons/close-black"
import SearchXs from "../commons/svgicons/search-xs";
import SearchArrow from "../commons/svgicons/search-arrow"
import { useEffect, useState } from "react";
import { getSuggestions } from "../../sources/explore/suggestions";
import debounce from "lodash.debounce";
import { localStorage } from "../../utils/storage";
import { Back } from "../commons/svgicons/back";
import SearchBlack from "../commons/svgicons/search-black";
import { trimHash } from "../../utils/string";
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import { toTrackReco } from "../../analytics/view-events";
import { SEARCH_EVENT } from "../../constants";

async function search(searchTerm, setSuggestions,pageName, showSuggestions) {
    /* eslint-disable no-param-reassign */
        try{
          searchTerm = searchTerm?.indexOf('#') === 0 ? trimHash(searchTerm) : searchTerm   
          const response = await getSuggestions(searchTerm); 
          console.log('search',response?.data)
          if(response.status === 'success'){
              console.log('search',response)
             try{
                // toTrackMixpanel('searchSuggLoaded',{pageName:pageName},{query:searchTerm, resultsLength:response?.data?.length})
             }catch(e){
                 console.error('mixpanel issue',e);
             }
              setSuggestions(response?.data)
          }
          }
        catch(e){
           console.log("suggestions error",e)
          }
  }
  
  const optimisedSearch = debounce(search, 400);

const SearchItems = ({router,type})=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([])
    const [showSuggestions,setShowSuggestions] = useState(false)

    const pageName = (type === 'explore') ? 'Discover' : (type === 'results') && 'Discover Search Results';
    
    useEffect(()=>{
        if(type === 'results'){
            const {term: item = ''} = router?.query;
            if(item?.length > 0){
                setSearchTerm(item);
                search(item,setSuggestions, pageName, showSuggestions)
            }
        }
    },[])

    const onTermChange=(e)=>{
       optimisedSearch(e.currentTarget.value, setSuggestions);
       setSearchTerm(e.currentTarget.value)
    }

   const removeItem = (arr) =>{
    const index = arr.indexOf(5);
    if (index > -1) {
    arr.splice(index, 1);
    }
    return arr;
   }

    const handleSearch=()=>{
       try{
        toTrackMixpanel('searchBtnClicked',{pageName:pageName},{query: trimHash(searchTerm || '')})
        window.sessionStorage.setItem('searchExecuted','true');
        toTrackReco(SEARCH_EVENT,{"message": searchTerm, "objectID": "primary_search_query_response", "position": "0", "queryID": "primary_search_query_response"})
        setShowSuggestions(false)
        const searchHis = searchHistory.length > 0 ? [...searchHistory] : [];
        searchHis && removeItem(searchHis);
        searchHis.unshift(searchTerm)
        localStorage.set('search-suggestions-history',searchHis);
        setSearchHistory(searchHis);
        // window.sessionStorage.setItem('searchTerm',searchTerm)
        searchTerm?.indexOf('#') === 0 ?  router && router?.push(`/search?term=%23${trimHash(searchTerm)}`) :  router && router?.push(`/search?term=${searchTerm}`)
     }catch(e){
         console.error('search btn clicked',e)
     }
    }

    const searchFromList = (e,id,value) =>{
        setShowSuggestions(false)
        if(id === 'suggestions'){
            const searchHis = [...searchHistory];
            const result = searchHis.includes(value);
            if(value && typeof(value) === 'string' && !result){
                setSearchTerm(value)
               searchHis && removeItem(searchHis);
               searchHis.unshift(value)
               localStorage.set('search-suggestions-history',searchHis);
               setSearchHistory(searchHis);
            }  
        }   
        toTrackMixpanel('searchSuggSelected',{pageName:pageName},{query:searchTerm, suggestionSelected:value})
        window.sessionStorage.setItem('searchExecuted','true');
        // window.sessionStorage.setItem('searchTerm',searchTerm)
        toTrackReco(SEARCH_EVENT,{"message": searchTerm, "objectID": "autocomplete_search_query_response", "position": "0", "queryID": "autocomplete_search_query_response"})
        value?.indexOf('#') === 0 ?  router && router?.push(`/search?term=%23${trimHash(value)}`) :  router && router?.push(`/search?term=${value}`)
        //  router && router?.push(`/search?term=${value}`);
    }

//     const onSearchHistoryDelete =(e) =>{
// console.log(e.currentTarget.id)
//       const index = searchHistory.findIndex((data)=> data === e?.currentTarget?.id);
//       const finalData = searchHistory.splice(index,1);
//       setSearchHistory(finalData);
//       console.log(finalData)
//     }

    useEffect(()=>{ 
        try{
            const searchHistory = localStorage.get('search-suggestions-history');
            let trimSearchHistory = []
            if(searchHistory){
                searchHistory?.some((data, id)=>{
                    trimSearchHistory.push(data)
                    if(id>5){
                        return true;
                }})
            }
            searchHistory && setSearchHistory(trimSearchHistory);
        }
        catch(e){
          console.log("error in extracting data from local Storage", e)
        }
    },[])

    const toShowList = {
        searchHistory :   <div className="bg-white absolute top-14 h-screen w-full flex flex-col" >
      
           <div  className="p-3 flex w-full flex justify-between">
           <p className="font-semibold">Recent Searches</p>
           {/* <p className="text-gray-400">Clear All</p> */}
           </div>
           {searchHistory?.map((result,id)=>(
           <div key={id} className="flex flex-col w-full p-3 bg-white">
           <div className="flex justify-between w-full">
               <div onClick={(e)=>searchFromList(e,'history',result)} className="flex items-center">
                   <Clock/>
                   <p className="pl-2">{result}</p>
               </div>
          {/* <div id={result} onClick={onSearchHistoryDelete}> <Close /></div> */}
           </div>
           </div>
        ))}
       </div>,

       suggestions:   <div className="bg-white absolute top-20 h-screen w-screen flex flex-col" >
       {suggestions?.map((suggestion,id)=>(
         <div key={id} onClick={(e)=>searchFromList(e,'suggestions',suggestion?.suggestionName)} className="flex flex-col w-full p-3 bg-white">
             <div className="flex justify-between w-full">
                 <div  className="flex items-center ">
                     <SearchXs/>
                     <p className="pl-2">{suggestion?.suggestionName}</p>
                 </div>
         <SearchArrow />
             </div>
         </div>
       ))}
       </div>
    }

    const info = {
        list : {
            explore : (searchTerm?.length > 2 ? toShowList['suggestions'] : toShowList['searchHistory']),
            results : (searchTerm?.length > 2 && toShowList['suggestions'])
        },
        back : {
            // if show suggestions is true then show back button on explore 
            explore : showSuggestions && <div onClick={()=>setShowSuggestions(false)}><Back/></div>,
            results : <div onClick={()=>router?.back()} className="flex items-center"><Back/></div>
        }
    }

    const onKeyboardEnter =(e) =>{
        console.log("kp",e.keyCode, e.which, e)
        //it triggers by pressing the enter key
        if (e?.which === 13) {
            handleSearch();
        }
    }

    return(
        <div className="relative h-20 bg-white w-full bg-white">
            <div className="flex relative bg-white p-4 items-center">
              {info.back[type]}
            <input
              onChange={onTermChange}
              className=" w-full bg-gray-100 text-base flex items-center px-4 py-2 pl-8"
              type="search"
              autoComplete="off"
              name="Search"
              value={searchTerm}
              placeholder="Search" 
              onClick={()=>{
                toTrackMixpanel('searchInitiated',{pageName:pageName})  
                setShowSuggestions(true)}}
              onKeyPress={onKeyboardEnter}
            />
            {searchTerm?.length > 0 && <button className="absolute right-2 top-2 p-4 text-semibold text-gray-600 text-sm" 
             onClick={()=>{
                 toTrackMixpanel('searchCancelled',{pageName: pageName},{query: searchTerm})
                 setSearchTerm('')}}>
            <Close />
            </button>}
           {type === 'explore' && !showSuggestions && <div className="absolute left-1 top-1 p-4 py-5">
              <SearchBlack/>       
            </div>}
            </div>
           {showSuggestions && info.list[type]}
           {showSuggestions && suggestions?.length > 2 && toTrackMixpanel('searchSuggLoaded',{pageName:pageName},{query:searchTerm, resultsLength:suggestions?.length})}
        </div>
    )
}

export default withRouter(SearchItems)