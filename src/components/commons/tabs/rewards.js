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
    <div className='relative pr-4'>
      <div className='bg-gray-100 rounded-md px-4 py-2 flex items-center cursor-pointer'>
       <div className='pr-2'> <Language/> </div>English <Expand/>
      </div>
    </div>
    </div>
  );
};

export default RewardsTabs;
