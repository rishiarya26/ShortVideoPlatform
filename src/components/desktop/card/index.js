/* eslint-disable @next/next/no-img-element */
import Video from "../../desk-video";
import Mute from "../../commons/svgicons/mute";
import MusicBlack from "../../commons/svgicons/music-black";
import Comment from "../../commons/svgicons/comment-black"
import Like from "../../commons/svgicons/like-black";
import Share from "../../commons/svgicons/share-black";

const Card = ({userProfilePicUrl, userName, music_title, likesCount, video_url,firstFrame})=>{
    return (
        <div className="feed_card flex border-b-2 border-gray-300 pb-8">
        <div className="avatar">
        <div className="flex items-center w-16 h-16 overflow-hidden rounded-full cursor-pointer">
              <img alt="profile-pic" className="usrimg" src={userProfilePicUrl} />    
           </div>
        </div>
        <div className="video_section flex flex-col  w-3/4 ml-4">
           <div className="header flex flex-col relative">
                 <p> <span className="font-semibold text-lg">NAME </span> {userName}</p>
                 <p className="font-semibold text-md my-2 mb-4"> <MusicBlack/> {music_title}</p>
                 <div className="absolute rounded-md  px-6 right-4 top-0 border-2 p-2 border-hipired text-hipired">
                       Follow
                 </div>
           </div>
           <div className="Video flex items-end">
                 <div className="desk-feed rounded-md overflow-hidden relative">
                    <Video
                    url = {video_url}
                    firstFrame={firstFrame}
                    /> 
                    <div className="absolute bottom-4 right-4">
                          <Mute/>
                    </div>
                 </div>
                 <div className="sidebar flex flex-col items-center ml-4">
                    <div className="flex flex-col items-center my-4">
                 <Like />
                 {likesCount}
                 </div>
                 <div className="flex flex-col items-center my-4">
                 <Comment />
                 </div>
                 <div className="flex flex-col items-center my-4">
                 <Share />
                 455
                 </div>
                 </div>
           </div>
        </div>
        </div>
    )
}

export default Card;