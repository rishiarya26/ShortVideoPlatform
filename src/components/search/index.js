import { withRouter } from "next/router";
import { Back } from "../commons/svgicons/back";

const Search =({router})=>{
    const handleBackClick = () => {
        router.back();
      };
    
    return(
        <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-between">
        <div onClick={handleBackClick} className="p-4 h-full flex items-center justify-center">
          <Back/>
        </div>
        <div className="relative">
            <input
              className=" w-full bg-gray-100 px-4 py-2 pl-8"
              type="text"
              name="Search"
              placeholder="Search"
            />
            <div className="absolute left-1 top-2">
              <Search />
            </div>
          </div>
        </div>
    )
}

export default withRouter(Search);