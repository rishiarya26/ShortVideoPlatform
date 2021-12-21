import {  SwiperSlide } from 'swiper/react';
import Video from '../video';



const SwiperSlideComp = ({
    key,
                  updateSeekbar,
                  socialId,
                  url,
                  id,
                  comments,
                  likes,
                  music,
                  musicTitle,
                  profilePic,
                  userName,
                  musicCoverTitle,
                  videoid,
                  hashTags,
                  videoOwnersId,
                  thumbnail,
                  canShop,
                  shopCards,
                  handleSaveLook,
                  saveLook,
                  saved,
                  activeVideoId,
                  comp
})=>{
    return (
       <>
 
              <SwiperSlide
                key={key}
                id={id}

              >
                <Video
                    updateSeekbar={updateSeekbar}
                    socialId={socialId}
                    url={url}
                    id={id}
                    comments={comments}
                    likes={likes}
                    music={music}
                    musicTitle={musicTitle}
                    profilePic={profilePic}
                    userName={`@${userName}`}
                    musicCoverTitle={musicCoverTitle}
                    videoid={videoid}
                    hashTags={hashTags}
                    videoOwnersId={videoOwnersId}
                    thumbnail={thumbnail}
                    canShop={canShop}
                    shopCards={shopCards}
                    handleSaveLook={handleSaveLook}
                    saveLook={saveLook}
                    saved={saved}
                    activeVideoId={activeVideoId}
                    comp={comp}
                    profileFeed
                    player={'multi-player-muted'}
                />
 
              </SwiperSlide>
 
                     </>
  
    )
}

export default SwiperSlideComp;