/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { withBasePath } from '../../config';
import StaticFooter from '../static-footer';
import Header from '../desk-header';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import {getCanonicalUrl} from '../../utils/web';
import { useEffect, useState } from 'react';
import faq from '../../../public/rewards-FAQ.json';
import OpenFaqBlue from '../commons/svgicons/open-faq-blue';
import CloseFaqBlue from '../commons/svgicons/close-faq-blue';
function Rewards() {
const [items, setItems] = useState(faq?.faq);
const handleClick = (id) =>{
let updateItem = [...items];
updateItem[id].show = !(updateItem[id]?.show);
setItems(updateItem);
}
const router = useRouter();
const [url, setUrl] = useState('');
useEffect(()=>{
setUrl(document?.location?.href);
},[]) 
return (
<>
<SeoMeta
data={{
title: ' Earn Rewards with Hipi ',
// image: item?.thumbnail,
description: 'You can earn Hipi rewards through Hipi Rewards Program when you use Hipi app to watch videos, follow creators, create videos and share them with your friends.',
canonical: url && getCanonicalUrl(url),
openGraph: {
title: 'Earn Rewards with Hipi ',
description: 'hipi.co.in',
url:url && getCanonicalUrl(url) ,
images: [
{
url: 'https://www.hipi.co.in/icons/icon-512x512.png',
width: 512,
height: 512,
alt: "hipi logo",
}
],
type: 'image/png',
site_name: 'Hipi'
}
}}
/>
<div className="static_body relative">
    <div className='hidden md:flex'>
        <Header/>
    </div>
    {/* 
    <div className='md:mt-16'>
        <img className='flex md:hidden' alt="Supermonindia contest" src={withBasePath('images/rewards/rewards_mob.webp')} />
        <img className='hidden md:flex'alt="Supermonindia contest" src={withBasePath('images/rewards/rewards_web.webp')} />
    </div>
    */}
    <div className=' md:mt-24'>
        <div className='flex w-full flex-col-reverse md:flex-row pb-4 md:pb-12'>
            <div className='w-full md:w-1/2 flex-col flex py-6 md:pl-40 md:p-8 px-8 justify-center '>
                <h1 className='text-3xl text-center md:text-left reward_font font-bold font-gray-700 pb-2 mt-4 mb-2'>Earn Rewards with Hipi</h1>
                <p className='md:w-3/4'>Hipi Rewards is a token of appreciation from Hipi to our incredible community of users. 
                Hipi Rewards can be earned when a user participates in regular video watching tasks. Such video watching activities are usually time bound. Thus the user must watch videos within the specified time period to earn rewards. You can earn Hipi rewards by watching videos, following creators, creating videos, and sharing the video with your friends and families. </p>
                <p className='md:w-3/4'>Here are some easy ways to earn Hipi rewards and a classification of the level goals to be achieved for maximum benefit: </p>
            </div>
            <div className=' w-full md:w-7/12 px-8 md:pr-20 pt-8 md:py-0'>
                <img className='flex object-contain'alt="Supermonindia contest" src={withBasePath('images/rewards/hipi_rewards_sec_1.webp')} />
            </div>
        </div>
        <div className="">
            <div className='flex  flex-col items-center w-full py-8 px-4 md:py-14 bg_pastel_reward text-center'>
                <h3 className='mt-4 font-medium text-2xl pb-1 reward_font'>Earn rewards when you watch videos</h3>
                <p>When you watch videos on the app, you will unlock the following levels:</p>
                <div className='flex w-full flex-row justify-center items-center py-4'>
                <div className='box_shadow_1 bg-white p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>1</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>On viewing 10 videos</p>
                </div>
                <div className='box_shadow_1 bg-white p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4 md:mx-8'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>2</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>On viewing 20 videos</p>
                </div>
                <div className='box_shadow_1 bg-white p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>3</p>
                     <p className=' text-gray-500 text-xs md:text-sm font-medium'>On viewing 30 videos</p>
                </div>
                </div>
   
                <p className='text-left w-full md:w-4/12 text-xs px-6'>           
                 <ul className='list-disc'>
                    <li>Only videos that are watched completely will be considered. </li>
                    <li>Videos that are watched partially or skipped will not be considered. </li>
                <li>Only one view for a video will be considered even if you watch the same video multiple times.</li>
                </ul>
                </p>
            </div>
            <div className='flex  flex-col items-center w-full py-8 px-4 md:py-14 bg_1 text-center'>
                <h3 className='mt-4 font-medium text-2xl pb-1 reward_font'>Earn rewards when you follow creators</h3>
                <p className='text-center w-full md:w-1/2'>When you follow creators on the app, you will unlock the following levels:</p>
             
                <div className='flex w-full justify-center items-center py-4'>
                <div className='box_shadow_1 bg_pastel_reward p-2 py-4 md:p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>1</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>On following 20 creators</p>
                </div>
                <div className='box_shadow_1 bg_pastel_reward p-2 py-4 md:p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4 md:mx-8'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>2</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>On following 40 creators</p>
                </div>
                <div className='box_shadow_1 bg_pastel_reward p-2 py-4 md:p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>3</p>
                     <p className=' text-gray-500 text-xs md:text-sm font-medium'>On following 60 creators</p>
                </div>
                </div>


                <p className='text-center w-full md:w-1/2 text-xs'>Only one follow for a creator will be considered even if you follow and unfollow the creator multiple times.</p>
            </div>
            <div className='flex  flex-col items-center w-full py-8 px-4 md:py-14 bg_pastel_reward text-center'>
                <h3 className='mt-4 font-medium text-2xl pb-1 reward_font'>Earn rewards when you create a video and share it with your friends</h3>
                <p className='text-center w-full md:w-1/2'>When you post a video on the app and share the video link with your friends. When your friends view the video using the video link shared by you, you will unlock the following levels:</p>
            
                <div className='flex w-full justify-center items-center py-4'>
                <div className='box_shadow_1 bg-white p-2 py-4 md:p-4 w-1/2 md:w-48 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>1</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>On receiving 5 views on the video</p>
                </div>
                <div className='box_shadow_1 bg-white p-2 py-4 md:p-4 w-1/2 md:w-48 flex flex-col m-1 md:m-4 md:mx-8'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>2</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>On receiving 10 views on the video</p>
                </div>
                <div className='box_shadow_1 bg-white p-2 py-4 md:p-4 w-1/2 md:w-48 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>3</p>
                     <p className=' text-gray-500 text-xs md:text-sm font-medium'>On receiving 15 views on the video</p>
                </div>
                </div>


                 
                <p className='text-left w-full md:w-1/2 text-xs'>A new, original video is to be posted and shared. Videos posted or shared by you in the past will not be considered. </p>
                <p className='text-left text-xs w-full md:w-1/2'>Views by your friends on the video through the video link shared by you only will be eligible for hip Rewards. Views on the video by other users on the app will not be considered.</p>
            </div>
            <div className='flex  flex-col items-center justify-center w-full py-8 px-4 md:py-14 relative z-0 text-center'>
                <div className='absolute left-0 bottom-0 flex w-1/2 items-center z-10'>
                    <img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/rewards/hipi_rewards_bg_2.webp')} />
                </div>
                <div className='hidden md:flex absolute right-0 top-0 w-1/2  items-center z-10'>
                    <img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/rewards/hipi_rewards_bg_1.webp')} />
                </div>
				<div className='z-20 w-full md:w-3/4 flex flex-col items-center'>
                <h3 className='mt-4 font-medium reward_font text-lg pb-4'>Unlock the levels, spin a wheel, and earn reward coins</h3>
                <p>Once you unlock a level, you will see the level as ‘Unlocked’ on the app. Unlocked levels alone allow you  to spin a wheel to win reward coins.</p>
                <p>You will earn reward coins from one of the following denominations at Level 1:</p>
                <p className='mb-2 py-4 font-bold text-2xl reward_font'>50, 25, 15, 10, 5, 0</p>
                <p>These reward coins get multiplied by 1.5 when won at Level 2, and by 2 when won at Level 3. </p>


                {/* <h3 className='mt-4 font-medium reward_font text-lg pb-1'>Details & Conditions</h3>
                <p>Your daily progress will reset at 11:59 PM daily during the Hipi Reward Program period.</p>
                <p className=''>You should spin the wheel and unlock your reward coins for the levels achieved daily before 11:59 PM during the Hipi Reward Program.</p>
                
                 */}
                 <div className='text-left md:w-3/4 text-sm'>
                <h3 className='mt-6 font-medium reward_font text-lg pb-4 w-full text-center'>Terms & Conditions</h3>

                <p className='text-center'>Your daily progress will reset at 11:59 PM every day during the Hipi Rewards Program period</p>
                <p className='text-center'>You should spin the wheel and unlock your reward coins for the levels achieved daily before 11:59 PM while the Hipi Reward Program is running.</p>
                <p className='py-2'>Your participation in Hipi Rewards Program is subject to further Terms & Conditions as stated below:</p>

                <div className='flex items-start'>•<p className='mb-2 pl-2 text-left'> A user will be eligible for the program if the user is logged-in to Hipi mobile app  an Android phone alone.</p></div>
                <div className='flex items-start'>•<p className='mb-2 pl-2 text-left'> The videos posted by the user should be in line with Hipi Community Guidelines and Hipi Terms of Use. Any content that does not conform to the above-mentioned policies will be taken down from the platform. In the event of a copyright claim or any reported unauthorized use of third-party intellectual property rights, we will take down such content from the platform, and the reward points would withdrawn</p></div>
                <div className='flex items-start'>•<p className='mb-2 pl-2 mb-6 text-left'> Levels achieved for a particular user will be calculated based on the parameters published at the start of the Hipi Rewards Program. The calculation criteria are subject to change from time to time.</p></div>
				</div>
                </div>
            </div>
        </div>
    </div>
    <div className="flex w-full justify-center bg_pastel_reward">
        <div className='flex flex-col p-8 md:px-4 max_800'>
            <div className='w-full flex justify-center text-3xl font-semibold pb-6 reward_font text-center'>Frequently Asked Questions</div>
            {items?.map((data, id)=>(
            <div key={id} className="mt-6">
                <div id={id} className="cursor-pointer transition duration-500 ease-in-out flex items-center font-medium" onClick={()=>
                    handleClick(id)}>
                    <span className="pr-2 flex" >
                        {data.show ? 
                        <CloseFaqBlue/>
                        : 
                        <OpenFaqBlue/>
                        }
                    </span>
                    {data.ques}
                </div>
                {data.show && 
                <div id={id} className="pt-2 pl-6 text-gray-700 transition duration-500 ease-in-out"> {data.ans}</div>
                }
            </div>
            ))}
        </div>
    </div>
    {/* <StaticFooter/> */}
</div>
</>
);
}
export default Rewards;