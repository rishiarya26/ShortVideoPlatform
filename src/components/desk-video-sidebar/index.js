/*eslint-disable react/display-name */
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import { numberFormatter } from "../../utils/convert-to-K";
import { CopyToClipBoard } from "../../utils/web";
import Comment from "../commons/svgicons/comment-black"
import Like from "../commons/svgicons/like-black";
import Liked from "../commons/svgicons/liked";
import Share from "../commons/svgicons/share-black";
import CopyEmbedCode from "../copy-embed-code.js";
import { deleteReaction, getActivityDetails, postReaction } from '../../get-social';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/use-auth";
import { localStorage } from "../../utils/storage";
import { GET_SOCIAL_LOADED } from "../../constants";

const login = dynamic(
   () => import('../auth-options'),
   {
     loading: () => <div />,
     ssr: false
   }
 );
 
const VideoSidebar = ({likesCount: likes, shareCount, userName, videoId, socialId,
  showVideoDetail, commentCount})=>{
   const [isLiked, setIsLiked] = useState({like : false, reactionTime : 'past'});
   const [reactionCount, setReactionCount] = useState({likes : likes});

   //const getSocialLoaded = window?.sessionStorage?.getItem(GET_SOCIAL_LOADED);
 
    const {showSnackbar} = useSnackbar();
    const {show: showDialog} = useDrawer();
    const onEmbedCopy =()=>{
        showSnackbar({ message: 'Copied to Clipboard' });
     }

     const showMessage=({message})=>{
      showSnackbar({message: message});
     }

     const url = window?.location?.href;
     let domain = (new URL(url));
     domain = domain?.origin;
   //   console.log("d**",domain)

/*************** LIKE  ********************/
const showLoginOptions = () => {
showDialog('', login, 'big',{showMessage:showMessage})
};

 const like = () => {
   postReaction('like',socialId);
   setIsLiked({like : true});
   getVideoReactions(socialId, 'now', 'add');
//    const mixpanelEvents = commonEvents();
//    mixpanelEvents['UGC Id'] = activeVideoId;
//   //  mixpanelEvents['Creator Id'] = videoOwnersId;
//    const compName = comp === 'feed' ? 'Feed' : comp === 'profile' ? 'Profile Feed' : pageName === 'hashtag' ? 'Hashtag Feed' : 'Feed';
//    mixpanelEvents['Page Name'] = compName;
//    track('UGC Liked',mixpanelEvents)
} 

const disLike = () => {
  deleteReaction('like', socialId );
  setIsLiked({like : false, reactionTime: 'now'});
  getVideoReactions(socialId, 'now', 'delete')
//    const mixpanelEvents = commonEvents();
//    mixpanelEvents['UGC Id'] = activeVideoId;
//   //  mixpanelEvents['Creator Id'] = videoOwnersId;
//    const compName = comp === 'feed' ? 'Feed' : comp === 'profile' ? 'Profile Feed' : pageName === 'hashtag' ? 'Hashtag Feed' : 'Feed';
//    mixpanelEvents['Page Name'] = compName;
//    track('UGC Liked',mixpanelEvents)
} 


// const selectedLike = useAuth(showLoginOptions, like);
// const selectDisLike = useAuth(showLoginOptions, disLike);

const selectedLike = like
const selectDisLike = disLike

const getVideoReactions = async(socialId,time,action)=>{
   let isLiked;
   const details = await getActivityDetails(socialId);
   // console.log('like count',details.reactionsCount.like)
   console.log("%likes Count***",details)
   if(time === 'now') { 
     if(action === 'add'){
       setReactionCount({likes: details?.reactionsCount?.like+1 ?? likes+1})
     }else if(action === 'delete'){
       setReactionCount({likes: details?.reactionsCount?.like-1 ?? likes-1})
     }
   }else{
     setReactionCount({likes: details?.reactionsCount?.like ?? likes})
   }
 //  console.log('mrReact',details.myReactions)
   if(details?.myReactions?.length > 0){
     // console.log('my reac',details?.myReactions)
     const liked = details.myReactions.findIndex((data)=>data === 'like');
     isLiked = (liked !== -1) ? {like: true, reactionTime: 'past'} : {like: false, reactionTime: 'past'}
   }
   return isLiked;
 }

 useEffect(()=>{
   setIsLiked({like : false, reactionTime: 'past'});
      let tokens = typeof window !== "undefined" && localStorage.get('tokens');
        if (tokens?.shortsAuthToken && tokens?.accessToken )
      {
        const getLikeReaction = async()=>{  
           const isLiked =  await getVideoReactions(socialId, 'past');
           setIsLiked({like : isLiked, reactionTime: 'past'});
          }
          getLikeReaction();
      }
      // else{
      //    setReactionCount({likes : likes});
      // }
},[videoId])

useEffect(()=>{
  if(showVideoDetail === false){ 
      setIsLiked({like : false, reactionTime: 'past'});
      let tokens = typeof window !== "undefined" && localStorage.get('tokens');
      //   if (tokens?.shortsAuthToken && tokens?.accessToken )
      // {
        const getLikeReaction = async()=>{  
           const isLiked =  await getVideoReactions(socialId, 'past');
           setIsLiked({like : isLiked, reactionTime: 'past'});
          }
          getLikeReaction();
      }
    // }
      /*** not usable  */
      // else{
      //    setReactionCount({likes : likes});
      // }
      /*** */
},[showVideoDetail])

/*************** LIKE  ********************/

    return(
        <div className="sidebar flex flex-col items-center ml-4">

<div
        className={`feed relative py-2  px-3 text-center justify-end`}
      >
        { isLiked?.like ? (
          <div>
            <div
              role="presentation"
              onClick={() => selectDisLike()}
            >
              <Liked />
            </div>
            <p className="text-xs font-semibold mt-2 text-center">{isLiked?.reactionTime === 'past' ?  reactionCount?.likes > 0 ? numberFormatter(reactionCount?.likes) : ""   : reactionCount?.likes > 0 ? numberFormatter(reactionCount?.likes) : ""}</p>
          </div>
        ) : (
          <div>
            <div
              id="like"
              role="presentation" className="cursor-pointer"
              onClick={() => selectedLike()}
            >
              <Like />
            </div>
            <p className=" text-xs font-semibold mt-2 text-center">{isLiked?.reactionTime === 'past' ? reactionCount?.likes > 0 ? numberFormatter(reactionCount?.likes) : ""  : reactionCount?.likes > 0 ? numberFormatter(reactionCount?.likes) : ""}</p>
          </div>
       )
      } 

      </div>


         {/* <div className="flex flex-col items-center my-4">
            <Like />
            <span className=' text-xs font-semibold mt-2'>
            {numberFormatter(likesCount)}
            </span>
         </div> */}
         <div className="flex flex-col items-center my-4">
            <Comment />
            <span className=' text-xs font-semibold mt-2'>
            {numberFormatter(commentCount)}
            </span>
         </div>
         <div className="flex cursor-pointer flex-col items-center my-4 relative desk-share">
             <Share />
             <span className=' text-xs font-semibold mt-2'>
             {numberFormatter(shareCount)}
             </span>
            <div className='absolute w-36 share-ls hidden cursor-pointer flex-col px-4 py-2 bottom-8 left-4 bg-white border'>
               <div onClick={() => showDialog('Embed Code', CopyEmbedCode,'medium', { videoId, onEmbedCopy })} className='text-gray-600 p-2'>Embed</div>
               <div onClick={()=>{
                  console.log('v****',videoId)
                if(domain){  CopyToClipBoard(`${domain}/video/${videoId}`)
                  showSnackbar({ message: 'Copied to Clipboard' });}
            }} className='text-gray-600 p-2'>Copy Link</div>
            </div>
          </div>
      </div>
    )
}

export default VideoSidebar;