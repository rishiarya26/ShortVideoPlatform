/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import useDrawer from '../../hooks/use-drawer';
import { getItem } from '../../utils/cookie';
import AppBanner from '../app-banner';
import Img from '../commons/image';
import Close from '../commons/svgicons/close-black';
import PlaylistShare from "../commons/svgicons/playlistShare";

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

function PlaylistDrawer({data, fetchMore, playlistName="link in Bio", activeVideoId=null, callbackForIos=null, playlistId}) {
  const detectDeviceModal = dynamic(
    () => import('../open-in-app'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

  const {close, show} = useDrawer();
  const { query: { id } } = useRouter();
  const device = getItem('device-info');
  const [showBanner, setShowBanner] = useState(false);

   const drawerOnClick = ({ index }) => {
    const swiper = document.querySelector("#playlistFeedSwiper");
    swiper.swiper.slideTo(index);
  };

  const mixpanelEvents = () => {
    toTrackMixpanel("popupCta", {pageName:"Playlist Detail",ctaName:"Playlist Video",name:"playlist video", playlistName, playlistId});
  }

  useEffect(() => {
    const playlistDrawerContainer = document?.querySelector("#playlistDrawer");
    if(playlistDrawerContainer) {
      const activePlaylistVideo = playlistDrawerContainer?.querySelector(`#episode_${activeVideoId}`);
      if(activePlaylistVideo) {
        activePlaylistVideo.scrollIntoView();
      } 
    }
    // const overlayContainer = document?.querySelector(`[data-testid="dt-overlay"]`)
    // overlayContainer.onclick = close
  }, [activeVideoId])

  const shareOnClick = async() => {
    if(!navigator.canShare) {
      // toTrackMixpanel('popupCta',{page:"Playlist Detail",name:"share playlist", ctaName:"share playlist",  playlistName, playlistId});
      device === 'ios' &&  show('', detectDeviceModal, 'extraSmall');
      device === 'android' &&  setShowBanner(true);
    } else {
      try{
        toTrackMixpanel('playlistShareClick', {pageName:"Playlist Detail",playlistName, playlistId})
        toTrackMixpanel('popupCta',{pageName:"Playlist Detail",name:"Share Playlist", ctaName:"Share Playlist",  playlistName, playlistId});
        await navigator.share({text: `Check out the playlist ${playlistName} with interesting videos on Hipi https://${window.location.host}/playlist/${id}?utm_source=ios&utm_medium=playlist&utm_campaign=hipi_shared_link`});
      } catch(err){
        console.error('something went wrong', err)
      }
    }
  }

  return (
    <>
      <div className=" flex flex-col w-full">
        <div className='flex w-full justify-between py-4 items-center'>
          <div onClick={close}>
            <Close/>
          </div>
          <div className=' flex flex-col items-center'>
          <p className='font-bold capitalize'>{playlistName}</p>
            <p className='font-light text-gray-500 text-xs'>{`${ data && data?.length}`} episodes</p>

          </div>
          <div onClick={shareOnClick}>
            <PlaylistShare />
          </div>
        </div>
        
        <div id="playlistDrawer" className='overflow-y-auto'>
          {data?.map((item, index)=>{
            return(
              <div
              id={`episode_${item?.content_id}`}
              key={index}
              className={`p-2 ${item?.content_id === activeVideoId ? "playlist_bg" : ""}`}
              onClick={()=>{callbackForIos ? callbackForIos(index) : drawerOnClick({index}); close(); mixpanelEvents();}}
            >
              <span className='flex'>
                <div className='usrimg min-w-16 w-16 h-28 overflow-hidden rounded-md'>
                  <Img
                    title='Hipi'
                    data={item.thumbnail}
                    //fallback={fallbackUser?.src}
                  />
                </div>
                <div className="flex flex-col justify-center pl-4">
                <div className='text-sm text-gray-700 line-clamp-3 w-full'>
                  {item.content_description}
                </div>
                {item?.viewCount ? <div className='mt-1 text-gray-400 text-xs'>{kFormatter(item.viewCount)} views</div> : null }
                {/* <div className='mt-1 text-gray-400 text-xs'>{vCount} views</div> */}
                </div>
              </span>
            </div>
            )
          })}
        </div>
      </div>
      {showBanner ? <AppBanner notNowClick={()=>setShowBanner(false)}/>:''}
    </>
  )
}

export default PlaylistDrawer;