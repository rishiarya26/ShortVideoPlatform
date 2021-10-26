import { useRouter } from "next/router";
import { Back } from "../commons/svgicons/back";
import Close from "../commons/svgicons/close-black";
import SearchBlack from "../commons/svgicons/search-black";

  const SearchFollowers = ({searchTerm, onTermChange}) => {
   
      const router = useRouter();

    //  const onKeyboardEnter =(e) =>{
    //     //it triggers by pressing the enter key
    //     if (e?.which === 13) {
    //         handleSearch();
    //     }
    // }

    const onChange = (e)=>{
        const term = e?.currentTarget?.value;
        onTermChange(term);
    }

      return(
        <div className="relative h-20 bg-white w-full bg-white">
        <div className="flex relative bg-white p-4 items-center">
        <input
          onChange={onChange}
          className=" w-full bg-gray-100 px-4 py-2 pl-8"
          type="search"
          autoComplete="off"
          name="Search"
          value={searchTerm}
          placeholder="Search" 
        //   onKeyPress={onKeyboardEnter}
        />
        {searchTerm?.length > 0 && <button className="absolute right-0 top-2 p-4 text-semibold text-gray-600 text-sm" onClick={()=>onTermChange('')}>
        <Close />
        </button>}
        <div className="absolute left-0 top-2 p-4">
        <SearchBlack/>        </div>
        </div>
    </div>
      )
  }

  export default SearchFollowers;