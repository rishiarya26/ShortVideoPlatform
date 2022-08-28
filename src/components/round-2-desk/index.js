/*eslint-disable @next/next/no-img-element*/
import { useRouter } from 'next/router';
import { useState } from 'react';
import faq from '../../../public/goat-FAQ.json'
import { withBasePath } from '../../config';
import StaticFooter from '../static-footer';

function Round2Desk() {
 const [items, setItems] = useState(faq?.faq);

 const router = useRouter();

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
    <div className="w-full h-full relative">
       <div className=" headerbar w-full h-18 bg-red-600 flex items-center justify-start lg:px-10 px-4 py-2">
        <img className="w-16" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
      </div>

{/* <div className="flex justify-center items-center flex-col section_1 relative">
  <img src={withBasePath('images/goat/round-2/desktop/land.jpg')} />
  <div className="absolute bottom-8 w-full flex justify-center">
  <div onClick={()=>router && router.push('/goat-leaderboard')} className="w-1/3 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
  Leaderboard
  </div>
  </div>
    
</div> */}
<div className="">
{/* <img src={withBasePath('images/goat/round-2/desktop/land1.jpg')}/> */}
    <img src={withBasePath('images/goat/round-2/desktop/1.jpg')}/>
  </div>
<div className="">
    <img src={withBasePath('images/goat/round-2/desktop/2.jpg')}/>
  </div>
<div className="flex w-full  section_2">
    <img className="h-full" src={withBasePath('images/goat/round-2/desktop/3.jpg')}/>
</div>

<div className="section_3 flex items-center flex-col section_2">
   <img src={withBasePath('images/goat/round-2/desktop/4.jpg')}/>
   
<img src={withBasePath('images/goat/round-2/desktop/5.jpg')}/>

<img src={withBasePath('images/goat/round-2/desktop/6.jpg')}/>
   {/* <button className="flex px-12 py-3 my-6 bg-hipired rounded-full text-white font-semibold">Apply Now</button> */}
</div>

<div className="section_4 flex flex-col relative section_2">
<div className='w-8/12 mar-lef mb-6'>
<img src={withBasePath('images/goat/round-2/desktop/Round2DetailsDesktop.png')}/>
</div>
{/* <div className="flex w-full absolute -bottom-8 mt-6 z-10 justify-center items-center flex-col">
  <p className="text-xl font-bold"> Download the Hipi app now :</p>
  <div className="flex w-full mt-2 justify-center">
           <div onClick={()=>onStoreRedirect('android')}> <img className="pr-4 cursor-pointer" src={withBasePath('icons/play_store_1.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')}><img src={withBasePath('icons/app_store_1.png')} className="cursor-pointer" alt="hipi logo" /> </div>
            </div>
          </div> */}
</div>
<>
  
  {/* <div className="section_6 flex flex-col section_2">
  <img src={withBasePath('images/goat/round-2/desktop/9.jpg')}/>  
  <div className="relative">
  <img src={withBasePath('images/goat/round-2/desktop/10.jpg')}/>
  <div className="absolute -bottom-12 w-full flex justify-center">
  <div onClick={()=>router && router.push('/goat-leaderboard')} className="w-1/3 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
  Leaderboard
  </div> 
  </div>
  </div>
  <img src={withBasePath('images/goat/round-2/desktop/11.jpg')}/>
  </div> */}
  </>
{/* <div className="flex flex-col p-8 pt-0 px-4">
{items?.map((data, id)=>(
  <div key={id} className="mt-8">
  <div id={id} className="cursor-pointer transition duration-500 ease-in-out" onClick={()=>handleClick(id)}><span className="pr-2" >{data.show ? "-" : "+"}</span> {data.ques}</div>
  {data.show && <div id={id} className="pt-2 pl-6 text-purple-400 transition duration-500 ease-in-out"> {data.ans}</div>}
  </div>
))}
</div> */}
      {/* <div className="socialIconsFooter w-full flex justify-center p-4 px-12">
        <div className="relative">
          <img alt="social icons" src="https://www.buildfortiktok.com/static/media/rotatedSocialIcons.5b8d3c6a.svg"/>
             <a  href="https://www.linkedin.com/showcase/tiktokbusiness/?refer=build_for_tiktok_linkedin_icon" className="absolute w-12 h-12 bg-transparent border-0 left-0 top-0" ></a>
            <a  href="https://twitter.com/TikTokBusiness?refer=build_for_tiktok_twitter_icon" className="absolute w-12 h-12 bg-transparent border-0 left-1/4 top-0"></a>
            <a  href="https://www.instagram.com/tiktok.forbusiness/?refer=build_for_tiktok_instagram_icon" className="absolute w-12 h-12 bg-transparent border-0 left-2/4 top-0" ></a>
            <a  href="https://www.facebook.com/TikTokForBusiness?refer=build_for_tiktok_facebook_icon" className="absolute w-12 h-12 bg-transparent border-0 left-3/4 top-0" ></a>
       </div> 
      </div> */}

{/* <div className="w-full p-4 px-8 flex bg-white sticky bottom-0 z-20 shadow-inner items-center justify-between">
        <div className="flex">
            <img className="w-12 h-12 mr-2" src={withBasePath('icons/Hipi-Logo-RGB.png')} alt="hipi logo" /> 
            <div className="flex flex-col justify-center ">
              <p className="text-lg font-semibold">Download Hipi App</p>
              <p className="text-md ">Participate in G.O.A.T</p>
            </div>
        </div>
        <div className="flex">
           <div onClick={()=>onStoreRedirect('android')}> <img className="pr-4 cursor-pointer w-32" src={withBasePath('icons/play_store_1.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')}><img src={withBasePath('icons/app_store_1.png')} className="cursor-pointer w-32" alt="hipi logo" /> </div>
            </div>
      </div> */}
      <StaticFooter/>
    </div>
  );
}

export default Round2Desk;

