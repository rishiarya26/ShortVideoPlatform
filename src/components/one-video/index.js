import { withRouter } from "next/router";
import { useEffect, useState } from "react"
import { getSingleFeed } from "../../sources/feed/embed";
import { getEffectiveVideoUrl } from "../../utils/content";
import SingleVideo from "../single-video"

const OneVideo = ({router})=>{
    const [seekedPercentage, setSeekedPercentage] = useState(0);
    const [videoUrl, setVideoUrl] = useState(null);

    const updateSeekbar = percentage => {
      setSeekedPercentage(percentage);
    };
 
    const id = router?.query?.id;
    const [item, setItem] = useState();

    const getData = async() =>{
        try{
            const data = await getSingleFeed({
                id
              });
            if(data?.status === 'success'){
                console.log("data",data)
                setItem(data?.data);
                const videoUrl = getEffectiveVideoUrl(data?.data?.video_urls);
                setVideoUrl(videoUrl);
            }  
        }
        catch(e){
               setItem({})
        }
    }
    useEffect(()=>{
        console.log("called")
        getData();
    },[])
    return(
        <>
        {item && <SingleVideo
            updateSeekbar={updateSeekbar}
            socialId={item?.getSocialId}
            url={videoUrl}
            id={item?.content_id}
            comments={item?.commentsCount}
            likes={item?.likesCount}
            music={item?.musicCoverTitle}
            musicTitle={item?.music_title}
            profilePic={item?.userProfilePicUrl}
            userName={item?.userName}
            musicCoverTitle={item?.musicCoverTitle}
            hashTags={item?.hashTags}
            canShop={item?.canShop?.status || 'fail'}
            shopCards={item?.canShop?.data}
            videoId={item?.content_id}
            poster={item?.firstFrame}
            seekedPercentage={seekedPercentage}
            description={item?.content_description}
            userId={item?.userId}
            genre={item?.genre}
        />}
      </>
    )
}

export default withRouter(OneVideo);