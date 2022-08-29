/*eslint-disable @next/next/no-img-element */

import { withBasePath } from "../../config";
import { useRouter } from "next/router";
import StaticFooter from "../static-footer";
import HeaderBusiness from "./header";
  

function AdProducts() {

   const router = useRouter();

return (
   <>
  <div className=" flex flex-col justify-center items-center">
   <HeaderBusiness type="toAds"/>
   {/* <div className="bg_ocean_pastel w-full">
   <div className="flex justify-center mt-16 py-32   md:h-auto ">
      <div className="w-feed flex flex-col justify-center items-center md:flex-row md:justify-between ">
         <div className="text-4xl md:text-6xl md:w-2/3 mb-4 font-bold text-gray-600 px-4 flex md:px-6"><h3>Advertising solutions</h3></div>
         <p className="w-full md:w-1/3 text-gray-800 px-4 text-lg font-medium">Hipi creates discovery, awareness and engagement with inspiring products and ideas thereby moving them further along the purchasing process in an immersive, contextual, yet non-intrusive manner.</p>
</div>
</div>
</div> */}




<div className="bg_ocean_pastel w-full mt-16" id="advertise_sec">
   <div className="flex justify-center md:mt-16 py-12   md:h-auto md:py-20 md:mb-8">
      <div className="w-feed flex flex-col justify-center items-center md:flex-row md:justify-between ">
         <div className="text-4xl md:text-6xl md:w-2/3 mb-4 font-bold text-gray-600 px-4 flex md:px-6"><h1>Advertise</h1></div>
         <p className="w-full md:w-1/3 text-gray-800 px-4 text-lg font-medium">Boost your brand presence by being where users are on Hipi. Be discoverable right on the home page. Be the first
thing users see when they open the app.</p>
</div>
</div>
</div>



   <div className="w-full justify-center flex flex-col w-feed items-center py-6 md:my-6 md:pt-0 md:mt-0">
      <div className="flex flex-col-reverse md:flex-row justify-between">
         <div className="md:w-1/2 font-bold text-gray-600 p-4 flex justify-center">
         <div className="rounded-2xl overflow-hidden  box_shadow_1 w-96">
            <img alt='Hipi Advertisement' src={withBasePath('business/Top View Video.gif')} /> 
            </div>
         </div>
         <div className="w-full md:w-1/2 text-base font-medium text-gray-600 px-8 md:px-12 flex justify-center flex-col items-start">
            <h3 className="text-gray-800 py-4 text-2xlCfont-bold md:text-4xl font-bold ">Top View Video</h3>
            <p>Be the first. Use Top View ads, to be the first thing a user sees on opening Hipi. Boost visibility through guaranteed views.</p></div>
      </div>
   </div>



   <div className="w-full justify-center flex flex-col w-feed items-center py-6 md:my-6 md:pt-0 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between">
         
         <div className="w-full md:w-1/2 text-base font-medium text-gray-600 px-8 md:px-12 flex justify-center flex-col items-start">
            <h3 className="text-gray-800 py-4 text-2xlCfont-bold md:text-4xl font-bold ">Infeed Video</h3>
            <p>Let your Brand narrate the story native to Hipi content. It is sharable and can drive users to click through to an external/internal destination. </p></div>
            <div className="md:w-1/2 font-bold text-gray-600 p-4 flex justify-center">
         <div className="rounded-2xl overflow-hidden  box_shadow_1 w-96">
            <img alt='Hipi Advertisement' src={withBasePath('business/Infeed Video.gif')}/> 
            </div>
         </div>
      </div>
   </div>


   <div className="bg_ocean_pastel w-full" id="commerce_sec">
   <div className="flex justify-center md:mt-16 py-12   md:h-auto md:py-20 md:mb-8">
      <div className="w-feed flex flex-col justify-center items-center md:flex-row md:justify-between ">
         <div className="text-4xl md:text-6xl md:w-2/3 mb-4 font-bold text-gray-600 px-4 flex md:px-6"><h3>Commerce</h3></div>
         <p className="w-full md:w-1/3 text-gray-800 px-4 text-lg font-medium">Connect with consumers when they are most inspired, without interrupting their viewing experience.</p>
</div>
</div>
</div>


   <div className="w-full justify-center flex flex-col w-feed items-center pt-6 mt-6 md:pt-12 md:mt-12">
      <div className="flex flex-col-reverse md:flex-row justify-between">
         <div className="md:w-1/2 font-bold text-gray-600 p-4 flex justify-center">
         <div className="rounded-2xl overflow-hidden  box_shadow_1 box_shadow_1 w-96">
            <video autoPlay="true" muted loop src={withBasePath('business/Product Discovery.mp4')} type="video/mp4"/> 
            </div>
         </div>
         <div className="w-full md:w-1/2 text-base font-medium text-gray-600 px-8 md:px-12 flex justify-center flex-col items-start">
            <h3 className="text-gray-800 py-4 text-2xlCfont-bold md:text-4xl font-bold ">Product Discovery</h3>
            <p className="text-lg font-normal">Make your product discoverable always in-context and on-demand. Drive traffic to your website/App. </p></div>
      </div>
   </div>



   <div className="w-full justify-center flex flex-col items-center pb-6 mb-6 md:pb-12 md:mb-12">
      <div className="flex flex-col w-feed">
      <h3 className="w-full justify-center flex text-gray-800 py-8 pt-16 text-2xl font-bold md:text-4xl font-bold ">Present in categories</h3> 
      <div className="flex flex-wrap justify-around items-center md:flex-row  py-8">
              
               <div className="flex flex-col items-center my-4 md:my-0 p-8 md:mx-8 box_shadow_1 w-max">
                  <div className='w-24 h-24 pb-4'><img alt='Hipi Advertisement' className="object-contain" src={withBasePath('business/IconsFashion.png')}/></div>
                  <p className='text-lg text-gray-500 font-semibold pt-2'>Fashion</p>
               </div>
               <div className="flex flex-col items-center my-4 md:my-0 p-8 md:mx-8 box_shadow_1 w-max">
                  <div className='w-24 h-24 pb-4'><img alt='Hipi Advertisement' className="object-contain" src={withBasePath('business/IconsAccessories.png')}/></div>
                  <p className='text-lg text-gray-500 font-semibold pt-2'>Accessories</p>
               </div>
               <div className="flex flex-col items-center my-4 md:my-0 p-8 md:mx-8 box_shadow_1 w-max">
                  <div className='w-24 h-24 pb-4'><img alt='Hipi Advertisement' className="object-contain" src={withBasePath('business/IconsBeauty.png')}/></div>
                  <p className='text-lg text-gray-500 font-semibold pt-2'>Beauty</p>
               </div>
               <div className="flex flex-col items-center my-4 md:my-0 p-8 md:mx-8 box_shadow_1 w-max">
                  <div className='w-24 h-24 pb-4'><img alt='Hipi Advertisement' className="object-contain" src={withBasePath('business/IconsHair.png')}/></div>
                  <p className='text-lg text-gray-500 font-semibold pt-2'>Hair</p>
               </div>
               <div className="flex flex-col items-center my-4 md:my-0 p-8 md:mx-8 box_shadow_1 w-max">
                  <div className='w-24 h-24 pb-4'><img alt='Hipi Advertisement' className="object-contain" src={withBasePath('business/IconsFood.png')}/></div>
                  <p className='text-lg text-gray-500 font-semibold pt-2'>Food</p>
               </div>
      </div>
      </div>
   </div>



   <div className="bg_ocean_pastel w-full" id="engage_sec">
   <div className="flex justify-center md:mt-16 py-12   md:h-auto md:py-20 md:mb-8">
      <div className="w-feed flex flex-col justify-center items-center md:flex-row md:justify-between ">
         <div className="text-4xl md:text-6xl md:w-2/3 mb-4 font-bold text-gray-600 px-4 flex md:px-6"><h3>Engage</h3></div>
         <p className="w-full md:w-1/3 text-gray-800 px-4 text-lg font-medium text-center md:text-left">Use this product to encourage Hipi users create content for you organically.
Their baked-in virality features have high potential to increase brand awareness and engagement</p>
</div>
</div>
</div>


{/* 

   <div className="w-full justify-center flex flex-col w-feed items-center pt-6 mt-6 md:pt-12 md:mt-12">
      <div className="flex flex-col md:flex-row justify-between">
         <div className="md:w-1/2 font-bold text-gray-600 p-4 flex justify-center">
         <div className="rounded-2xl overflow-hidden  box_shadow_1 box_shadow_1">
            <video width="320" height="240" autoPlay="true" muted loop src={withBasePath('videos/advertisement/Sahi_Pakde_hai.mp4')} type="video/mp4"/> 
            </div>
         </div>
         <div className="w-full md:w-1/2 text-base font-medium text-gray-600 px-8 md:px-12 flex justify-center flex-col items-start">
            <h3 className="text-gray-800 py-4 text-2xlCfont-bold md:text-4xl font-bold ">Branded Filters</h3>
            <p className="text-lg font-normal">Custom design an effect that engages Hipi users. Pair it with a Hashtag to amplify the engagement</p></div>
      </div>
   </div> */}

   <div className="w-full justify-center flex flex-col w-feed items-center py-6 my-6 md:pt-0 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between">
         
         <div className="w-full md:w-1/2 text-base font-medium text-gray-600 px-8 md:px-12 flex justify-center flex-col items-start">
            <h3 className="text-gray-800 py-4 text-2xlCfont-bold md:text-4xl font-bold ">Hashtag Challenge</h3>
            <p>Encourage the Hipi users to create content for you organically. Initiate a Hashtag custom to your brand, your need.</p></div>
            <div className="md:w-1/2 font-bold text-gray-600 p-4 flex justify-center">
         <div className="rounded-2xl overflow-hidden  box_shadow_1 ">
            <video width="320" height="240" autoPlay="true" muted loop src={withBasePath('business/Hashtag Challenge.mp4')} type="video/mp4"/> 
            </div>
         </div>
      </div>
   </div>


 

   
</div>
<StaticFooter/>
   </>
);
}
export default AdProducts;