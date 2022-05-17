import { withRouter } from "next/router";
import Clock from "../commons/svgicons/clock";
import Close from "../commons/svgicons/close-black"
import SearchXs from "../commons/svgicons/search-xs";
import SearchArrow from "../commons/svgicons/search-arrow"
import { useEffect, useRef, useState } from "react";
import { getSuggestions } from "../../sources/explore/suggestions";
import debounce from "lodash.debounce";
import { localStorage } from "../../utils/storage";
import { Back } from "../commons/svgicons/back";
import RightArrow from "../commons/svgicons/right-arrow";
import Search from "../commons/svgicons/search";
import { getSearchResults } from "../../sources/search/search";
import CircularProgress from "../commons/circular-loader-search";

async function search(searchTerm, setSuggestions, setLoading) {
    /* eslint-disable no-param-reassign */
        try{
          const response = await getSuggestions(searchTerm); 
        //   console.log('search',response?.data)
          if(response.status === 'success'){
            //   console.log('search',response);
              setSuggestions(response?.data);
              setLoading && setLoading(false);
          }
          }
        catch(e){
           console.log("suggestions error",e);
           setLoading && setLoading(false);
          }
  }
  
  const optimisedSearch = debounce(search, 200);

const SearchItems = ({router,type})=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([])
    const [showSuggestions,setShowSuggestions] = useState(false)
    const [loading, setLoading] = useState(false);
    const [suggestionListIndex, setSuggestionListIndex] = useState();
    
    useEffect(()=>{
        if(type === 'results'){
            const {item = ''} = router?.query;
            if(item?.length > 0){
                setSearchTerm(item);
                search(item,setSuggestions,setLoading);
            }
        }
    },[])

    const onTermChange=(e)=>{
       setSuggestions([]);
       setLoading(true);
       optimisedSearch(e.currentTarget.value, setSuggestions, setLoading);
       setSearchTerm(e.currentTarget.value)
    }

   const removeItem = (arr) =>{
    const index = arr.indexOf(5);
    if (index > -1) {
    arr.splice(index, 1);
    }
    return arr;
   }

    const handleSearch=(term)=>{
        setShowSuggestions(false);
        console.log('TERM***',term)
        // const searchHis = searchHistory.length > 0 ? [...searchHistory] : [];
        // searchHis && removeItem(searchHis);
        // searchHis.unshift(searchTerm)
        // localStorage.set('search-suggestions-history',searchHis);
        // setSearchHistory(searchHis);
        if(term!==undefined && term!==null){
            router?.push(`/search/${term}`)
            setSearchTerm(term);
            // inputRef?.blur();
        }else{
            router?.push(`/search/${searchTerm}`)
        }
        setSuggestionListIndex(0);
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
        router?.push(`/search/${value}`);
    }
   
    const onKeyboardEnter =(e, suggestionsSelectedIndex) =>{
        console.log("SELEC",suggestionListIndex)
        console.log("kp",e.keyCode, e.which, e)
        //it triggers by pressing the enter key
        if (e?.which === 13) {
            (suggestionsSelectedIndex!==undefined && suggestionListIndex!==null) ? 
            handleSearch(suggestions?.[suggestionsSelectedIndex]?.suggestionName) :
            handleSearch(searchTerm);
            inputRef && inputRef?.current?.blur();
        }
    }

/* For click outside search, sugessions list should close */
  const inputRef = useRef();
  const searchSuggRef = useRef();

    const closeDropdown = ()=>{
       setShowSuggestions(false);
    }

    useEffect(()=>{
        const closeDrop = e =>{
            console.log(e.path[0])
            // console.log("777",e.path[0], btnContent.current, btnRef.current, searchInput.current)
        if(e.path[0] !== inputRef?.current && e.path[0] !== searchSuggRef?.current){
            closeDropdown();
        }   
        }
        document.body.addEventListener('click',closeDrop);
        return ()=> document.body.removeEventListener('click',closeDrop);
    },[])

 /* ***************** */     
 const myRefs = useRef([]);

  const handleKeyUp = (e, targetElem) => {
      console.log('**&**',e, targetElem);
    if(suggestionListIndex !==null && suggestionListIndex !==undefined){
      let tempSug = suggestionListIndex===0 ? 0 : (suggestionListIndex || 0);
    if (e?.key === "ArrowUp" && targetElem) {
        tempSug =  (tempSug > 0 ? tempSug-1 : suggestions.length-1)
      targetElem?.focus();
    }else{
        if(e?.key === "ArrowDown" && targetElem){
            tempSug = (tempSug === suggestions.length-1 ? 0 : tempSug+1) ;
            targetElem?.focus();
    }
   }
   setSuggestionListIndex(tempSug);
    }else{
        setSuggestionListIndex(0);
    }
  };

    const SuggestionsList = () =>(
        <div className="bg-white absolute left-0 top-16 min-w-28 shadow-md rounded-lg overflow-hidden flex flex-col" >
        <>{suggestions?.map((suggestion,id)=>(
            <div ref={(el)=>(myRefs.current[id] = el)}
            key={id} onClick={(e)=>searchFromList(e,'suggestions',suggestion?.suggestionName)} 
            className={`${id === suggestionListIndex ? 'bg-gray-100' : ''} flex flex-col w-full p-3 bg-white cursor-pointer`}>
                <div className="flex justify-between w-full">
                    <div  className="flex items-center ">
                        <SearchXs/>
                        <p className="pl-2">{suggestion?.suggestionName}</p>
                    </div>
                     <SearchArrow />
                </div>
            </div>
        ))}
        <div className='flex flex-col w-full p-3 bg-white cursor-pointer' 
        onClick={()=>handleSearch(searchTerm)}>{`View all results for "${searchTerm}"`}</div>
        </>
        </div>
    ) 

    return(


                <div>
                <div className={`${showSuggestions ? 'border border-gray-300' : ''} flex bg-gray-100 rounded-full py-1 min-w-28 max-w-28 px-6 pl-4 justify-between items-center relative`}>
                    <div>
                    <input
                    onChange={onTermChange}
                    className=" w-full bg-transparent px-1 py-2 pl-2"
                    type="search"
                    autoComplete="off"
                    name="Search"
                    value={searchTerm}
                    placeholder="Search Users and Videos" 
                    onClick={()=>setShowSuggestions(true)}
                    onKeyPress={(e)=>onKeyboardEnter(e,suggestionListIndex && suggestionListIndex)}
                    ref={inputRef}
                    onKeyDown={(e)=>handleKeyUp(e,myRefs?.current[suggestionListIndex])}
                    />
                    </div>
                    {/* <button className="ml-4">
                        <CloseSolid/>
                    </button> */}
                    <div className="flex items-center">
                    {searchTerm?.length > 0 && (loading ?  <CircularProgress/>:
                      <button className="ml-4" onClick={()=>setSearchTerm('')}>
                    <Close />
                    </button>)}
                    {/* bar */}
                    <div className=" ml-4 w-px h-8 bg-gray-300">
                    </div> 
                    {/* {!showSuggestions && 
                    <div className="pl-4">
                    <Search/>     
                    </div>} */}
                    <div onClick={()=>handleSearch(searchTerm)} className="pl-4 cursor-pointer">
                    <Search/>  </div>
                    </div>
                    {showSuggestions && searchTerm?.length > 0 && suggestions?.length > 0 &&
                    searchTerm?.length > 0 && 
                    <div ref={searchSuggRef}>
                    <SuggestionsList/>
                    </div>
                    }
                </div>
                </div>


            
    )
}

export default withRouter(SearchItems)