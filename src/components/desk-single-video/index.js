import { useRouter } from "next/router"
import Header from "../desk-header"
import DeskMenu from "../desk-menu"
import VideoDetail from '../desk-video-detail';
import VideoUnavailable from "../video-unavailable";

const DeskSingleVideo = ({item, videoUrl, status})=>{
    const router = useRouter();
    return(
        <div className='flex flex-col'>
        <Header/>
        <div className='flex w-full pt-16 mt-2 relative'>
        <div className='w-2/12 w-prof-menu -mt-24 menu-sm'>
        <DeskMenu width={'w-prof-menu menu-sm-w'}/>
        </div>
       {status !== 'fail' ? <div className="w-10/12 flex flex-col pl-4">
        <div onClick={()=>router && router && router.push('/feed/for-you')} className='flex py-6  items-center cursor-pointer'>
          <svg  width="20" height="20" viewBox="0 0 48 48" fill="currentColor" ><path fillRule="evenodd" clipRule="evenodd" d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L8.82843 24L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z"></path></svg>
          <p className="text-gray-600 font-medium">Back to For You</p>
        </div>
        <VideoDetail
        userName={item?.userName} 
        likesCount={item?.likesCount} 
        music_title={item?.music_title} 
        userProfilePicUrl={item?.userProfilePicUrl} 
        url={videoUrl && videoUrl} 
        firstFrame={item?.firstFrame} 
        firstName={item?.videoOwnersDetail?.firstName}
        lastName={item?.videoOwnersDetail?.lastName} 
        description={item?.content_description} 
        videoId={item?.content_id}
        shareCount={item?.shareCount}
        socialId={item?.getSocialId}
        commentCount={item?.commentCount}
        userVerified = {item?.verified}
        comp = 'deskSingleVideo'
        videoSound={item?.videoSound}
        playlistId={item?.playlistId || "NA"}
        playlistName={item?.playlistName || "NA"}
        />
        </div> : 
       <VideoUnavailable/>
        }
        </div>
        </div>
    )
}

export default DeskSingleVideo;