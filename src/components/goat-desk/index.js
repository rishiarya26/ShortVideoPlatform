/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-no-duplicate-props */
import { useRouter } from 'next/router';
import { useState } from 'react';
import faq from '../../../public/goat-FAQ.json'
import { withBasePath } from '../../config';
import StaticFooter from '../static-footer';

function GoatDesk() {
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
       <div className=" headerbar w-full h-18 bg-red-600 flex items-center justify-start lg:px-10 px-4 py-2">
        <img alt="" className="w-16" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
      </div>

<div className="flex justify-center items-center flex-col section_1 relative">
  <img alt="" src={withBasePath('images/goat/desktop/unlu_desktop.jpg')} />
  {/* <div className="absolute top-6 w-full flex justify-center">
  <div onClick={()=>router && router.push('/goat-leaderboard')} className="w-44 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
  Round 1 winner
  </div>
  </div> */}
      {/* <p className="-mt-12 font-semibold text-green-400 text-center">Want to learn more ? Check out our webinar from October <a className=" font-semibold text-green-400 underline"> here </a> !</p>
  <button className="flex px-12 py-3 my-6 bg-hipired rounded-full text-white font-semibold">Apply Now</button> */}
  <div className="w-full">
    <img alt="" src={withBasePath('images/goat/desktop/2_1.jpg')}/>
  </div>
</div>
<div className="flex w-full  section_2 relative">
    <img alt="" src={withBasePath('images/goat/desktop/3_2.jpg')}/>
    <div className="absolute w-1/3 flex flex-col top-14 left-24 ">
    <img alt="" src={withBasePath('images/goat/desktop/round1.png')}/>
    <div className="flex w-full justify-center py-4 pb-8">
    <div onClick={()=>router && router.push('/goat-leaderboard')} className="w-44 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
  Round 1 Winner
  </div>
    </div>
    <img alt="" src={withBasePath('images/goat/desktop/round2Desk.png')}/>
    <div className="flex w-full justify-center py-4 pb-8  items-center">
        <div onClick={()=>router && router.push('/goat-round-2')} className="w-44 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
        Round 2 Details
      </div>
      <div onClick={()=>router && router.push('/round-2-winner')} className="w-44 ml-4 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
        Round 2 Winner
      </div>
    </div>
    <img alt="" src={withBasePath('images/goat/desktop/round3desk.png')}/>
    <div className="flex w-full flex-col justify-center py-4 pb-8  items-center">
      <div className='flex w-full justify-center items-center'>
        <div onClick={()=>router && router.push('/goat-round-3')} className="w-56 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
        Round 3 Details
      </div>
      <div onClick={()=>router && router.push('/round-3-participants')} className="w-56 cursor-pointer bg-hipired rounded-sm shadow-md ml-4 px-4 py-2 text-white flex justify-center font-semibold">
        Round 3 Participants
      </div>
      </div>
      <div onClick={()=>router && router.push('/cash-price-winner')} className=" cursor-pointer bg-hipired rounded-sm shadow-md mt-4 px-4 py-2 text-white flex justify-center font-semibold">
        Round 3 Weekly Cash Prize Winners
      </div>
    </div>
    </div>
</div>

<div className="section_3 mt-96 flex items-center flex-col section_2">
   <img alt="" src={withBasePath('images/goat/desktop/4_1.jpg')}/>
   {/* <button className="flex px-12 py-3 my-6 bg-hipired rounded-full text-white font-semibold">Apply Now</button> */}
</div>

<div className="section_4 flex flex-col relative section_2">
<img alt="" src={withBasePath('images/goat/desktop/5.jpg')}/>
<div className="flex w-full absolute -bottom-12 mt-6 z-10 justify-center items-center flex-col">
  <p className="text-2xl font-bold"> Download the Hipi app now :</p>
  <div className="flex w-full mt-6 justify-center">
           <div onClick={()=>onStoreRedirect('android')}> <img alt="" className="pr-4 cursor-pointer w-32" src={withBasePath('icons/play_store_1.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')}><img alt="" src={withBasePath('icons/app_store_1.png w-32')} className="cursor-pointer" alt="hipi logo" /> </div>
            </div>
          </div>
</div>
<>
  <div className="section_5 flex flex-col relative section_2">
  <img alt="" src={withBasePath('images/goat/desktop/6.jpg')}/>
  <p className="absolute -bottom-4 w-full justify-center flex">Write us on<pre> <a className="text-blue-600" href = "mailto: hipigoat@hipi.co.in">hipigoat@hipi.co.in</a> </pre>for any information or queries relating to the contest</p>
  </div>
  <div className="section_6 flex flex-col section_2">
  <img alt="" src={withBasePath('images/goat/desktop/7.jpg')}/>
  <img alt="" src={withBasePath('images/goat/desktop/judge.jpg')}/>
  <img alt="" src={withBasePath('images/goat/desktop/8.jpg')}/>
  <div className="relative">
  <img alt="" src={withBasePath('images/goat/desktop/9_1.jpg')}/>
  <div className="absolute -bottom-10 w-full flex justify-center">
  {/* <div onClick={()=>router && router.push('/goat-leaderboard')} className="w-44 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
  Leaderboard
  </div> */}
  </div>
  </div>
  <div className="relative">
    <div className="absolute bottom-1/3 right-0 w-1/2 w-full flex justify-center">
    <div onClick={()=>router && router.push('/goat-round-2')} className="w-44 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
Round 2 Details
  </div>
    </div>
  <img alt="" src={withBasePath('images/goat/desktop/round-2-lead.jpg')}/>
  </div>
  <img alt="" src={withBasePath('images/goat/desktop/faq.jpg')}/>
  
  </div>
  </>
<div className="flex flex-col p-8 pt-0 px-28">
{items?.map((data, id)=>(
  <div key={id} className="mt-8">
  <div id={id} className="cursor-pointer transition duration-500 ease-in-out" onClick={()=>handleClick(id)}><span className="pr-2" >{data.show ? "-" : "+"}</span> {data.ques}</div>
  {data.show && <div id={id} className="pt-2 pl-6 text-purple-400 transition duration-500 ease-in-out"> {data.ans}</div>}
  </div>
))}
</div>
      {/* <div className="socialIconsFooter w-full flex justify-center p-4 px-12">
        <div className="relative">
          <img alt="" alt="social icons" src="https://www.buildfortiktok.com/static/media/rotatedSocialIcons.5b8d3c6a.svg"/>
             <a  href="https://www.linkedin.com/showcase/tiktokbusiness/?refer=build_for_tiktok_linkedin_icon" className="absolute w-12 h-12 bg-transparent border-0 left-0 top-0" ></a>
            <a  href="https://twitter.com/TikTokBusiness?refer=build_for_tiktok_twitter_icon" className="absolute w-12 h-12 bg-transparent border-0 left-1/4 top-0"></a>
            <a  href="https://www.instagram.com/tiktok.forbusiness/?refer=build_for_tiktok_instagram_icon" className="absolute w-12 h-12 bg-transparent border-0 left-2/4 top-0" ></a>
            <a  href="https://www.facebook.com/TikTokForBusiness?refer=build_for_tiktok_facebook_icon" className="absolute w-12 h-12 bg-transparent border-0 left-3/4 top-0" ></a>
       </div> 
      </div> */}
      {/* <div className="w-full p-4 px-8 flex bg-white sticky bottom-0 z-20 shadow-inner items-center justify-between">
        <div className="flex">
            <img alt="" className="w-12 h-12 mr-2" src={withBasePath('icons/Hipi-Logo-RGB.png')} alt="hipi logo" /> 
            <div className="flex flex-col justify-center ">
              <p className="text-lg font-semibold">Download Hipi App</p>
              <p className="text-md ">Participate in G.O.A.T</p>
            </div>
        </div>
        <div className="flex">
           <div onClick={()=>onStoreRedirect('android')}> <img alt="" className="mr-4 cursor-pointer w-32" src={withBasePath('icons/play_store_1.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')}><img alt="" src={withBasePath('icons/app_store_1.png')} className="cursor-pointer w-32" alt="hipi logo" /> </div>
            </div>
      </div> */}
      <StaticFooter/>
    </div>
  );
}

export default GoatDesk;

