import { numberFormatter } from "../../utils/convert-to-K";
import Comment from "../commons/svgicons/comment-black"
import Like from "../commons/svgicons/like-black";
import Share from "../commons/svgicons/share-black";

const VideoSidebar = ({likesCount, shareCount, userName, videoId})=>{
    return(
        <div className="sidebar flex flex-col items-center ml-4">
         <div className="flex flex-col items-center my-4">
            <Like />
            {/* <span className=' text-xs font-semibold mt-2'>
            {numberFormatter(likesCount)}
            </span> */}
         </div>
         <div className="flex flex-col items-center my-4">
            <Comment />
            <span className=' text-xs font-semibold mt-2'>
               30
            </span>
         </div>
         <div className="flex flex-col items-center my-4">
            <Share />
            {/* <span className=' text-xs font-semibold mt-2'>
               {numberFormatter(shareCount)}
            </span> */}
         </div>
      </div>
    )
}

export default VideoSidebar;