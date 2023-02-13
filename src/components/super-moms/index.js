/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { withBasePath } from '../../config';
import StaticFooter from '../static-footer';
import Header from '../desk-header';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import {getCanonicalUrl} from '../../utils/web';
import { useEffect, useState } from 'react';

function SuperMoms() {
const router = useRouter();

	const [url, setUrl] = useState('');

	useEffect(()=>{
		setUrl(document?.location?.href);
	},[]) 

  return (
	<>
	 <SeoMeta
        data={{
			title: 'SuperMomIndia Contest on Hipi| DID SuperMoms',
          // image: item?.thumbnail,
          description: 'Are you a supermom? Hipi welcomes you to participate SuperMomIndia contest and WIN a chance of a lifetime to be on the top TV show DID-SuperMoms, on ZEE TV. Participate Now!',
          canonical: url && getCanonicalUrl(url),

			additionalMetaTags:[{
				name: 'fb:app_id',
				content: '255188469592363'
			  }
			],
          openGraph: {
				title: 'SuperMomIndia Contest on Hipi| DID SuperMoms',
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
		<div className='md:mt-16 min-h-49 md:min-h-25 shimmer'>
		<img className='flex md:hidden' alt="Supermonindia contest" src={withBasePath('images/supermoms_banner_hipi.png')} />
		<img className='hidden md:flex'alt="Supermonindia contest" src={withBasePath('images/SuperMomIndia-Web.jpg')} />
		</div>
		<div className='tnc-text'>
		
      <div className="px-4">
  
	<div className="mt-6" data-align="center">
		<h1 className='text-2xl font-bold font-gray-700 pb-2 mt-4 mb-2'>#SuperMomIndia Contest </h1>
	</div>
	<p>Are you a supermom? We know you are! Hipi welcomes you to participate and WIN a chance of a lifetime to be on the top TV show DID-SuperMoms, on ZEE TV.  </p>
	<p>If you are a mother and have a really unique or a quirky talent, this is your opportunity to appear on the DID Supermoms, on ZEE TV and bask in limelight with celebrity judges: Remo D’ Souza, Urmila Matondkar and Bhagyashree.  </p>
	<p className='mt-4'>To participate, all you have to do is follow these 3 simple steps:  </p>

	<p className='mb-2 pl-2'>i.     Make a video that displays your unique talent</p>
	<p className='mb-2 pl-2'>ii.     Upload the video on Hipi using hashtag #SuperMomIndia </p>
	<p className='mb-2 pl-2'>iii.     Share it with friends and family to garner maximum likes and shares to make your dream come true </p>

	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>Who can participate? </h3>
	<p>Any talented and passionate mom who wants to showcase her talent to the world can participate. The participant must be an Indian citizen and above the age of 18.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>What is the prize?</h3>
	<p>The winner gets her dream chance at being a celebrity by appearing on the popular ZEE TV show, DID SuperMoms and interact with their favorite judges Remo D’ Souza, Urmila Matondkar and Bhagyashree.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>Sounds exciting! How can I participate?</h3>
	<p>It’s easy! </p>
	<p className='mb-2 pl-2'>Step 1: Login or sign-up on hipi</p>
	<p className='mb-2 pl-2'>Step 2: Create a video that best showcases your unique talent. </p>
	<p className='mb-2 pl-2'>Step 3: Upload the video on your Hipi profile. Don’t forget to add the hashtag #SuperMomIndia</p>
	<p className='mb-2 pl-2'>Step 4: You are done! Now, share it with your friends and family to gain maximum likes and shares on your Hipi video. </p>

	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>What are the video necessities? </h3>
	<p className='mb-2 pl-2'>1. The video should clearly bring out the special talent of the contestant.</p>
	<p className='mb-2 pl-2'>2. It should be in a 9:16 format. </p>
	<p className='mb-2 pl-2'>3. It should not exceed 90 seconds (about 1 and a half minutes).</p>   
	<p className='mb-2 pl-2'>4. The video can be in your preferred language. </p>
	<p className='mb-2 pl-2'>5. The entries are only valid if the videos are uploaded with the hashtag #SuperMomIndia. </p>
	
	<p>We know you might have some additional queries. So, here are some frequently asked questions we have answered for you. </p>
	

	<div className='p-4'>
		<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>1. Is Hipi a paid app? </h3>
		<p>No, the Hipi app is free and easy to use.  </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>2. Do I need to pay to participate in the #SuperMomIndia contest?</h3>
	<p>No, it is free and open for all passionate supermoms to participate. </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>3. What is the age limit for the contest? </h3>
	<p>If you are a mom and over the age of 18 you can participate. There is no upper age limit.
</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>4. Is the contest open for non-Indian citizens? </h3>
	<p>Right now, the contest is only open for Indian citizens.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>5. What is the duration of this contest? </h3>
	<p>The duration of the contest is 2 months.  </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>6. Can I upload only one video?</h3>
	<p>No, you can upload as many videos as possible within the duration of the contest to gain maximum engagement and better chances of winning. </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>7. How many videos can I upload in a day? </h3>
	<p>You can upload as many videos as you want. There is no limit. </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>8. Will my videos be telecast on TV? </h3>
	<p>Yes. If your video gets selected, it will be telecast on TV.  </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>9. Will I be paid for uploading my videos?  </h3>
	<p>No. You will not be paid for uploading your video but a chance to appear on TV seems pretty cool, right?  </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>10. Can I submit videos in any language?</h3>
	<p>Yes, you can submit videos in any language.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>11. Do I need to submit solo videos, or can I upload duet or group videos? </h3>
	<p>The choice is yours. You can upload solo, duet or group videos.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>12. How is the engagement rate for my video calculated?  </h3>
	<p>The engagement rate of your video is the total number of likes, shares, follows, comments & downloads / total video views x 100. </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>13. How many videos do I need to upload to be eligible in this contest? </h3>
	<p>You need to upload a minimum of 1 video to participate in this contest. </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>14. When will the winner be announced?</h3>
	<p>The winner will be announced every 15-20 days from the start of the contest. </p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>15. Can I use filters or effects on my videos?</h3>
	<p>Yes, you can. You will also find a range of filters and effects on our Hipi app.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>16. Are there any eligibility criteria for the talents showcased? </h3>
	<p>There is none. You are free to showcase any talent you possess as long as the video clearly brings out the talent.</p>
	<h3 className='mt-4 font-medium text-gray-600 text-lg pb-1'>17. Can I showcase more than one talent in the same video? </h3>
	<p className='pb-4'>We prefer that separate videos be uploaded for each of your talents to maximize your chance of winning.  </p>
	
	</div>
	
	</div>
	</div>
	<StaticFooter/>
    </div>
	</>
  );
}

export default SuperMoms;

