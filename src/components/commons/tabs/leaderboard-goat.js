import React from 'react';
const Tabs = ({ items, selectedIndex = 0, onTabChange }) => {
const onTabClick = (selected)=>{
onTabChange(selected);
}
return (
<div className='flex flex-col items-center'>
   <div className="rounded-full bg-gray-200  p-1 flex max-content items-center mt-6 ">
      { items?.display.map((data, id) => (
      <div
         key={id}
         id={id}
         onClick={()=>onTabClick(id)}
         className={ id === selectedIndex
         ? ' bg-white rounded-full p-2 px-6 font-semibold'
         : ' text-gray-400 px-6 font-semibold cursor-pointer'}
         >
         <span className={
         id === selectedIndex ? ' ' : ''}>{data}
         </span>
      </div>
      )) }
   </div>
   {/*     
   <div className=' rounded-full bg-gray-200 px-3 py-2 flex max-content items-center'>
                        
      <div className='bg-white rounded-full p-2 px-4 font-semibold'>English</div>
                        
      <div className='text-gray-400 px-4'>English</div>
            
   </div>
   */}
</div>
);
};
export default Tabs;