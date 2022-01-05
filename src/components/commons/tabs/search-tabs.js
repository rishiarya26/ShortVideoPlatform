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
    <div className="flex items-center w-full mt-20 text-gray-400 justify-center font-semibold">
      { items?.display.map((data, id) => (
               <div
               key={id}
               id={id}
               onClick={()=>onTabClick(id)}
               className={ id === selectedIndex 
              ? 'text-black border-b-2 border-black w-1/2 flex justify-center align-center py-2'
              : ' py-2 w-1/2 flex justify-center align-center'}
          >
            <span className={
                id === selectedIndex ? 'text-black ' : ''}>{data}</span>
          </div>
      )) }
    </div>
  );
};

export default Tabs;
