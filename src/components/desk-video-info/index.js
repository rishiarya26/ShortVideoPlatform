import { trimHash } from "../../utils/string"
import MusicBlack from "../commons/svgicons/music-black";

const VideoInfo = ({userName, firstName, lastName, description,music_title, pageType='feed'})=>{

   const fullName = {
       feed :   `${firstName} ${lastName}`,
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
        <p className='text-base text-gray-500'> 
         <span className="font-bold text-base text-black cursor-pointer">{userName} </span>
          {fullName[pageType]}
        </p>
        <div className=" text-base w-8/12 mb-1">
     {description && description?.replaceAll('\n',' ')?.split(' ').map((item,id)=>(
           <span key={id} className={item?.includes('#') ? 'text-base font-semibold':''}  onClick={()=>item?.includes('#') ? (toHashTag(trimHash(item))) :
            item?.includes('@') ? toUser(item) : item?.includes('https') && window?.open(item)}>{item}{' '}
            </span>
         ))}
     </div>
        <p className="font-semibold text-base mb-4 ">
           <MusicBlack/>
           {music_title}
        </p>
        <div className="absolute rounded text-md font-semibold  px-6 p-0.5 right-1 top-0 border border-hipired text-hipired">
           Follow
        </div>
     </div>
    )
}

export default VideoInfo;