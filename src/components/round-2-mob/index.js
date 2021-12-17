/*eslint-disable @next/next/no-img-element*/
import { useRouter } from 'next/router';
import { useState } from 'react';
import faq from '../../../public/goat-FAQ.json'
import { withBasePath } from '../../config';

function Round2Mob() {
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
  <img src={withBasePath('images/goat/round-2/mobile/land.jpg')} />
  <div className="absolute bottom-8 w-full flex justify-center">
  <div onClick={()=>router.push('/goat-leaderboard')} className="w-1/3 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
  Leaderboard
  </div>
  </div>
    
</div> */}
<div className="mt-4">
<img src={withBasePath('images/goat/round-2/mobile/land1.jpg')}/>
    <img src={withBasePath('images/goat/round-2/mobile/1.jpg')}/>
  </div>
<div className="min-h-screen">
    <img src={withBasePath('images/goat/round-2/mobile/2.jpg')}/>
  </div>
<div className="flex w-full  section_2">
    <img className="h-full" src={withBasePath('images/goat/round-2/mobile/3.jpg')}/>
</div>

<div className="section_3 flex items-center flex-col section_2">
   <img src={withBasePath('images/goat/round-2/mobile/4.jpg')}/>
   
<img src={withBasePath('images/goat/round-2/mobile/5.jpg')}/>

<img src={withBasePath('images/goat/round-2/mobile/6.jpg')}/>
   {/* <button className="flex px-12 py-3 my-6 bg-hipired rounded-full text-white font-semibold">Apply Now</button> */}
</div>

<div className="section_4 flex flex-col relative section_2">
<img src={withBasePath('images/goat/round-2/mobile/7.jpg')}/>
{/* <div className="flex w-full absolute -bottom-8 mt-6 z-10 justify-center items-center flex-col">
  <p className="text-xl font-bold"> Download the Hipi app now :</p>
  <div className="flex w-full mt-2 justify-center">
           <div onClick={()=>onStoreRedirect('android')}> <img className="pr-4 cursor-pointer" src={withBasePath('icons/play_store.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')}><img src={withBasePath('icons/app_store.png')} className="cursor-pointer" alt="hipi logo" /> </div>
            </div>
          </div> */}
</div>
<>
  <div className="section_5 flex flex-col relative section_2">
  <img src={withBasePath('images/goat/round-2/mobile/8.jpg')}/>
  {/* <p className="absolute -bottom-8 w-full text-center px-4">Write us on <a className="text-blue-600" href = "mailto: hipigoat@hipi.co.in"> hipigoat@hipi.co.in </a> for any information or queries relating to the contest</p> */}
  </div>
  <div className="section_6 flex flex-col section_2">
  <img src={withBasePath('images/goat/round-2/mobile/9.jpg')}/>  
  <div className="relative">
  <img src={withBasePath('images/goat/round-2/mobile/10.jpg')}/>
  <div className="absolute -bottom-12 w-full flex justify-center">
  {/* <div onClick={()=>router.push('/goat-leaderboard')} className="w-1/3 cursor-pointer bg-hipired rounded-sm shadow-md px-4 py-2 text-white flex justify-center font-semibold">
  Leaderboard
  </div> */}
  </div>
  </div>
  <img src={withBasePath('images/goat/round-2/mobile/11.jpg')}/>
  </div>
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

      {/* <div className="w-full p-4 flex bg-white sticky bottom-0 z-20 shadow-inner items-center justify-between">
        <div className="flex">
            <img className="w-12 h-12 mr-2" src={withBasePath('icons/Hipi-Logo-RGB.png')} alt="hipi logo" /> 
            <div className="flex flex-col justify-center ">
              <p className="text-sm font-semibold">Download Hipi App</p>
              <p className="text-xs ">Participate in G.O.A.T</p>
            </div>
        </div>
        <div>
            <a className="border-2 border-gray-400 text-gray-600 px-3 py-1 mx-4 rounded-md text-sm" target="_blank" href="https://hipi.onelink.me/tMco/34447a88" rel="noreferrer" >Install</a>
        </div>
      </div> */}
      <div className="w-full static_footer bg-black flex py-3 justify-between flex-col px-10 text-gray-300">
        <div className="flex w-full flex-col text-sm">
          {/* <div className="flex w-1/2">
            <a href="/community" className="px-2 cursor-pointer">Community Guidelines</a>
            <p className="text-xs leading-5 text-gray-500">|</p>
            <a href="/terms" className="px-2 cursor-pointer">Terms of Use</a>
            <p className="text-xs leading-5 text-gray-500">|</p>
            <a href="/privacy" className="px-2 cursor-pointer">Community Centre</a>
          </div> */}
          <div className="flex w-full text-gray-400 text-xs items-center text-center mb-4">
          <p>Copyright © 2021 Zee Entertainment Enterprises Ltd. All rights reserved.</p>
        </div>
          <div className="flex justify-center w-full">
            <a href={links.facebook} className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M14 0H2C0.9005 0 0 0.9005 0 2V14C0 15.1005 0.9005 15.999 1.999 15.999H8.068V10.262H6.1515V7.7635H8.068V6.5115C8.068 4.581 9.493 3.0695 11.3125 3.0695H13.078V5.892H11.4975C11.0845 5.892 10.9635 6.1295 10.9635 6.4565V7.7625H13.078V10.262H10.9635V16H13.999C15.0995 16 15.998 15.1005 15.998 14.001V2C16 0.9005 15.1005 0 14 0Z" fill="white" />
              </svg>
            </a>
            <a href={links.instagram} className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 12.376V3.90541C0 1.81978 1.67907 0.140701 3.76471 0.140701H12.2353C14.3209 0.140701 16 1.81978 16 3.90541V12.376C16 14.4616 14.3209 16.1407 12.2353 16.1407H3.76471C1.67907 16.1407 0 14.4616 0 12.376ZM13.6471 3.43482C13.6471 2.91501 13.2257 2.49364 12.7059 2.49364C12.1861 2.49364 11.7647 2.91501 11.7647 3.43482C11.7647 3.95461 12.1861 4.376 12.7059 4.376C13.2257 4.376 13.6471 3.95461 13.6471 3.43482ZM8 4.1407C10.2036 4.1407 12 5.93715 12 8.14071C12 10.3443 10.2036 12.1407 8 12.1407C5.79643 12.1407 4 10.3443 4 8.14071C4 5.93715 5.79643 4.1407 8 4.1407ZM4.94118 8.14071C4.94118 6.44581 6.30508 5.08188 8 5.08188C9.69492 5.08188 11.0588 6.44581 11.0588 8.14071C11.0588 9.8356 9.69492 11.1995 8 11.1995C6.30508 11.1995 4.94118 9.8356 4.94118 8.14071Z" fill="white" />
              </svg>
            </a>
            <a href={links.twitter} className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 1.5377C15.4111 1.79864 14.7792 1.97561 14.1153 2.05462C14.7932 1.64868 15.3121 1.00481 15.5581 0.239948C14.9222 0.61587 14.2203 0.888838 13.4724 1.03681C12.8736 0.397935 12.0217 0 11.0769 0C9.26422 0 7.7945 1.46973 7.7945 3.28139C7.7945 3.53833 7.82349 3.78929 7.87949 4.02926C5.15201 3.89227 2.73347 2.58552 1.11477 0.59987C0.831818 1.08379 0.670851 1.64766 0.670851 2.24957C0.670851 3.38837 1.25075 4.39318 2.13059 4.98105C1.59268 4.96307 1.08677 4.81509 0.64387 4.56913V4.61013C0.64387 6.19983 1.77566 7.52657 3.27637 7.82854C3.00142 7.90252 2.71148 7.94352 2.41153 7.94352C2.19959 7.94352 1.99462 7.92252 1.79365 7.88252C2.21156 9.18728 3.42335 10.1361 4.85909 10.1621C3.73629 11.042 2.32055 11.5649 0.782851 11.5649C0.517909 11.5649 0.256942 11.5489 0 11.5199C1.45273 12.4527 3.17742 12.9966 5.03107 12.9966C11.0689 12.9966 14.3693 7.99552 14.3693 3.65833L14.3583 3.23342C15.0032 2.77347 15.5611 2.19559 16 1.5377Z" fill="white" />
              </svg>
            </a>
            {/* <a href="#" className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="11">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 1.52588e-05H15.7748V10.9952H0V1.52588e-05Z" fill="white" />
                </mask>
                <g mask="url(#mask0)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.85188 7.94613V2.72945C7.52365 3.6019 9.18491 4.46819 10.867 5.3459C9.18994 6.21562 7.52823 7.07688 5.85188 7.94613ZM15.5022 1.76876C15.3093 0.929674 14.6231 0.310931 13.7968 0.218588C11.8411 7.39693e-05 9.86126 -0.00106889 7.89029 7.39674e-05C5.91886 -0.00106889 3.93897 7.39693e-05 1.98263 0.218588C1.1568 0.310931 0.471086 0.929903 0.278171 1.76876C0.00319999 2.96327 0 4.26773 0 5.49767C0 6.72762 0 8.03162 0.2752 9.22659C0.467886 10.0654 1.1536 10.6842 1.97966 10.7763C3.93577 10.995 5.91566 10.9962 7.88709 10.995C9.85851 10.9962 11.8379 10.995 13.7938 10.7763C14.6197 10.6842 15.3058 10.0654 15.4992 9.22659C15.7742 8.03185 15.7749 6.72762 15.7749 5.49767C15.7749 4.26773 15.7771 2.9635 15.5022 1.76876Z" fill="white" />
                </g>
              </svg>
            </a> */}

          </div>
        </div>
        

      </div>
    </div>
  );
}

export default Round2Mob;

