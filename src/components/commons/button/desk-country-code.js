/*eslint-disable  react/display-name*/
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { countryCodes } from '../../../../public/countryCode.json';
import useDrawer from '../../../hooks/use-drawer';
import ListWithSearch from '../list-with-search';

export const DeskCountryCode = ({ onValueChange, text }) => {
  const { show } = useDrawer();
  const [showList, setShowList] = useState(false);
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
     setShowList(false);
    }

    document.body.addEventListener('click',closeDrop);
    return ()=> document.body.removeEventListener('click',closeDrop);
},[])

  const ListComp =(
      <div className='list-search'>
      <ListWithSearch
        data= {countryCodes && countryCodes}
        onValueChange={onValueChange}
        type ='countryCode' 
        closeDropdown={closeDropdown}
      />
      </div>
  )

  return (
    <>
      <button
        onClick={()=>setShowList(!showList)}
        className="bg-white px-2 py-2 text-gray-600 border-b-2 border-grey-300 flex items-center"
      >
        {' '}
        +
        {text}
        <p className="text-xs pl-1">{' ▼'}</p>
      </button>
      {showList && ListComp}
    </>
  );
};
// () => show('', detectDeviceModal, 'big', { data: countryCodes && countryCodes, onValueChange, type: 'countryCode' })