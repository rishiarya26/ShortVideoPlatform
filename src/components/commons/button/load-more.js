
import LoadMoresvg from "../svgicons/loadmore";

const LoadMore = ({onClick, hasMore}) =>{
    return(
       <>{hasMore && 
       <button 
        onClick={onClick} 
        className='flex justify-center w-full items-center font-normal p-2 pb-6 text-gray-500 text-sm'>
          Load More 
          <LoadMoresvg/>
       </button>}
       </> 
    )
}

export default LoadMore;