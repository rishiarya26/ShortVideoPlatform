/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { withBasePath } from '../../config';
import StaticFooter from '../static-footer';
import Header from '../desk-header';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import {getCanonicalUrl} from '../../utils/web';
import { useEffect, useState } from 'react';

function BhangraTaSajda() {
const router = useRouter();

	const [url, setUrl] = useState('');

	useEffect(()=>{
		setUrl(document?.location?.href);
	},[]) 

  return (
	<>
	 <SeoMeta
        data={{
			title: ' #BhangraTaSajda Challenge | Bhangra Dance Video Content on Hipi',
          // image: item?.thumbnail,
          description: 'Participate in #BhangraTaSajda challenge, only on the Hipi app! You can make a video enjoying Bhangra on the Hipi app using #BhangraTaSajda and win. Read on to know more about the contest.',
          canonical: url && getCanonicalUrl(url),
          openGraph: {
				title: ' #BhangraTaSajda Challenge | Bhangra Dance Video Content on Hipi ',
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
		<div className='hidden md:flex'><Header/></div>
		<div className='md:mt-16'>
		<img className='flex md:hidden' alt="Supermonindia contest" src={withBasePath('images/BhangraTaSajda/Mob_BhangraTaSajda.jpg')} />
		<img className='hidden md:flex'alt="Supermonindia contest" src={withBasePath('images/BhangraTaSajda/Desk_BhangraTaSajda.jpg')} />
		</div>
		<div className='tnc-text'>
		
      <div className="px-4">
  
	<div className="mt-6" data-align="center">
		<h1 className='text-2xl font-bold font-gray-700 pb-2 mt-4 mb-2'>#BhangraTaSajda Challenge</h1>
	</div>
	<p>Does the smallest of joys make you break out into Bhangra? Then this contest is for you!</p>
	<p>Nacho jee phadke te dikhao apna Punjabi swag by participating in #BhangraTaSajda challenge, only on the Hipi app! Don’t miss this golden opportunity to become famous for your Bhangra dance videos! Scroll to know more about the contest. </p>
	
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>Who can participate? </h3>
	<p>Anyone and everyone who enjoys doing Bhangra dance and wants to showcase their talent to other Bhangra lovers can participate. You don’t have to be a professional dancer to be eligible. You can just make a video enjoying Bhangra with or without your friends on the Hipi app using #BhangraTaSajda and still win.</p>
	
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>What can you win through this contest:</h3>
	<p>The winners will win exclusive Hipi goodies and amazon gift vouchers.</p>

	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>How to participate?</h3>
	<p className='mb-2 pl-2'>Step 1: Download Hipi App from Play Store or App Store</p>
	<p className='mb-2 pl-2'>Step 2: Login or Signup on the Hipi app </p>
	<p className='mb-2 pl-2'>Step 3: Create your Bhangra dance videos with duration up to 90 secs and upload it on your Hipi profile using the hashtag #BhangraTaSajda</p>
	<p className='mb-2 pl-2'>Step 4: Share it with friends and family to garner maximum likes and shares to increase your chances of winning.</p>

	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>Rules and Regulations:</h3>
	<p className='mb-2 pl-2'>1. Anyone can participate to showcase his/her Bhangra talent.</p>
	<p className='mb-2 pl-2'>2.	The videos or entries are only valid if the videos are uploaded with the hashtag #BhangraTaSajda</p>
	<p className='mb-2 pl-2'>3.	The videos uploaded should be original and exclusively posted on the Hipi app</p>   
	<p className='mb-2 pl-2'>4.	The duration should not exceed more than 90secs per video.</p>
	<p className='mb-2 pl-2'>5.	To participate, one needs to be 18+ years of age. </p>
	<p className='mb-2 pl-2'>6.	Videos are allowed in Punjabi and Hindi languages.</p>
	<p className='mb-2 pl-2'>7.	The video should be recorded in vertical format (9:16) </p>
	
	<p className='text-xl font-medium mb-2 pl-2 pt-6'>Frequently asked questions:</p>
	

	<div className='p-4'>
		<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>1.	Who can participate?</h3>
		<p>The participant must be an Indian citizen and above the age of 18.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>2.	How to make an account on Hipi App?</h3>
	<p>Download the App, register and login to your account to start creating your Bhangra videos.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>3.	Do you need to be a trained dancer to participate?</h3>
	<p>No, not at all. If you enjoy doing Bhangra, you can participate.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>4.	Do I need to pay to download Hipi?</h3>
	<p>{`No, it's free and easy to use.`}</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>5.	Do I need to pay to participate in the contest?</h3>
	<p>{`No, it’s free for all to participate. Just download the Hipi app, create an account or login, and upload your dance videos using #BhangraTaSajda`}</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>6.	For how long is the contest?</h3>
	<p>The contest will run for more than a month. Try uploading as many videos as possible for maximum engagement to win.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>7.	What do I win?</h3>
	<p>10 lucky winners will get a chance to win exciting Hipi goodies and Amazon vouchers at the end of the contest.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>8.	Will I be paid to upload my dancing videos?</h3>
	<p>No, you will not be paid for uploading videos, but you will receive exclusive Hipi goodies and amazon gift vouchers if you win.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>9.	How many videos can I upload in a day?</h3>
	<p>As many as you want. The more, the merrier!</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>10.	What is the duration of videos to be submitted?</h3>
	<p>The videos should not be more than 90 seconds.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>11.	Do I need to submit solo videos, or Can I upload duet or group videos too?</h3>
	<p>You can upload solo or duet videos. Make sure to use the hashtag #BhangraTaSajda for your entry to be eligible.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>12.	How is the engagement rate calculated?</h3>
	<p>Engagement rate for video is calculated by total number of likes, comments, shares, downloads per video view.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>13.	How many videos do I need to upload to be eligible in the contest?</h3>
	<p>You need to upload at least one video using #BhangraTaSajda to be eligible for the contest.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>14.	Do we need to upload every day?</h3>
	<p>There is no compulsion as such. But more entries will increase your chances of winning. </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>15.	When will the winner be announced?</h3>
	<p>Once the competition starts, the winners will be announced once every 15-20 days.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>16.	Can I use filters or effects on my video?</h3>
	<p>Yes, you can. The Hipi app has a wide range of filters and effects to make your videos interesting.</p>
	
	</div>
	
	</div>
	</div>
	<StaticFooter/>
    </div>
	</>
  );
}

export default BhangraTaSajda;

