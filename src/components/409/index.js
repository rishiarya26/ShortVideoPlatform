/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities */

import { withBasePath } from '../../config';
import Header from '../desk-header';
import StaticFooter from '../static-footer';

function Error409() {
  return (
    <div className="h-screen  w-screen flex flex-col justify-between">
    
    <div className='hidden md:flex'>
    <Header/>
    </div>
    <div className='w-full flex flex-col items-center py-12 md:mt-16 md:py-20'>
        <div className='w-full md:w-1/4 p-8 md:pt-12 md:px-0'>
        <img  src={withBasePath('images/409.png')} alt="hipi logo" /> 
        </div>
        <div className='w-full flex-col flex p-8 md:px-20 md:pb-12 justify-center'> 
        
           <p className='text-gray-500 text-center font-semibold text-xl pt-4 px-4 md:px-16'>
           User doesn’t exist
          </p>
        </div>
    </div>
  
    <StaticFooter/>
  </div>
  );
}

export default Error409;

