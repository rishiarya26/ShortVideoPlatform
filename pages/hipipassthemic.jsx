import Home from "../src/components/home"
import Hipipassthemic from "../src/components/hipipassthemic";
import ChooseComp from "../src/components/choose-comp";
import { SeoMeta } from "../src/components/commons/head-meta/seo-meta";
import { commonEvents } from "../src/analytics/mixpanel/events";
import { track } from "../src/analytics";
import { useEffect } from "react";
import * as fbq from '../src/analytics/fb-pixel'
import { getCanonicalUrl } from "../src/utils/web";


export default function Hipi() {
  useEffect(()=>{
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Page Name'] = 'hipipassthemic';
    // fbq.event('Screen View')
    track('Screen View',mixpanelEvents );
  },[])
  return (
  <>
  <SeoMeta
        data={{
          title: '#HipiPassTheMic contest',
          // image: item?.thumbnail,
          description: 'Participate in #HipiPassTheMic contest and win rewards. A contest to ignite your talent and knowledge for singing Punjabi and Hindi songs. A contest which offers you a platform where you allow your singing passion to be showcased through these videos and also to encourage others to take up your singing challenge.',
          canonical: getCanonicalUrl && getCanonicalUrl(),
          // canonical: 'https://hipi.co.in/feed/[id]',
          // openGraph: {
          //   title: 'HiPi - Indian Short Video Platform for Fun Videos, Memes & more',
          //   description: 'Short Video Community - Watch and create entertaining dance, romantic, funny, sad & other short videos. Find fun filters, challenges, famous celebrities and much more only on HiPi',
          //   url: hostname || '',
          //   images: [
          //     {
          //       url: item?.thumbnail,
          //       width: 800,
          //       height: 600,
          //       alt: item?.music_title
          //     },
          //     { url: item?.userProfilePicUrl }
          //   ],
          //   type: 'video.movie',
          //   video: {
          //     actors: [
          //       {
          //         role: item?.userName
          //       }
          //     ],
          //     tag: item?.genre
          //   },
          //   site_name: 'HiPi'
          // }
        }}
      />
    <ChooseComp mobile={<Hipipassthemic/>} desktop={<Home/>}/>
  </>
  )
}
