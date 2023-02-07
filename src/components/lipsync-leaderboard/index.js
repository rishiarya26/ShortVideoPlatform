/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import StaticFooter from '../static-footer';
import Header from '../desk-header';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import {getCanonicalUrl} from '../../utils/web';
import { useEffect, useState } from 'react';
import Tabs from '../commons/tabs/leaderboard-goat';
import { Ranklist } from './ranklist';
import { Winners } from './winners';

function LipsyncLeaderboard() {
const router = useRouter();
const [url, setUrl] = useState('');
const [selectedIndex, setSelectedIndex] = useState(0);

const onTabChange = (index)=>{
	setSelectedIndex(index);
}

const compToShow = {
 0 : <Ranklist/>,
 1 : <Winners/>

}
useEffect(()=>{
setUrl(document?.location?.href);
},[]) 
return (
<>
			{/* <SeoMeta
			data={{
			title: '',
			// image: item?.thumbnail,
			description: '',
			canonical: url && getCanonicalUrl(url),
			additionalMetaTags:[{
			name: 'fb:app_id',
			content: '255188469592363'
			}
			],
			openGraph: {
			title: '',
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
			/> */}
<div className="static_body relative ">
   <div className='hidden md:flex'>
      <Header/>
   </div>
   <div className='flex flex-col items-center md:pt-24 mt-6'>
   <div className='text-2xl font-semibold text-gray-800 py-6'>Lipsync Leaderboard</div>
   {/* To-Do change title */}
{/* <p className='text-gray-400 text-xs w-full md:w-1/2 px-6'>Hipi G.O.A.T. is back with a bang! G.O.A.T is a nationwide online singing contest, packed with fun-filled, pitch-and-video-perfect challenges. It is your dream chance to go viral in the world of music, from the comfort of your home. </p> */}
</div>
   <div className='flex flex-col items-center'>
      <Tabs items={{display : ['Ranklist','Winners']}} selectedIndex={selectedIndex} onTabChange={onTabChange}/>
     {compToShow[selectedIndex]}
   </div>
   <StaticFooter/>
</div>
</>
);
}
export default LipsyncLeaderboard;