import React, { useEffect, useState } from 'react';

const Tabs = ({ items, defaultValue = 0, compToRender }) => {
    const [selected, setSelected] = useState(null)

    useEffect(()=>{
        setSelected(defaultValue)
    },[])

    const onTabClick = (selected)=>{
        setSelected(selected);
        compToRender(selected);
    }
  return (
    <div className="flex items-center w-full text-gray-400 justify-center font-semibold">
      { items?.display.map((data, id) => (
               <div
               key={id}
               id={id}
               onClick={()=>onTabClick(id)}
               className={ id === selected 
              ? 'text-black border-b-2 border-black w-1/2 flex justify-center align-center py-2'
              : ' py-2 w-1/2 flex justify-center align-center'}
          >
            <span className={
                id === selected ? 'text-black ' : ''}>{data}</span>
          </div>
      )) }
    </div>
  );
};

export default Tabs;
