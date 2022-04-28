import { useRouter } from "next/router";
import { useState } from "react";
import { trimHash } from "../../utils/string"
import MusicBlack from "../commons/svgicons/music-black";
import DeskHoverInfo from "../desk-hover-info";

const VideoInfo = ({userName, firstName, lastName, description,music_title, pageType='feed'})=>{
const [show, setShow] = useState(false);

   const router = useRouter();
   const fullName = {
       feed : `${firstName} ${lastName}`,
       detail : <div>{`${firstName} ${lastName}`}</div>
   }

    const toHashTag =(hashtag)=>{
        let finalValue = hashtag;
        if(hashtag?.includes('#')){
          hashtag = trimSpace(hashtag)
          finalValue = trimHash(hashtag)
        }
        // router?.push(`/hashtag/${finalValue}`)
      }
     
      const toUser =(username)=>{
        // let finalValue = username;
        // if(hashtag?.includes('#')){
        //   finalValue = trimHash(hashtag)
        // }
        // router?.push(`/${username}`)
      }

    return(
        <div className="header flex flex-col relative">
        <p className='text-sm text-gray-500'> 
         <span 
         onClick={()=>router?.push(`/@${userName}`)} 
         className="usrhvr relative hover:border-b border-black font-semibold text-base text-gray-700 cursor-pointer">{`${userName} ` }
         <div className='usrdeck absolute z-50 top-4 -left-16'>
         <DeskHoverInfo id={userName}/>
         </div>  
         </span>
         
          {fullName[pageType]}
        </p>
        <div className=" text-sm font-light text-gray-600 w-8/12 mb-1">
     {description && description?.replaceAll('\n',' ')?.split(' ').map((item,id)=>(
           <span key={id} className={item?.includes('#') ? 'text-sm font-normal text-gray-900':''}  onClick={()=>item?.includes('#') ? (toHashTag(trimHash(item))) :
            item?.includes('@') ? toUser(item) : item?.includes('https') && window?.open(item)}>{item}{' '}
            </span>
         ))}
     </div>
        <p className="font-medium text-sm mb-4 text-gray-700">
           <MusicBlack/>
           {music_title}
        </p>
    

        {/* <div className="absolute rounded text-md font-semibold  px-6 p-0.5 right-1 top-0 border border-hipired cursor-pointer  text-hipired">
           Follow
        </div> */}
     </div>
    )
}

export default VideoInfo;