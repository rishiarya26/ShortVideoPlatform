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
    <div className="z-10 flex items-center w-full text-gray-400 font-semibold bg-white">
      { items?.display.map((data, id) => (
               <div
               key={id}
               id={id}
               onClick={()=>onTabClick(id)}
               className={ id === selectedIndex 
              ? 'teal teal_border w-1/2 flex justify-center align-center py-2 text-sm'
              : ' py-2 w-1/2 flex justify-center align-center text-sm'}
          >
            <span className={
                id === selectedIndex ? 'text-teal-500 ' : ''}>{data}</span>
          </div>
      )) }
    </div>
  );
};

export default Tabs;
