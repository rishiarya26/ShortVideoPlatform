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
        <p className='font-medium text-sm text-gray-600'> 
         <span className="font-bold text-xl text-black cursor-pointer">{userName}</span>
          {fullName[pageType]}
        </p>
        <div className=" text-sm w-9/12 mb-3 mt-2">
     {description && description?.replaceAll('\n',' ')?.split(' ').map((item,id)=>(
           <span key={id} className={item?.includes('#') ? 'text-sm font-semibold':''}  onClick={()=>item?.includes('#') ? (toHashTag(trimHash(item))) :
            item?.includes('@') ? toUser(item) : item?.includes('https') && window?.open(item)}>{item}{' '}
            </span>
         ))}
     </div>
        <p className="font-semibold text-sm mb-4 ">
           <MusicBlack/>
           {music_title}
        </p>
        <div className="absolute rounded-md text-md font-semibold  px-6 p-0.5 right-4 top-0 border border-hipired text-hipired">
           Follow
        </div>
     </div>
    )
}

export default VideoInfo;