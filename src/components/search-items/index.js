import Router, { withRouter } from "next/router";
import Clock from "../commons/svgicons/clock";
import Close from "../commons/svgicons/close-black"
import SearchXs from "../commons/svgicons/search-xs";
import SearchArrow from "../commons/svgicons/search-arrow"
import { useEffect, useState } from "react";
import { getSuggestions } from "../../sources/explore/suggestions";
import debounce from "lodash.debounce";
import { localStorage } from "../../utils/storage";
import { Back } from "../commons/svgicons/back";
import RightArrow from "../commons/svgicons/right-arrow";

async function search(searchTerm, setSuggestions) {
    /* eslint-disable no-param-reassign */
        try{
          const response = await getSuggestions(searchTerm); 
          if(response.status === 'success'){
              setSuggestions(response?.data)
          }
          }
        catch(e){
           console.log("suggestions error",e)
          }
  }
  
  const optimisedSearch = debounce(search, 400);

const SearchItems = ({router,type})=>{
    const [searchTerm, setSearchTerm] = useState(undefined);
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([])
    const [showSuggestions,setShowSuggestions] = useState(false)
    
    useEffect(()=>{
        if(type === 'results'){
            const {item = ''} = router?.query;
            if(item?.length > 0){
                setSearchTerm(item);
                search(item,setSuggestions)
            }
        }
    },[])

    const onTermChange=(e)=>{
       optimisedSearch(e.currentTarget.value, setSuggestions);
       setSearchTerm(e.currentTarget.value)
    }

    const handleSearch=()=>{
        setShowSuggestions(false)
        const searchHis = searchHistory.length > 0 ? [...searchHistory] : [];
        searchHis.unshift(searchTerm)
        localStorage.set('search-suggestions-history',searchHis);
        setSearchHistory(searchHis);
        Router.push(`/search/${searchTerm}`);
    }

    const searchFromList = (e,id,value) =>{
        setShowSuggestions(false)
        if(id === 'suggestions'){
            const searchHis = [...searchHistory];
            const result = searchHis.includes(value);
            if(value && typeof(value) === 'string' && !result){
               searchHis.unshift(value)
               localStorage.set('search-suggestions-history',searchHis);
               setSearchHistory(searchHis);
            }  
        }   
        Router.push(`/search/${value}`);
    }

    useEffect(()=>{ 
        try{
            const searchHistory = localStorage.get('search-suggestions-history');
            let trimSearchHistory = []
            if(searchHistory){
                searchHistory?.some((data, id)=>{
                    trimSearchHistory.push(data)
                    if(id>1){
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
           <p className="text-gray-400">Clear All</p>
           </div>
           {searchHistory?.map((result,id)=>(
           <div key={id} className="flex flex-col w-full p-3 bg-white">
           <div className="flex justify-between w-full">
               <div onClick={(e)=>searchFromList(e,'history',result)} className="flex items-center">
                   <Clock/>
                   <p className="pl-2">{result}</p>
               </div>
           <Close />
           </div>
           </div>
        ))}
       </div>,

       suggestions:   <div className="bg-white absolute top-20 h-screen w-screen flex flex-col" >
       {suggestions?.map((suggestion,id)=>(
         <div key={id} className="flex flex-col w-full p-3 bg-white">
             <div className="flex justify-between w-full">
                 <div onClick={(e)=>searchFromList(e,'suggestions',suggestion?.suggestionTitle)} className="flex items-center ">
                     <SearchXs/>
                     <p className="pl-2">{suggestion?.suggestionTitle}</p>
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
            results : <div onClick={()=>router.back()} className="flex items-center"><Back/></div>
        }
    }

    return(
        <div className="relative h-20 bg-white w-full bg-white">
            <div className="flex relative bg-white p-4 items-center">
              {info.back[type]}
            <input
              onChange={onTermChange}
              className=" w-full bg-gray-100 px-4 py-2 pl-8"
              type="text"
              autoComplete="off"
              name="Search"
              value={searchTerm && searchTerm}
              placeholder="Search" 
              onClick={()=>setShowSuggestions(true)}
            />
            <button className="absolute right-0 top-2 p-4 text-semibold text-gray-600 text-sm" onClick={handleSearch}>
                <RightArrow/>
            </button>
            </div>
           {showSuggestions && info.list[type]}
        </div>
    )
}

export default withRouter(SearchItems)