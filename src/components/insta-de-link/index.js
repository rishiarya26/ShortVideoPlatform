
/* eslint-disable @next/next/no-img-element*/

import { withBasePath } from '../../config';
import StaticFooter from '../static-footer';
import Header from '../desk-header';

const InstaDeLink = ({socialHandles,name}) =>{
    return(
        <>
    <div className="h-screen  w-screen flex flex-col justify-between">
    
      <div className='hidden md:flex'>
      <Header/>
      </div>
      <div className='w-full flex flex-col items-center py-12 md:mt-16 md:py-20'>
          <div className='w-full md:w-1/4 p-8 md:pt-12 md:px-0'>
          <img  src={withBasePath('images/de-link.png')} alt="hipi logo" /> 
          </div>
          <div className='w-full flex-col flex p-8 md:px-20 md:pb-12 justify-center'> 
          {socialHandles === null  ?
            <p className='text-gray-500 text-center font-semibold text-xl pt-4 px-4 md:px-16'>
            Instagram account de-linked successfully for {name}
            </p> : 
             <p className='text-gray-500 text-center font-semibold text-xl pt-4 px-4 md:px-16'>
             Instagram account de-linking is in progress for {name}
            </p>
            }  
          </div>
      </div>
    
      <StaticFooter/>
    </div>
    </>
    )
}

export default InstaDeLink;