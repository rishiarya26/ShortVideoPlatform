import React from 'react'
import useDrawer from '../../hooks/use-drawer';
import Img from '../commons/image';
import Close from '../commons/svgicons/close-black';
import PlaylistShare from "../commons/svgicons/playlistShare";

function PlaylistDrawer({data, fetchMore, playlistName="link in Bio", activeVideoId=null, drawerOnClick=()=>{}}) {

  const {close} = useDrawer();

  return (

    <div className=" flex flex-col w-full">
      <div className='flex w-full justify-between p-3 items-center'>
        <div onClick={close}>
          <Close/>
        </div>
        <div className='font-bold'>
          {playlistName}{`(${data.length})`}
        </div>
        <div>
          <PlaylistShare />
        </div>
      </div>
      
      <div>
        {data?.map((item, index)=>{
          return(
            <div
            key={index}
            className={`p-3 ${item?.content_id === activeVideoId ? "bg-gray-300" : ""}`}
            onClick={()=>{drawerOnClick({index}); close();}}
          >
            <span className='py-4 flex items-end whitespace-nowrap space-x-6 mr-12 lg:mr-0 cursor-pointer'>
              <div className='usrimg w-10 h-10 overflow-hidden'>
                <Img
                  title='Hipi'
                  data={item.thumbnail}
                  //fallback={fallbackUser?.src}
                />
              </div>
              <div className='text-base font-semibold text-gray-900 self-center'>
                {item.content_description}
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