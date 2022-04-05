import useDialog from "../../hooks/use-dialog";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import { numberFormatter } from "../../utils/convert-to-K";
import { CopyToClipBoard } from "../../utils/web";
import Comment from "../commons/svgicons/comment-black"
import Like from "../commons/svgicons/like-black";
import Share from "../commons/svgicons/share-black";
import CopyEmbedCode from "../copy-embed-code.js";

const VideoSidebar = ({likesCount, shareCount, userName, videoId})=>{
    const {showSnackbar} = useSnackbar();
    const {show: showDialog} = useDrawer();
    const onEmbedCopy =()=>{
        showSnackbar({ message: 'Copied to Clipboard' });
     }

     const url = window?.location?.href;
     let domain = (new URL(url));
     domain = domain?.origin;
   //   console.log("d**",domain)
    return(
        <div className="sidebar flex flex-col items-center ml-4">
         <div className="flex flex-col items-center my-4">
            <Like />
            <span className=' text-xs font-semibold mt-2'>
            {numberFormatter(likesCount)}
            </span>
         </div>
         <div className="flex flex-col items-center my-4">
            <Comment />
            <span className=' text-xs font-semibold mt-2'>
               30
            </span>
         </div>
         <div className="flex cursor-pointer flex-col items-center my-4 relative desk-share">
             <Share />
             <span className=' text-xs font-semibold mt-2'>
             {numberFormatter(shareCount)}
             </span>
            <div className='absolute w-36 share-ls hidden cursor-pointer flex-col p-4 bottom-8 left-4 bg-white border'>
               <div onClick={() => showDialog('Embed Code', CopyEmbedCode,'medium', { videoId, onEmbedCopy })} className='text-gray-600 p-2'>Embed</div>
               <div onClick={()=>{
                  console.log('v****',videoId)
                if(domain){  CopyToClipBoard(`${domain}/@${userName}/video/${videoId}`)
                  showSnackbar({ message: 'Copied to Clipboard' });}
            }} className='text-gray-600 p-2'>Copy Link</div>
            </div>
          </div>
      </div>
    )
}

export default VideoSidebar;