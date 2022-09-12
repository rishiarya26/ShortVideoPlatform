import { useRouter } from "next/router";
import { useState } from "react";
import { trimHash } from "../../utils/string"
import MusicBlack from "../commons/svgicons/music-black";
import Verified from "../commons/svgicons/verified";
import Description from "../desk-description";
import DeskHoverInfo from "../desk-hover-info";

const VideoInfo = ({userName, firstName, lastName, description,music_title, pageType='feed',userVerified, videoSound})=>{
const [show, setShow] = useState(false);

   const router = useRouter();
   const fullName = {
       feed : `${firstName || ''} ${lastName || ''}`,
       detail : <div>{`${firstName || ''} ${lastName || ''}`}</div>
   }

    // const toHashTag =(hashtag)=>{
    //     let finalValue = hashtag;
    //     if(hashtag?.includes('#')){
    //       hashtag = trimSpace(hashtag)
    //       finalValue = trimHash(hashtag)
    //     }
    //     //  router && router?.push(`/hashtag/${finalValue}`)
    //   }
     
      // const toUser =(username)=>{
      //   // let finalValue = username;
      //   // if(hashtag?.includes('#')){
      //   //   finalValue = trimHash(hashtag)
      //   // }
      //   //  router && router?.push(`/${username}`)
      // }

      const redirect = (item) =>{
        try{  
          if(item?.indexOf('#')!==-1){
            const trimmedHashtag = trimHash(item);
            console.log("item",trimmedHashtag);
             router && router?.push(`/hashtag/${trimmedHashtag}`);
          }else
          if(item?.indexOf('@')!==-1){
            const userHandle = (item);
            // console.log("item",trimmedHashtag);
             router && router?.push(`/${userHandle}`);
          }
        }catch(e){
            console.log("error in hashtag redirect",e)
          }
        }

    return(
        <div className="header flex flex-col relative">
        <div className='text-sm text-gray-500 flex items-center'> 
         <span 
         className="usrhvr  relative hover:border-b border-black font-semibold text-base text-gray-700 cursor-pointer">
           <span className='mr-1' onClick={()=> router && router?.push(`/@${userName}`)}> {`${userName}`} 
           </span>
         <div className='usrdeck absolute z-10 top-4 -left-16'>
         <DeskHoverInfo id={userName}/>
         </div>
         </span>
          {`${fullName[pageType]}`} 
          {userVerified === 'verified' ? <div className="ml-2"><Verified/></div>:''}
        </div> 
        <div className=" text-sm font-light text-gray-600 w-8/12 mb-1">
        <Description description={description} />
     {/* {description && description?.replaceAll('\n',' ')?.split(' ').map((item,id)=>(
           <span key={id} className={item?.includes('#') ? 'text-sm font-normal text-gray-900':''}  onClick={()=>item?.includes('#') ? (toHashTag(trimHash(item))) :
            item?.includes('@') ? toUser(item) : item?.includes('https') && window?.open(item)}>{item}{' '}
            </span>
         ))} */}
     </div>
        <p className="font-medium text-sm mb-4 text-gray-700">
          {videoSound ?  <><MusicBlack/>
           {music_title}
           </> :<span className=" my-1 text-sm w-4/12 text-gray-400">
            Audio unavailable
          </span>}
        </p>
    

        {/* <div className="absolute rounded text-md font-semibold  px-6 p-0.5 right-1 top-0 border border-hipired cursor-pointer  text-hipired">
           Follow
        </div> */}
     </div>
    )
}

export default VideoInfo;