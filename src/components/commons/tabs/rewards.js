import React from 'react';
import Expand from '../svgicons/expand';
import Language from '../svgicons/language';

const RewardsTabs = ({ items, selectedIndex = 0, onTabChange }) => {
    const onTabClick = (selected)=>{
        onTabChange(selected);
    }
  return (
    <div className='flex justify-end w-full md:mt-20'>
    {/* <div className="flex items-center w-full  mt-4 mb-2 text-gray-400 justify-center font-semibold md:mt-24">
      { items?.display.map((data, id) => (
          <div
               key={id}
               id={id}
               onClick={()=>onTabClick(id)}
               className={ id === selectedIndex
              ? ' goatbg px-4 flex justify-center align-center py-2 rounded-lg mx-2'
              : ' py-2 bg-gray-300 bg-opacity-60 py-2 px-4 flex justify-center align-center rounded-lg mx-2'}
          >
            <span className={
                id === selectedIndex ? 'text-white font-semibold ' : 'text-gray-400 font-semibold'}>{data}
            </span>
          </div>
      )) }
    </div> */}
    <div className='absolute top-4 md:top-20 right-4'>
      <div className='border border-gray-300 bg-white rounded-md px-4  flex flex-col'>
       <div className='flex  items-center cursor-pointer py-2'>
        <div className='pr-2'> 
        <Language/> 
        </div>English <Expand/>
        </div>
        <div className='flex flex-col'>
          {/* <div className='border-b border-gray-300 flex justify-center py-1'>English</div> */}
          <div className='flex border-t border-gray-300 justify-center py-2'>Hindi</div>
       </div>
      </div>
    </div>
    </div>
  );
};

export default RewardsTabs;
