/* eslint-disable react/no-unknown-property */
/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/no-unescaped-entities*/
/*eslint-disable react/jsx-no-duplicate-props */
/*eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import faq from '../../../public/lipsync-FAQ.json';
import stunner from '../../../public/stunnerData.json';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { withBasePath } from '../../config';
import CloseFaq from '../commons/svgicons/close-faq';
import OpenFaq from '../commons/svgicons/open-faq';
import Header from '../desk-header';
import Form from './form';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import SwiperCore, {
Autoplay,Pagination,Navigation
} from 'swiper';
import { getHashTagVideos } from '../../sources/explore/hashtags-videos';
import Mute, { MutedColor } from '../commons/svgicons/mute';
import { getItem } from '../../utils/cookie';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';
import { toTrackClevertap } from '../../analytics/clevertap/events';
// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);

function LipSync({type= 'stunner'}) {
 const [items, setItems] = useState(faq?.faq);
 const [stunnerData, setStunnerData] = useState(stunner.stunner);
 const [stunnerVideos, setStunnerVideos] = useState([])
 const [muted, setMuted] = useState(true);
 const router = useRouter()
 const challenge1Ref = useRef();
 const challenge2Ref = useRef();
 const device = getItem('device-type')
 const deviceType = getItem('device-info')

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
 const handleClickStunner = (id) =>{
  let updateItem = [...stunnerData];
  updateItem[id].show = !(updateItem[id]?.show);
  setStunnerData(updateItem);
}

useEffect(()=>{
( async function(){
  try{ 
    const response = await getHashTagVideos({ keyword: 'hipistunner' , offset: "1" });
    
    if(response?.data?.length >= 7){
      let videos = []
      videos?.push(response?.data?.[0]);
      console.log("fetchedMore",response, videos);
      videos?.push(...response?.data?.splice(2,7));
      console.log("fetchedMore",response, videos);
      setStunnerVideos(videos);
    }}catch(e){
      console.error("Error - hashtag video for stunner",e)
    }})()

},[])
  return (
    <>
       {/* <div className=" headerbar w-full h-18 flex items-center fixed top-0 lg:px-10 px-4 py-2 justify-between">
        <img loading="lazy"  className="w-16" src={withBasePath('images/stunner/stunner-logo.png')} alt="" /> 
        <div className='flex text-white font-medium'>
          <a className='px-4'>Challangers</a>
          <a className='px-4'>Winners</a>
          <a className='px-4'>Contact</a>
        </div>
      </div> */}
  <div className='hidden md:flex'><Header/></div>
<div className="flex items-center flex-col section_1 bg_1 md:min-h-screen relative md:pt-16">
<div className='w-full min-h-49 md:min-h-25'>
		<img className='flex md:hidden' alt="HipiLipsyncBattle challenge" src={withBasePath('images/lipsync/mob_banner.jpg')} />
		<img className='hidden md:flex'alt="HipiLipsyncBattle challenge" src={withBasePath('images/lipsync/desk_banner.jpeg')} />
		</div>
  <div className='py-8 md:py-20 w-full flex flex-col items-center bg_1'>
    <h1 className='text-3xl font-bold px-6 lipsync_font mb-2 text-center'>Kya aap hain asli Dramebaaz?</h1>
    <p className='px-8 md:w-1/2 md:pt-4 text-center text-gray-600 font-light'>
    Get ready to do what you are best at – DRAMA!
</p>
<p className='px-8 md:w-1/2 md:pt-4 text-center text-gray-600 font-light'>
  Test your lip sync skills with monthly fun challenges of Hipi lipsync battle. If you win, you get once in a lifetime opportunity to be featured in a music video released by Zee Music Company!
</p>
<p className='px-8 md:w-1/2 md:pt-4 text-center text-gray-600 font-light'>
Are you ready to light up the virtual stage
</p>
  </div>
</div>

<div className='w-full flex justify-center items-center flex-col-reverse md:flex-row  py-4 md:py-20 bg_lipsync_blue relative'>
        {/* <div className='md:w-1/2 w-full  md:pl-32 md:p-8 px-8 '>
            <img loading="lazy"  alt="Get cash rewards with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Cash Rewards.png')} /> 
        </div> */}
        <div className='max_800 w-full  flex-col flex py-8 md:p-8 px-8 justify-center'>
            <h3 className='text-3xl text-center font-bold lipsync_font pb-4'>Who is a Dramebaaz?</h3>
            <p className='text-gray-600 font-light text-lg pt-4 pb-2'>You’re an ultimate Dramebaaz if you have these traits:</p>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You LOVE movies and enjoy acting, be it in front of the mirror or camera. Enacting your favourite movie moments or songs is your THING!</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You are the life of a party! An entertainer, always ready with perfect movie dialogues and songs for imitation, aka, ‘The Dramebaaz’</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You believe that acting is your biggest strength and you have never missed a spotlight. So, showcase your passion for it.</p></div>
            <div className='flex'><p className='mb-2 text-gray-600 font-light'>Unlock your boundless potential and become whoever you desire - a content creator, an entertainer, a lip sync master, or a thespian with dramatic flair. The stage is set, and it's time to give your dreams the wings they deserve. The moment has arrived, and it's your time to shine! Discover the #HipiLipsyncBattle and make your mark in the world of entertainment.</p></div>
            </div>
    </div>

    <div className='w-full flex justify-center items-center flex-col-reverse md:flex-row  py-4 md:py-20 bg_1 relative'>
        <div className='max_800 w-full  flex-col flex py-8 md:p-8 px-8 justify-center'>
            <h3 className='text-3xl text-center font-bold lipsync_font pb-4'>How will Hipi Lipsync Battle unfold-</h3>
             <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>Hipi Lipsync Battle is a 6-month competition open to everyone.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>Each month will have a unique lipsync challenge theme and participants can lipsync to songs or dialogues in their preferred language</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>To be eligible, videos must include the monthly challenge hashtag. For the month of February it’s #Love.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>A celebrity judge selects the best lipsync video each month and the winner receives Rs.15,000.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>After 6 months, the 6 monthly winners compete for the grand prize of Rs. 1 Lakh and a chance to feature in a music video by Zee Music Company.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>Contestants can also win daily cash prizes.</p></div>
            </div>
    </div>
    
    <div className='w-full flex justify-center items-center flex-col-reverse md:flex-row  py-4 md:py-20 bg_lipsync_blue relative'>
        {/* <div className='md:w-1/2 w-full  md:pl-32 md:p-8 px-8 '>
            <img loading="lazy"  alt="Get cash rewards with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Cash Rewards.png')} /> 
        </div> */}
        <div className='max_800 w-full  flex-col flex py-8 md:p-8 px-8 justify-center'>
            <h3 className='text-3xl text-center font-bold lipsync_font pb-4'>The Ultimate Grand Prize</h3>
            <p className='text-gray-500 font-light text-lg pt-4'>At the end of 6 months, the top 6 finalists will compete for 2 weeks, and one grand winner will be declared. The celebrity judges will choose the asli Dramebaaz based on their talent and the quality of their videos.</p>
            <p className='text-gray-500 font-light text-lg pt-4'>The winner of the #HipiLipsyncBattle takes home a cash prize of Rs.1 Lakh and a dream breakthrough of being featured in a music video launched by Zee Music Company!</p>
        </div>
    </div>


    <div className='w-full flex justify-center items-center flex-col-reverse md:flex-row  py-4 md:py-20 bg_1 relative'>
        {/* <div className='md:w-1/2 w-full  md:pl-32 md:p-8 px-8 '>
            <img loading="lazy"  alt="Get cash rewards with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Cash Rewards.png')} /> 
        </div> */}
        <div className='max_800 w-full  flex-col flex py-8 md:p-8 px-8 justify-center'>
            <h3 className='text-3xl text-center font-bold lipsync_font pb-4'>How to participate</h3>
            <p className='text-gray-500 font-light text-lg pt-4'>- Step 1: Download the Hipi app</p>
            <p className='text-gray-500 font-light text-lg pt-4'>- Step 2: Sign up or log in to your existing Hipi account</p>
            <p className='text-gray-500 font-light text-lg pt-4'>- Step 3: Create a video and use the monthly thematic challenge hashtag while uploading.</p>
        </div>
    </div>


    {/* <div className="w-full flex justify-center items-center flex-col py-4 md:pb-8  bg_lipsync_blue ">
	<div className="max_800 w-full flex-col flex py-8 md:p-8 px-8 justify-center text-gray-600">
		<h3 className="text-3xl text-center font-bold  pb-4">Win cash prizes, every day!</h3>
		<p className="font-light text-lg pt-4">Want to make quick money with your entries? Garner likes on your challenge videos and stand a chance to earn Rs. 1000 . </p>
		<p className="font-light text-lg pt-4">Excited? Here’s more info!</p>
		<div className="flex pt-4">
			<span className="pr-1">•</span>
			<p className="mb-2 pl-4  font-light">Upload your video entries with #HipiLipSyncBattle and the challenge’s hashtag. </p>
		</div>
		<div className="flex">
			<span className="pr-1">•</span>
			<p className="mb-2 pl-4 font-light">Get the like button tapped on your videos by sharing it with your friends and family</p>
		</div>
		<div className="flex">
			<span className="pr-1">•</span>
			<p className="mb-2 pl-4  font-light">The top 20 entries with maximum likes will appear on the leaderboard! The leaderboard will update new likes every 10 minutes so don’t forget to keep an eye out!</p>
		</div>
		<div className="flex">
			<span className="pr-1">•</span>
			<p className="mb-2 pl-4 font-light">Every day at 11:59 p.m, the top creator on the leaderboard will become the chosen leader of the day and win a cash prize of Rs. 1000 .</p>
		</div>
	</div>
	<div className="rounded-md text-sm font-semibold  px-8 p-2 bg-hipired text-white my-2 cursor-pointer" onClick={()=>router && router.push('/lipsync-leaderboard')}>Daily Leaderboard</div>
	<p className="max_800 w-full flex-col flex py-8 md:p-12 px-8 justify-center text-gray-600 text-xs">
	<ul className="list-disc">
		<li>The Leaderboard only deals with the most liked videos and DOES NOT determine the winners of the challenges.</li>
		<li>Every 30 days a new challenge is released, and the leaderboard will reset itself accordingly. Your previous challenge entries will not be vaild anymore, but you can always participate in the new challenge to win!</li>
		<li>Once you win, you will not be able get on the leaderboard until the next challenge is announced. Make sure to participate in the new challenge to grab 1000 bucks again.</li>
	</ul>
	</p>
</div>  */}


<div className='w-full flex justify-center  md:py-16 py-6 pb-0 md:pb-0 mb-6 relative'>
<div className='absolute left-0 top-0 h-full flex items-center'>
		<img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/lipsync/hipigoat_bg_left.png')} />
	</div>
	<div className='hidden md:flex absolute right-0 top-0 h-full items-center'>
		<img loading="lazy"  alt="" className="object-contain reflect" src={withBasePath('images/lipsync/hipigoat_bg_left.png')} />
	</div>
<div class="w-full flex flex-col items-center py-8 md:p-8 px-8 w-feed z-1">
<h3 className='text-3xl text-center font-bold lipsync_font pb-4'>Challenges</h3>

<div className='flex  w-full flex-col md:flex-row justify-center flex-wrap'>
           
           <div className='w-full md:w-1/3 bg-white flex flex-col bg-white rounded-xl overflow-hidden my-4 md:mx-8 box_shadow_1 h-fit ease-in duration-300'>
              <div className='overflow-hidden cursor-pointer  min-h-58v md:min-h-25 ' onClick={()=>window.open("https://www.hipi.co.in/feed/for-you?videoId=eaf669ac-a5a7-4cd6-8341-83bf5def44e8")}>
              <img loading="lazy"  className=''alt="Hipi Stunner Challenges " src={withBasePath(`images/lipsync/challenges/Challenge_Love.jpg`)} />
              </div>
              <div className='w-full flex flex-col justify-center items-center py-4'>
              <h4 className="font-medium text-gray-600  bg-white border border-gray-300 -mt-12 px-4 w-40 text-gray-600 text-center">February challenge</h4>
              <h4 className="font-medium text-2xl text-gray-600 p-4 pb-0 bg-white purple_font">#Love</h4>
              {/* <p className='text-gray-700 font-light text-sm'>Date</p> */}
              <p className='text-sm px-4 text-gray-500 font-light text-lg py-4'>This Valentine's month Unleash your creativity and spread some love by making videos on the theme #Love - Let's see how you can turn this hashtag into a work of art. upload your video by 28th February for a chance to win the Hipi Lipsync Battle and dance to the rhythm of victory. Use #Love and #HipiLipSyncBattle  while you upload your videos.</p>
              <div className="rounded-full text-sm font-semibold  px-8 p-2 purple_bg text-white my-2 cursor-pointer" onClick={()=>window.open("https://www.hipi.co.in/feed/for-you?videoId=eaf669ac-a5a7-4cd6-8341-83bf5def44e8")}>Watch challenge video</div>
              </div>
          </div>
          </div>
</div>
</div>

<div className='w-full flex flex-col  md:py-16 py-6 pb-0 md:pb-0 mb-6 bg_lipsync_blue'>
<h3 className='text-3xl text-center font-bold lipsync_font pb-4'>Meet our celebrity judges</h3>
    <div className='w-full flex flex-col-reverse md:flex-row bg_lipsync_blue'>
        <div className='md:w-1/2 w-full flex-col flex py-6 md:pl-32 md:p-8 px-8 justify-center '>
            <h4 className='text-3xl font-bold lipsync_font'>Ishita Dutta</h4>
            <p> Judge for the February challenge</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Ishita Dutta is an actress par excellence in the entertainment industry with lead roles in successful films and television serials for over a decade. Her captivating performances in the hit movies like ‘Drishyam’ and ‘Drishyam 2’ have been well received, along with her earlier roles in ‘Chanakyudu’ and ‘Firangi’. She earned popularity in television serials like ‘Bepanaah Pyaar’, ‘Rishton Ka Saudagar-Baazigar' and ‘Ek Ghar Bhanaunga’. #TheBiggestFan challenge on Hipi is proof of the love she received from her fans.</p>
        </div>
        <div className='w-full md:w-1/2 min-h-32v md:min-h-42  flex justify-center md:justify-end items-center py-4 md:py-20 br_40'>
            <img loading="lazy"  alt="Nikita Anand - Miss Universe at Hipi Stunner 2022"  className='object-contain br_40 w-10/12 box_shadow_1' src={withBasePath('images/lipsync/judges/HLSB_Ishita Dutta.jpg')} /> 
        </div>
    </div>

    <div className='w-full flex flex-col md:flex-row bg-white'>
        <div className='w-full md:w-1/2 min-h-32v md:min-h-42  flex justify-center md:justify-start items-center py-4 md:py-20 br_40_left'>
            <img loading="lazy"  alt="Nikita Anand - Miss Universe at Hipi Stunner 2022"  className='object-contain br_40_left w-10/12 box_shadow_1' src={withBasePath('images/lipsync/judges/HLSB_Tanvi Thakker.jpg')} /> 
        </div>
        <div className='md:w-1/2 w-full flex-col flex py-6 md:pl-32 md:p-8 px-8 justify-center '>
            <h4 className='text-3xl font-bold lipsync_font'>Tanvi Thakker</h4>
            <p> Judge for the March challenge</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Tanvi Thakkar is a famous TV actress known for her roles in popular TV serials such as "Yeh Ishq Haaye," "Miley Jab Hum Tum," "Sarvggun Sampanna," and "Pyaar Kii Ye Ek Kahaani," Her acting skills have made her popular among television audiences all over the country. Tanvi Thakkar is still going strong with her popular show "Ghum Hai Kisi ke Pyaar Mein”. Soon to be mommy, Tanvi Thakker, has been our valued Hipi creator for almost a year and her amazing videos are just everyone’s favourite.</p>
        </div>
    </div>

    <div className='w-full flex flex-col-reverse md:flex-row bg_lipsync_blue'>
        <div className='md:w-1/2 w-full flex-col flex py-6 md:pl-32 md:p-8 px-8 justify-center '>
            <h4 className='text-3xl font-bold lipsync_font'>Aanchal Munjal </h4>
            <p> Judge for the April challenge</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Aanchal Munjal is a well-known actress who’s been performing since her childhood. She made her debut in the series "Dhoom Machaao Dhoom" in 2008 and has since appeared in several movies and TV shows in both Hindi and Tamil. She gained recognition for her role in the movie "We Are Family" in 2008. She has also appeared in the popular socio-political drama "Aarakshan" with actors like Amitabh Bachchan and Deepika Padukone. Recently, Hipi held a hashtag challenge around her latest music video, and she received a great response from the Hipi community.</p>
        </div>
        <div className='w-full md:w-1/2 min-h-32v md:min-h-42  flex justify-center md:justify-end items-center py-4 md:py-20 br_40'>
            <img loading="lazy"  alt="Nikita Anand - Miss Universe at Hipi Stunner 2022"  className='object-contain br_40 w-10/12 box_shadow_1' src={withBasePath('images/lipsync/judges/HLSB_Aanchal Munjal.jpg')} /> 
        </div>
    </div>

    <div className='w-full flex flex-col md:flex-row bg-white'>
        <div className='w-full md:w-1/2 min-h-32v md:min-h-42  flex justify-center md:justify-start items-center py-4 md:py-20 br_40_left'>
            <img loading="lazy"  alt="Nikita Anand - Miss Universe at Hipi Stunner 2022"  className='object-contain br_40_left w-10/12 box_shadow_1' src={withBasePath('images/lipsync/judges/HLSB_Shweta Sharma.jpg')} /> 
        </div>
        <div className='md:w-1/2 w-full flex-col flex py-6 md:pl-32 md:p-8 px-8 justify-center '>
            <h4 className='text-3xl font-bold lipsync_font'>Shweta Sharma</h4>
            <p> Judge for the May challenge</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Shweta Sharma, popularly known as misthiss30 is a prolific Hipi creator whose videos cross millions of views as soon as they are posted on the app. People love her unique style and fashion sense that includes traditional elements, especially her sarees. She makes lip-sync videos using 90's era songs, which are a hit with her followers. Shweta's tagline is "Leaving a bit of sparkle everywhere I go" and she continues to shine on Hipi with her videos, which are highly appreciated by her Hipi community.</p>
        </div>
    </div>

    <div className='w-full flex flex-col-reverse md:flex-row bg_lipsync_blue'>
        <div className='md:w-1/2 w-full flex-col flex py-6 md:pl-32 md:p-8 px-8 justify-center '>
            <h4 className='text-3xl font-bold lipsync_font'>Shivangi Khedkar</h4>
            <p> Judge for the June challenge</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Shivangi Khedkar, better known as Pallavi, has won many hearts with her performances in a short period of time. Known for her role in the hit show 'Mehndi Hai Rachne Wali', she shines not only as a talented actor but also as a successful model, gracing beauty pageants, commercials, and photoshoots. Her versatility extends to music videos and her large following on Hipi. Shivangi truly has it all.</p>
        </div>
        <div className='w-full md:w-1/2 min-h-32v md:min-h-42  flex justify-center md:justify-end items-center py-4 md:py-20 br_40'>
            <img loading="lazy"  alt="Nikita Anand - Miss Universe at Hipi Stunner 2022"  className='object-contain br_40 w-10/12 box_shadow_1' src={withBasePath('images/lipsync/judges/HLSB_Shivangi Khedkar.jpg')} /> 
        </div>
    </div>

    <div className='w-full flex flex-col md:flex-row bg-white '>
        <div className='w-full md:w-1/2 min-h-32v md:min-h-42  flex justify-center md:justify-start items-center py-4 md:py-20 br_40_left'>
            <img loading="lazy"  alt="Nikita Anand - Miss Universe at Hipi Stunner 2022"  className='object-contain br_40_left w-10/12 box_shadow_1' src={withBasePath('images/lipsync/judges/HLSB_Swati Kapoor.jpg')} /> 
        </div>
        <div className='md:w-1/2 w-full flex-col flex py-6 md:pl-32 md:p-8 px-8 justify-center '>
            <h4 className='text-3xl font-bold lipsync_font'>Swati Kapoor</h4>
            <p> Judge for the July challenge</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Swati Kapoor has proven her mettle in the entertainment industry for over a decade. She started her acting career in 2010 with her debut role in the TV show "Kaali-Ek Agnipariksha." Later, she appeared in the Punjabi film "Mr & Mrs 420" and has worked in several successful TV shows, including a popular negative role in Zee TV’s "Kundali Bhagya." Set to appear in an upcoming television series named ‘Dhruv Tara-Samay Sadi Se Pare’, she is also a sought after Hipi creator and much loved by the Hipi fam.</p>
        </div>
    </div>
    </div>


<div className="flex w-full justify-center bg_1">
  <div className='flex flex-col p-8 md:px-4 max_800'>
  <div className='w-full flex justify-center text-3xl font-semibold pb-6 lipsync_font text-center'>Frequently Asked Questions</div>
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
</div>
    

<div className='w-full flex py-8 px-4 md:px-2 md:py-16 justify-center relative'>
{/* <div className='absolute hidden md:flex  left-0 top-0 h-full flex items-center'>
        <img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_left.png')} />
        </div>
        <div className='absolute hidden md:flex  right-0 top-0 h-full flex items-center'>
        <img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_right.png')} />
        </div> */}
        <Form/>
    </div>
</>

   
  );
}

export default LipSync;

