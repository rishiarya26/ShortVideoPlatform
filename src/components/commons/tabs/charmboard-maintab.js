import React from 'react';
import HashTags from '../../search/hash-tags';
import Sounds from '../../search/sounds';
import TopItems from '../../search/top';
import Users from '../../search/users';
import Videos from '../../search/videos';

const Tabs = ({ items, selectedIndex = 0, onTabChange }) => {
    const onTabClick = (selected)=>{
        onTabChange(selected);
        // console.log(selected)
        // console.log(items[selected])
    }
  return (
    <div className="z-10 flex items-center w-full text-gray-400 justify-center font-semibold bg-white">
      { items?.display.map((data, id) => (
          <div
               key={id}
               id={id}
               onClick={()=>onTabClick(id)}
               className={ id === selectedIndex 
              ? ' text-gray-700 font-semibold border-b-2 border-green-600 w-1/2 flex cursor-pointer justify-center align-center py-2 text-sm'
              : ' py-2 w-1/2 flex justify-center align-center text-sm cursor-pointer'}
          >
            <span className={
                id === selectedIndex ? 'text-teal-500 ' : ''}>{data}
            </span>
            {/* Number span */}
            <span className={
                id === selectedIndex ? 'bg-green-600 text-white p-px text-xs px-2 rounded-full ml-2 flex justify-center cursor-pointer items-center' : 'bg-gray-600 cursor-pointer text-white p-px text-xs px-2 rounded-full ml-2 flex justify-center items-center'}>{items?.number?.[id]}
            </span>
          </div>
      )) }
    </div>
  );
};

export default Tabs;
