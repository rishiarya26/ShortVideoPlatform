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
      
      if (
        e?.target !== btnRef?.current &&
        e?.target !== btnContent?.current &&
        e?.target !== searchInput?.current &&
        e?.target?.parentElement !== btnRef?.current
      ) {
        closeDropdown();
      }
      
    }
    document?.body?.addEventListener('click',closeDrop);
    return ()=> document?.body?.removeEventListener('click',closeDrop);
},[])

useEffect(() => {
  console.log(showList)
}, [showList])

  return (
    <>
      <button
        type="button"
        ref={btnRef}
        onClick={()=>setShowList(prev => !prev)}
        className="cursor-pointer bg-white px-2 py-2 text-gray-600 border-b-2 border-grey-300 flex items-center"
      >
        {' '}
        +
        {text}
        <p className="text-xs pl-1 cursor-pointer">{' ▼'}</p>
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
