/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { withBasePath } from "../../config";
import StaticFooter from "../static-footer";
import Form from "./form";
import HeaderBusiness from "./header";
  

function Business() {
   const router = useRouter()
useEffect(()=>{
   toTrackMixpanel('screenView',{pageName:'Business'});
   toTrackFirebase('screenView',{page:'Business'});
   ToTrackFbEvents('screenView',{page:'Business'})
})
return (
   <>
  <div className=" flex flex-col justify-center items-center">
   <HeaderBusiness type="toFeed"/>
   <div className="h-screen overflow-hidden pt-16 flex justify-center items-center z-9 relative w-screen">
      <div className="flex flex-col  justify-center items-center z-10">
         <h1 className="text-4xl md:text-8xl font-bold text-gray-700 ">Advertise  your Brand</h1>
         <h1 className="text-4xl md:text-8xl font-bold text-gray-700 ">on  Hipi</h1>
         <p className=" my-2 md:my-6 text-lg text-center md:text-3xl text-gray-600 font-medium">Let your campaign take you beyond your imagination</p>
         {/* <div className="mx-2 my-2 font-semibold  border border-hipired rounded py-2 px-4 bg-hipired text-white cursor-pointer">
            Create Now
            </div> */}
      </div>
      <div className="absolute top-left rounded-lg overflow-hidden moveup">
            <img alt='Hipi Advertisement' src={withBasePath('images/advertisement/gif/dance.gif')} />
      </div>
      <div className="absolute bottom-right rounded-lg overflow-hidden movedown">
            <img alt='Hipi Advertisement' src={withBasePath('images/advertisement/gif/travel.gif')} />
      </div>
      <div className="hidden md:flex absolute top-m rounded-lg overflow-hidden moveup">
            <img alt='Hipi Advertisement' src={withBasePath('images/advertisement/gif/food.gif')} />
      </div>
      <div className="absolute top-right rounded-lg overflow-hidden movedown">
            <img alt='Hipi Advertisement' src={withBasePath('images/advertisement/gif/gym.gif')} />
      </div>
      <div className="hidden md:flex absolute bottom-m rounded-lg overflow-hidden moveup">
            <img alt='Hipi Advertisement' src={withBasePath('images/advertisement/gif/sport.gif')} />
      </div>
      <div className="absolute  bottom-left rounded-lg overflow-hidden moveup">
            <img alt='Hipi Advertisement' src={withBasePath('images/advertisement/gif/fashion.gif')} />
      </div>
   </div>
   <div className="w-full justify-center flex bg_ocean_pastel py-6 md:py-12  ">
      <div className="flex w-full w-feed items-center flex-col">
         <h3 className="text-4xl md:text-5xl w-full my-4 font-bold text-gray-600 px-4">Success stories</h3>
       
         <div className="flex flex-col md:flex-row w-full justify-between p-12">
            <div className="w-full md:w-1/3 md:px-4 overflow-hidden flex flex-col items-center">
            <div className="w-full rounded-2xl overflow-hidden  box_shadow_1 ">
            {/* <img alt='Hipi Advertisement' src={withBasePath('images/advertisement/gif/travel.gif')} /> */}
            <img alt='Hipi Advertisement' src={withBasePath('business/RRR.gif')} />
            </div>
            <h3 className="text-gray-600 py-4 text-2xl font-semibold">#RRR</h3>
            {/* <button className="mx-2 my-2 font-semibold  border border-hipired rounded py-2 px-4 bg-hipired text-white cursor-pointer">Learn more</button> */}
            </div>
            <div className="w-full md:w-1/3 md:px-4 overflow-hidden flex flex-col items-center">
            <div className="w-full rounded-2xl overflow-hidden  box_shadow_1 ">
            <img alt='Hipi Advertisement' src={withBasePath('business/SPH.gif')} />
            </div>
            <h3 className="text-gray-600 py-4 text-2xl font-semibold">#SahiPakdeHain</h3>
            {/* <button className="mx-2 my-2 font-semibold  border border-hipired rounded py-2 px-4 bg-hipired text-white cursor-pointer">Learn more</button> */}
           
            </div>
            <div className="w-full md:w-1/3 md:px-4 overflow-hidden flex flex-col items-center">
            <div className="w-full rounded-2xl overflow-hidden  box_shadow_1">
            <img alt='Hipi Advertisement' src={withBasePath('business/SuperMom.gif')} />
            </div>
            <h3 className="text-gray-600 py-4 text-2xl font-semibold">#SuperMomIndia</h3>
            {/* <button className="mx-2 my-2 font-semibold  border border-hipired rounded py-2 px-4 bg-hipired text-white cursor-pointer">Learn more</button> */}
            </div>
         </div>
         </div>
   </div>


  <div className=" w-full">
   <div className="flex justify-center py-8 md:py-32   md:h-auto ">
      <div className="w-feed flex flex-col justify-center items-center md:flex-row md:justify-between ">
         <div className="text-4xl md:text-6xl md:w-2/3 mb-4 font-bold text-gray-600 px-4 flex md:px-6"><h3>Advertising solutions</h3></div>
         <p className="w-full md:w-1/3 text-gray-800 px-4 text-lg font-medium">Hipi creates discovery, awareness and engagement with inspiring products and ideas thereby moving them further along the purchasing process in an immersive, contextual, yet non-intrusive manner.</p>
</div>
</div>
<div className="flex flex-col md:flex-row items-center justify-center py-8">
               <div className="flex flex-col items-center my-4 md:my-0 p-8 md:mx-8 box_shadow_1 cursor-pointer w-max" onClick={()=>router.push('/ads/solutions#advertise_sec')}>
                  <div className='w-40 h-40'><img alt='Hipi Advertisement' src={withBasePath('business/IconsAdvertise.png')}/></div>
                  <p className='text-lg text-gray-500 font-semibold pt-2'>Advertise</p>
               </div>
               <div className="flex flex-col items-center my-4 md:my-0 p-8 md:mx-8 box_shadow_1 cursor-pointer w-max" onClick={()=>router.push('/ads/solutions#commerce_sec')}>
               <div className='w-40 h-40'><img alt='Hipi Advertisement' src={withBasePath('business/IconsCommerce.png')}/></div>
                  <p className='text-lg text-gray-500 font-semibold pt-2'>Commerce</p>
               </div>
               <div className="flex flex-col items-center my-4 md:my-0 p-8 md:mx-8 box_shadow_1 cursor-pointer w-max" onClick={()=>router.push('/ads/solutions#engage_sec')}>
               <div className='w-40 h-40'><img alt='Hipi Advertisement' src={withBasePath('business/IconsEngage.png')}/></div>
                  <p className='text-lg text-gray-500 font-semibold pt-2'>Engage</p>
               </div>
      </div>
</div>


   <div className="w-full bg_ocean_pastel justify-center flex flex-col  items-center py-6 my-6 md:py-12 md:my-12">
   <div className="w-feed">
      <div className="flex flex-col md:flex-row justify-between">
         <h3 className="text-4xl md:text-5xl md:w-2/3 mb-4 font-bold text-gray-600 px-4">Solutions for everyone</h3>
         <p className="w-full md:w-1/3 text-base font-medium text-gray-600 px-4">Hipi has solutions for companies of all kinds and sizes.
            Whether you are starting a new business, or already have an established brand, Hipi offers right solutions for all your marketing needs.</p>
      </div>
      <div className="flex justify-around md:justify-between w-feed flex-wrap p-4 md:py-12 md:px-32">
            <div className="w-1/3 md:w-1/4 md:p-4 m-4 ">
               <img alt='Hipi Advertisement' className="object-contain" src={withBasePath('images/advertisement/logo/amazon.png')} />
            </div>
            <div className="w-1/3 md:w-1/4  md:p-4 m-4">
               <img alt='Hipi Advertisement' className="object-contain" src={withBasePath('images/advertisement/logo/loreal.png')} />
            </div>
            <div className="w-1/3 md:w-1/4 md:p-4 m-4 ">
               <img alt='Hipi Advertisement' className="object-contain" src={withBasePath('images/advertisement/logo/bigbasket.png')} />
            </div>
            <div className="w-1/3 md:w-1/4 md:p-4 m-4 ">
               <img alt='Hipi Advertisement' className="object-contain" src={withBasePath('images/advertisement/logo/fabindia.png')} />
            </div>
            <div className="w-1/3 md:w-1/4 md:p-4 m-4 ">
               <img alt='Hipi Advertisement' className="object-contain" src={withBasePath('images/advertisement/logo/marico.png')} />
            </div>
            <div className="w-1/3 md:w-1/4 md:p-4 m-4 ">
               <img alt='Hipi Advertisement' className="object-contain" src={withBasePath('images/advertisement/logo/paragon.png')} />
            </div>
            <div className="w-1/3 md:w-1/4 md:p-4 m-4 ">
               <img alt='Hipi Advertisement' className="object-contain" src={withBasePath('images/advertisement/logo/tanishq.png')} />
            </div>
            <div className="w-1/3 md:w-1/4 md:p-4 m-4 ">
               <img alt='Hipi Advertisement' className="object-contain" src={withBasePath('images/advertisement/logo/yash.png')} />
            </div>
            <div className="w-1/3 md:w-1/4 md:p-4 m-4 ">
               <img alt='Hipi Advertisement' className="object-contain" id="ad_form"  src={withBasePath('images/advertisement/logo/flipkart.png')} />
            </div>
      </div>
      </div>
   </div>
</div>
<div ></div>
<div className='w-full flex py-4 px-4 md:px-2 md:pb-8 justify-center' >
        <Form/>
    </div>
<StaticFooter/>
   </>
);
}
export default Business;