/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities*/
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
import { faqRewards } from '../../utils/schema';
import RewardsHindi from './hindi';
import English from './english';
import Hindi from './hindi';
import RewardsTabs from '../commons/tabs/rewards';

function Rewards() {
const [items, setItems] = useState(faq?.faq);
const [showLast, setShowLast] = useState(false);
const [url, setUrl] = useState('');
const [selectedIndex, setSelectedIndex] = useState(0);

const handleClick = (id) =>{
    let updateItem = [...items];
    updateItem[id].show = !(updateItem[id]?.show);
    setItems(updateItem);
    }
 
 const tabItems = {
    display : ['English', 'Hindi'],
 }
 
 const onTabChange=(selected)=>{
    console.log("S",selected)
  setSelectedIndex(selected);
 }

 const comp = {
         0 : <English/>,
         1 : <Hindi/>
    }
 

useEffect(()=>{
setUrl(document?.location?.href);
},[]) 
return (
<>
<SeoMeta
data={{
title: ' Earn Rewards with Hipi | How to Earn rewards on Hipi ',
// image: item?.thumbnail,
description: 'You can earn Hipi rewards through Hipi Rewards Program when you use Hipi app to watch videos, follow creators, create videos, and share them with your friends. Earn by watching hipi videos to get rewards.',
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
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqRewards) }}
      />
<div className="static_body_ relative">
    <div className='hidden md:flex'>
        <Header/>
    </div>
    {/* 
    <div className='md:mt-16'>
        <img className='flex md:hidden' alt="Supermonindia contest" src={withBasePath('images/rewards/rewards_mob.webp')} />
        <img className='hidden md:flex'alt="Supermonindia contest" src={withBasePath('images/rewards/rewards_web.webp')} />
    </div>
    */}

    <RewardsTabs items={tabItems} selectedIndex={selectedIndex} onTabChange={onTabChange}/>
    {comp[selectedIndex]}
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
            <div  className="mt-6">
                <div id={1} className="cursor-pointer transition duration-500 ease-in-out flex items-center font-medium" onClick={()=>setShowLast(!showLast)}>
                    <span className="pr-2 flex" >
                        {showLast ? 
                        <CloseFaqBlue/>
                        : 
                        <OpenFaqBlue/>
                        }
                    </span>
                    How can I check transaction limit & KYC process for PayTM wallet?

 
                </div>
                {showLast && 
                <div id={1} className="pt-2 pl-6 text-gray-700 transition duration-500 ease-in-out"> 
                <p>Please ensure that transaction limit for the month for your PayTM account is not reached. With PayTM minimum KYC, maintaining a balance of up to Rs. 10,000 per month is permitted in your PayTM wallet. If your PayTM wallet has already reached the limit for the month, then redeemed coins can't be transferred from Hipi to your PayTM wallet.</p>
                <p>It's advisable to do a full KYC of your PayTM wallet before redeeming coins to your PayTM wallet. Read more about transaction limits & KYC process for PayTM wallet <button className='text-blue-400' onClick={()=>window.open("https://paytm.com/blog/payments/mobile-wallet/types-of-paytm-wallet-kyc/")}>here</button></p>
                </div>
                }
            </div>
        </div>
    </div>
    {/* <StaticFooter/> */}
</div>
</>
);
}
export default Rewards;