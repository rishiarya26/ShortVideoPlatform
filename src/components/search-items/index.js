import Router from "next/router";
import Clock from "../commons/svgicons/clock";
import Close from "../commons/svgicons/close-black"
import SearchXs from "../commons/svgicons/search-xs";
import SearchArrow from "../commons/svgicons/search-arrow"
import { useState } from "react";

const SearchItems = ()=>{
    const [searchTerm, setSearchTerm] = useState(null);
    const toSearch=(e)=>{
       setSearchTerm(e?.currentTarget?.value)
    }

    const handleSearch=()=>{
       Router.push(`/search-results/${searchTerm}`)
    }

    return(
        <div className="relative h-40 bg-white w-full bg-white">
            <div className="flex relative bg-white p-4">
            <input
              onChange={toSearch}
              className=" w-full bg-gray-100 px-4 py-2 pl-8"
              type="text"
              name="Search"
              placeholder="Search" 
            />
            <button className="absolute right-0 top-0 p-8 text-semibold text-gray-600 text-sm" onClick={handleSearch}>
                G0
            </button>
            </div>
            {/* recent search */}
            <div className="bg-white absolute top-40 h-screen w-full flex flex-col" >
                <div className="p-3 flex w-full flex justify-between">
                    <p className="font-semibold">Recent Searches</p>
                    <p className="text-gray-400">Clear All</p>
                </div>
                <div className="flex flex-col w-full p-3 bg-white">
                    <div className="flex justify-between w-full">
                        <div className="flex items-center">
                            <Clock/>
                            <p className="pl-2">result</p>
                        </div>
<Close />
                    </div>
                </div>
                <div className="flex flex-col w-full p-3 bg-white">
                    <div className="flex justify-between w-full">
                        <div className="flex items-center ">
                            <Clock/>
                            <p className="pl-2">result</p>
                        </div>
<Close />
                    </div>
                </div>
                <div className="flex flex-col w-full p-3 bg-white">
                    <div className="flex justify-between w-full">
                        <div className="flex items-center">
                            <Clock/>
                            <p className="pl-2">result</p>
                        </div>
<Close />
                    </div>
                </div>
            </div>
            {/* SEARCH RESULT */}
            <div className="bg-white absolute top-40 h-screen w-full flex flex-col" >
                    <div className="flex flex-col w-full p-3 bg-white">
                    <div className="flex justify-between w-full">
                        <div className="flex items-center ">
                            <SearchXs/>
                            <p className="pl-2">new result</p>
                        </div>
                <SearchArrow />
                    </div>
                </div>
                <div className="flex flex-col w-full p-3 bg-white">
                    <div className="flex justify-between w-full">
                        <div className="flex items-center ">
                            <SearchXs/>
                            <p className="pl-2">new result</p>
                        </div>
                <SearchArrow />
                    </div>
                </div>
                <div className="flex flex-col w-full p-3 bg-white">
                    <div className="flex justify-between w-full">
                        <div className="flex items-center ">
                            <SearchXs/>
                            <p className="pl-2">new result</p>
                        </div>
                <SearchArrow />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchItems