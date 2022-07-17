/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { withBasePath } from '../../config';
import StaticFooter from '../static-footer';
import Header from '../desk-header';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import {getCanonicalUrl} from '../../utils/web';
import { useEffect, useState } from 'react';

function Lavreto() {
const router = useRouter();

	const [url, setUrl] = useState('');

	useEffect(()=>{
		setUrl(document?.location?.href);
	},[]) 

  return (
	<>
	 <SeoMeta
        data={{
			title: '#LavReToVideo Contest on Hipi| Lav Re To Video on Zee Yuva',
          // image: item?.thumbnail,
          description: 'The #LavReToVideo contest is your once on in a lifetime opportunity to showcase your amazing talent on TV! Yes, your videos will go viral on the very popular Marathi show, Lav Re To Video on Zee Yuva.',
          canonical: url && getCanonicalUrl(url),

			additionalMetaTags:[{
				name: 'fb:app_id',
				content: '255188469592363'
			  }
			],
          openGraph: {
				title: '#LavReToVideo Contest on Hipi| Lav Re To Video on Zee Yuva',
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
		<img className='flex md:hidden' alt="Lav Re To Video Contest on Hipi App" src={withBasePath('images/lavreto/LavReToMob.jpg')} />
		<img className='hidden md:flex'alt="Lav Re To Video Contest on Hipi App" src={withBasePath('images/lavreto/LavReToDesk.jpg')} />
		</div>
		<div className='tnc-text'>
		
      <div className="px-4">
  
	<div className="mt-6" data-align="center">
		<h1 className='text-2xl font-bold font-gray-700 pb-2 mt-4 mb-2'>#LavReToVideo Contest – 1 minute to fame! </h1>
	</div>
	<p>Do you want the world to know you for your short videos? Do you love entertaining people, but can’t find the right opportunity? </p>
	<p>If you have ever dreamt of being popular on TV, then Hipi has an exclusive opportunity for you! The #LavReToVideo contest is your once in a lifetime opportunity to showcase your amazing talent on TV! Yes, your videos will go viral on the very popular Marathi show, Lav Re To Video on Zee Yuva.</p>

	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>Who can participate? </h3>
	<p>Anyone who has the knack of making short entertaining videos! The participant must be an Indian and above 18 years. If you are under 18, parental/guardian approval is needed.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>What is the prize?</h3>
	<p>If your video gets selected, you will get to be on TV! Your video will go viral on the very popular Lav Re To Video on ZEE Yuva, and will be watched by millions of viewers!</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>Sounds exciting! How can I participate?</h3>
	<p>Follow these simple steps to rock it on TV: </p>
	<p className='mb-2 pl-2'>Step 1: Download the Hipi app from play store or app store </p>
	<p className='mb-2 pl-2'>Step 2: Login or sign-up on the Hipi app </p>
	<p className='mb-2 pl-2'>Step 3: Create fun, quirky one-minute video using any audio of your choice from Lav Re To Video playlist on Hipi</p>
	<p className='mb-2 pl-2'>Step 4: Upload the video on your Hipi profile using the hashtag #LavReToVideo</p>

	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>Eligibility criteria: </h3>
	<p>Following conditions must be fulfilled to feature your video on TV:</p>
	<p className='mb-2 pl-2'>1. The video must be original and exclusively uploaded on Hipi.</p>
	<p className='mb-2 pl-2'>2. The duration of the video should be 60 seconds. </p>
	<p className='mb-2 pl-2'>3.	The video should be made using any audio from Lav Re To Video playlist on Hipi</p>   
	
	<p>We know you might have some additional queries. So, here are some frequently asked questions we have answered for you. </p>
	

	<div className='p-4'>
		<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>1. Is Hipi a paid app? </h3>
		<p>No, the Hipi app is free and easy to use.  </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>2. Do I need to pay to participate in the #LavReToVideo contest? </h3>
	<p>No, it is free and open for all the amazing video creators to participate.  </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>3. Is the contest open for non-Indian citizens?</h3>
	<p>The contest is open for all.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>4. Can I upload more than one video? </h3>
	<p>The more videos you upload, the better are your chances of featuring on TV! But please keep in mind that only videos using audio / music / sounds from Lav Re To Video playlist on Hipi will be eligible for featuring on TV.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>5. Will my videos be telecast on TV?  </h3>
	<p>Yes! If your video gets selected, it will be featured on Lav Re To Video show on Zee Yuva.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>6. Will I be paid for uploading my videos? </h3>
	<p>No. You will not be paid for uploading your video, but it will go viral on TV! Seems pretty cool, right? </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>7. Do I need to submit solo videos, or can I upload duet or group videos? </h3>
	<p>The choice is yours. You can upload solo, duet or group videos. </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>8. How many videos do I need to upload to be eligible in this contest? </h3>
	<p>You need to upload a minimum of 1 video with Marathi audio to participate in this contest.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>9. Can I use filters or effects on my videos? </h3>
	<p>Yes, you can. You will also find a range of filters and effects on our Hipi app.</p>

	
	</div>
	
	</div>
	</div>
	<StaticFooter/>
    </div>
	</>
  );
}

export default Lavreto;

