/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-no-duplicate-props */
import { useRouter } from 'next/router';
import { useState } from 'react';
import faq from '../../../public/stunner-FAQ.json'
import { withBasePath } from '../../config';
import CloseFaq from '../commons/svgicons/close-faq';
import OpenFaq from '../commons/svgicons/open-faq';
import StaticFooter from '../static-footer';

function Stunner() {
 const [items, setItems] = useState(faq?.faq);
 const router = useRouter()

 const links={
  facebook : 'https://www.facebook.com/HiPiOfficialApp',
  twitter : 'https://twitter.com/HiPiOfficialApp',
  instagram : 'https://www.instagram.com/hipiofficialapp/?hl=en'
}

const stores = {
  android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
  ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
};

const onStoreRedirect =(device)=>{
  device && (window.location.href = `${stores[device]}`);
}

 const handleClick = (id) =>{
   let updateItem = [...items];
   updateItem[id].show = !(updateItem[id]?.show);
   setItems(updateItem);
 }
  return (
    <div className="w-full h-full">
       <div className=" headerbar w-full h-18 flex items-center fixed top-0 lg:px-10 px-4 py-2 justify-between">
        <img alt="" className="w-16" src={withBasePath('images/stunner/stunner-logo.png')} alt="hipi logo" /> 
        <div className='flex text-white font-medium'>
          <a className='px-4'>Challangers</a>
          <a className='px-4'>Winners</a>
          <a className='px-4'>Contact</a>
        </div>
      </div>

<div className="flex justify-center items-center flex-col section_1 relative">
  <img alt="" src={withBasePath('images/stunner/stunner_banner.png')} />
</div>



<div className="flex flex-col p-8 px-44">
  <div className='w-full flex justify-center text-3xl font-semibold pb-6'>Frequently Asked Questions</div>
{items?.map((data, id)=>(
  <div key={id} className="mt-6">
  <div id={id} className="cursor-pointer transition duration-500 ease-in-out flex items-center font-medium" onClick={()=>handleClick(id)}>
    <span className="pr-2 flex" >{data.show ? <CloseFaq/> : <OpenFaq/>}</span>
     {data.ques}
     </div>
  {data.show && <div id={id} className="pt-2 pl-6 text-gray-700 transition duration-500 ease-in-out"> {data.ans}</div>}
  </div>
))}
</div>
    
      <StaticFooter/>
    </div>
  );
}

export default Stunner;

