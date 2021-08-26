import Router from "next/router";
import { useState } from "react";

const SearchItems = ()=>{
    const [searchTerm, setSearchTerm] = useState(null);

    const onTermChange=(e)=>{
       setSearchTerm(e.currentTarget.value)
    }

    const handleSearch=()=>{
        Router.push(`/search-results/${searchTerm}`);
    }

    return(
        <div>
            <input
              onChange={onTermChange}
              className=" w-full bg-gray-100 px-4 py-2 pl-8"
              type="text"
              name="Search"
              placeholder="Search" 
            />
            <button onClick={handleSearch}>
                Go
            </button>
        </div>
    )
}

export default SearchItems