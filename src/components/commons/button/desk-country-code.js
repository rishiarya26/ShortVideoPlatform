/*eslint-disable  react/display-name*/
import { useEffect, useRef, useState } from 'react';
import { countryCodes } from '../../../../public/countryCode.json';
import ListWithSearch from '../list-with-search';

export const DeskCountryCode = ({ onValueChange, text }) => {
  const [showList, setShowList] = useState(false);
  const btnRef = useRef();
  const btnContent = useRef();
  const searchInput = useRef();
//   const detectDeviceModal = dynamic(
//     () => import('../list-with-search'),
//     {
//       loading: () => <div />,
//       ssr: false
//     }
//   );

const closeDropdown = ()=>{
    setShowList(false);
}

useEffect(()=>{
    const closeDrop = e =>{
        // console.log("777",e.path[0], btnContent.current, btnRef.current, searchInput.current)
     if(e.path[0] !== btnRef?.current && e.path[0] !== btnContent?.current &&
         e.path[0] !== searchInput?.current){
        closeDropdown();
     }   
    }
    document.body.addEventListener('click',closeDrop);
    return ()=> document.body.removeEventListener('click',closeDrop);
},[])

  return (
    <>
      <button
        ref={btnRef}
        onClick={()=>setShowList(!showList)}
        className="bg-white px-2 py-2 text-gray-600 border-b-2 border-grey-300 flex items-center"
      >
        {' '}
        +
        {text}
        <p onClick={()=>setShowList(!showList)} className="text-xs pl-1">{' ▼'}</p>
      </button>
      {showList && 
            <div ref={btnContent} className='list-search thin_bar overflow-x-hidden'>
            <ListWithSearch
              data= {countryCodes && countryCodes}
              onValueChange={onValueChange}
              type ='countryCode' 
              closeDropdown={closeDropdown}
              searchInputRef={searchInput}
            />
            </div>
      }
    </>
  );
};
