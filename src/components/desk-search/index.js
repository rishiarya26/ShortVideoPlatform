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
import { getTopSearches } from "../../sources/explore/top";
import Img from "../commons/image";
import fallbackUsers from '../../../public/images/users.png';
import { trimHash } from "../../utils/string";

async function search(searchTerm, setSuggestions, setLoading) {
    /* eslint-disable no-param-reassign */
        try{
          const trimmedTerm = 
          (searchTerm.indexOf('#') === 0 || searchTerm.indexOf('@') === 0) ? searchTerm?.substring(1) : '';
          const response = await getSuggestions(trimmedTerm || searchTerm);
          const originalSugg = response?.data;
          const topResp = await getTopSearches(trimmedTerm || searchTerm);
          if(response.status === 'success'){
            topResp?.data?.items?.hashtags.map((item,id)=>{
                if(id < 2){
                const hashtagSugg = { suggestionName : item.hashtag, type:'hashtag'}
                originalSugg.push(hashtagSugg);
                }
            })
            topResp?.data?.items?.users.map((item,id)=>{
                if(id < 2){
                const usersSugg = { users : item, type:'users', first: id===0 ? true:false}
                originalSugg.push(usersSugg);
                }
            })
              setSuggestions(originalSugg);
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
    const [suggestions, setSuggestions] = useState({data:[]});
    const [searchHistory, setSearchHistory] = useState([])
    const [showSuggestions,setShowSuggestions] = useState(false)
    const [loading, setLoading] = useState(false);
    const [suggestionListIndex, setSuggestionListIndex] = useState();
    
    useEffect(()=>{
        if(type === 'results'){
            const {term = ''} = router?.query;
            if(term?.length > 0){
                setSearchTerm(term);
                search(term,setSuggestions,setLoading);
            }
        }
    },[])

    const onTermChange=(e)=>{ 
        if(searchTerm?.length === 0 && e?.currentTarget.value === ' '){}
        else{
            setSuggestions({data:[]});
            setLoading(true);
            optimisedSearch(e.currentTarget.value, setSuggestions, setLoading);
            setSearchTerm(e.currentTarget.value)
            setSuggestionListIndex(0);
        }
    }

   const removeItem = (arr) =>{
    const index = arr.indexOf(5);
    if (index > -1) {
    arr.splice(index, 1);
    }
    return arr;
   }

    const handleSearch=(term)=>{
       try{ 
        setShowSuggestions(false);
        if(term){
            router?.push(`/search?term=${term}`)
            setSearchTerm(term);
            // inputRef?.blur();
        }else{
            searchTerm && router?.push(`/search?term=${searchTerm}`);
        }
        setSuggestionListIndex(0);
      }catch(e){
          console.log('issue')
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
        router?.push(`/search?term=${value}`);
    }
   
    const onKeyboardEnter =(e, suggestionsSelectedIndex) =>{
        //it triggers by pressing the enter key
        if (searchTerm && e?.which === 13) {
            if((suggestionsSelectedIndex!==undefined && suggestionListIndex!==null)){
            (suggestions?.[suggestionsSelectedIndex]?.type === 'hashtag' ?redirectToHashtag(trimHash(suggestions?.[suggestionsSelectedIndex]?.suggestionName)) :
            suggestions?.[suggestionsSelectedIndex]?.type === 'users' ? redirectToUsers(suggestions?.[suggestionsSelectedIndex]?.users?.userHandle) :
            handleSearch(suggestions?.[suggestionsSelectedIndex]?.suggestionName));
        }else {
            handleSearch(searchTerm);
        }
            inputRef && inputRef?.current?.blur();
        }
    }

    const redirectToUsers = (item)=>{
      window.location.href = `/${item}`
    }

    const redirectToHashtag = (item)=>{
        window.location.href = `/hashtag/${item}`
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
    if(suggestionListIndex !==null && suggestionListIndex !==undefined){
      let tempSug = suggestionListIndex===0 ? 0 : (suggestionListIndex || 0);
    if (e?.key === "ArrowUp" && targetElem) {
        tempSug =  (tempSug > 0 ? tempSug-1 : 0);
      targetElem?.focus();
    }else{
        if(e?.key === "ArrowDown" && targetElem){
            tempSug = (tempSug === suggestions.length-1 ? suggestions.length-1 : tempSug+1);
            targetElem?.focus();
    }} 
   setSuggestionListIndex(tempSug);
    }else{
        setSuggestionListIndex(0);
      }
  };

    const SuggestionsList = () =>(
        <div className="bg-white absolute left-0 top-16 min-w-28 shadow-md h-56v rounded-lg overflow-scroll flex flex-col" >
        <>{suggestions?.map((suggestion,id)=>(
            <>
            {suggestion?.type === 'users' ? 
            <>
            {suggestion?.first && <div>Accounts</div>}
            <div 
            ref={(el)=>(myRefs.current[id] = el)} 
            onClick={()=>router.push(`/@${suggestion?.users?.userHandle}`)}
            className={`${id === suggestionListIndex ? 'bg-gray-100' : ''} flex flex-col w-full p-3 bg-white cursor-pointer`}
            >
                <div className='w-14 h-14 overflow-hidden rounded-full'>
                    <Img data={suggestion?.users?.userIcon} fallback={fallbackUsers?.src}/>
                </div>
                <div>{suggestion?.users?.userHandle}</div>
                <div>{`${suggestion?.users?.firstName || ''} ${suggestion?.users?.lastName || ''}`}</div>
            </div>
            </> :  
            <div 
            ref={(el)=>(myRefs.current[id] = el)}
            key={id} 
            onClick={suggestion?.type === 'hashtag' ? 
            ()=>router.push(`/hashtag/${trimHash(suggestion?.suggestionName)}`) : 
            (e)=>searchFromList(e,'suggestions',suggestion?.suggestionName)} 
            className={`${id === suggestionListIndex ? 'bg-gray-100' : ''} flex flex-col w-full p-3 bg-white cursor-pointer`}>
                <div className="flex justify-between w-full">
                    <div  className="flex items-center ">
                        <SearchXs/>
                        <p className="pl-2">{suggestion?.suggestionName}</p>
                    </div>
                     <SearchArrow />
                </div>
            </div>}
            </>
        ))}
        {/* {suggestions?.hashtags?.map((suggestion,id)=>(
            <div ref={(el)=>(myRefs.current[id] = el)}
            key={id} onClick={()=>router.push(`/hashtag/${suggestion?.hashtag}`)} 
            className={`${id === suggestionListIndex ? 'bg-gray-100' : ''} flex flex-col w-full p-3 bg-white cursor-pointer`}>
                <div className="flex justify-between w-full">
                    <div  className="flex items-center ">
                        <SearchXs/>
                        <p className="pl-2">{suggestion?.hashtag}</p>
                    </div>
                     <SearchArrow />
                </div>
            </div>
        ))}
        {suggestions?.userNames?.map((suggestion,id)=>(
            <div ref={(el)=>(myRefs.current[id] = el)}
            key={id} onClick={()=>router?.push(`/@${suggestion?.userHandle}`)} 
            className={`${id === suggestionListIndex ? 'bg-gray-100' : ''} flex flex-col w-full p-3 bg-white cursor-pointer`}>
                <div className="flex justify-between w-full">
                    <div  className="flex items-center ">
                        <SearchXs/>
                        <p className="pl-2">{suggestion?.userHandle}</p>
                    </div>
                     <SearchArrow />
                </div>
            </div>
        ))} */}
        <div className='flex flex-col w-full p-3 bg-white cursor-pointer' 
        onClick={()=>handleSearch(searchTerm)}>{`View all results for "${searchTerm}"`}</div>
        </>
        </div>
    ) 

    return(
                <div>
                <div className={`${showSuggestions ? 'border border-gray-300' : ''} flex bg-gray-100 rounded-full py-1 min-w-28 max-w-28 px-6 pl-4 justify-between items-center relative`}>
                    <div className='flex'>
                    <input
                    onChange={onTermChange}
                    className=" w-72 bg-transparent px-1 py-2 pl-2"
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
                    <div className='flex w-6 justify-end items-center mr-4'>
                     {searchTerm?.length > 0 && (loading ? <div> <CircularProgress/></div>:
                      <button className="ml-4" onClick={()=>setSearchTerm('')}>
                    <Close />
                    </button>)}
                    </div>
                    </div>

                    {/* <button className="ml-4">
                        <CloseSolid/>
                    </button> */}
                    <div className="flex items-center">
                   
                    {/* bar */}
                    <div className=" w-px h-8 bg-gray-300">
                    </div> 
                    {/* {!showSuggestions && 
                    <div className="pl-4">
                    <Search/>     
                    </div>} */}
                    <div onClick={()=>handleSearch(searchTerm && searchTerm)} className="pl-4 cursor-pointer">
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