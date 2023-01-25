import React from 'react';

const Tabs = ({ items, selectedIndex = 0, onTabChange }) => {
    const onTabClick = (selected)=>{
        onTabChange(selected);
    }
  return (
    <div className="flex items-center w-full  mt-4 mb-2 text-gray-400 justify-center font-semibold">
      { items?.display.map((data, id) => (
          <div
               key={id}
               id={id}
               onClick={()=>onTabClick(id)}
               className={ id === selectedIndex
              ? ' goatbg px-4 flex justify-center align-center py-2 rounded-lg mx-2'
              : ' py-2 bg-gray-300 bg-opacity-60 py-2 px-4 flex justify-center align-center rounded-lg mx-2 pointer-events-none'}
          >
            <span className={
                id === selectedIndex ? 'text-white font-semibold ' : 'text-gray-400 font-semibold'}>{data}
            </span>
          </div>
      )) }
    </div>
  );
};

export default Tabs;
