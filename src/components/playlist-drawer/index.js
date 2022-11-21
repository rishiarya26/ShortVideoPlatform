import React from 'react'
import useDrawer from '../../hooks/use-drawer';
import Img from '../commons/image';
import Close from '../commons/svgicons/close-black';
import PlaylistShare from "../commons/svgicons/playlistShare";

function PlaylistDrawer({data, fetchMore, playlistName="link in Bio", activeVideoId=null}) {

  const {close} = useDrawer();
  const vCount = 365;

   const drawerOnClick = ({ index }) => {
    const swiper = document.querySelector("#playlistFeedSwiper");
    swiper.swiper.slideTo(index);
  };

  return (

    <div className=" flex flex-col w-full">
      <div className='flex w-full justify-between py-4 items-center'>
        <div onClick={close}>
          <Close/>
        </div>
        <div className=' flex flex-col items-center'>
        <p className='font-bold capitalize'>{playlistName}</p>
          <p className='font-light text-gray-500 text-xs'>{`${ data && data?.length}`} episodes</p>

        </div>
        <div>
          <PlaylistShare />
        </div>
      </div>
      
      <div className='overflow-y-auto'>
        {data?.map((item, index)=>{
          return(
            <div
            key={index}
            className={`p-2 ${item?.content_id === activeVideoId ? "bg-gray-100" : ""}`}
            onClick={()=>{drawerOnClick({index}); close();}}
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
                {item.content_description}The dot prefix indicates that it is a #class#selector#and#will match an HTML element which is a member
              </div>
              {/* {item?.vCount && item?.vCount > 0 ? <div>{item.vCount}</div> : null } */}
              <div className='mt-1 text-gray-400 text-xs'>{vCount} views</div>
              </div>
            </span>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlaylistDrawer;