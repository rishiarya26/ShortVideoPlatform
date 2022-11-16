import React from 'react'
import useDrawer from '../../hooks/use-drawer';
import Img from '../commons/image';
import Close from '../commons/svgicons/close-black';
import Share from '../commons/svgicons/share';

function PlaylistDrawer({data, fetchMore, playlistName="link in Bio"}) {

  const {close} = useDrawer();

  console.log(data,"drawer data")

  return (

    <div className=" flex flex-col w-full">
      <div className='flex w-full justify-between p-2'>
        <div onClick={close}>
          <Close/>
        </div>
        <div>
          {playlistName}
        </div>
        <div>
          <Share />
        </div>
      </div>
      
      <div>
        {data?.map((item, index)=>{
          return(
            <div
            key={index}
            //ref={(el) => (myRefs.current[index] = el)}
            // className={`${
            //   index === suggestionListIndex ? 'bg-gray-100' : ''
            // } hover:bg-gray-100`}
            //onClick={() => handleUserList(item.userId)}
          >
            <span className='py-4 flex items-end whitespace-nowrap space-x-6 mr-12 lg:mr-0 cursor-pointer'>
              <div className='usrimg w-10 h-10 overflow-hidden rounded-full'>
                <Img
                  title='Hipi'
                  data={item.thumbnail}
                  //fallback={fallbackUser?.src}
                />
              </div>

              <div className='text-sm font-normal text-gray-500'>
                <div className='text-base font-semibold text-gray-900'>
                  {item.content_description}
                </div>
                <div className='text-sm font-normal text-gray-500'>
                  {/* {item.userId} */}
                </div>
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