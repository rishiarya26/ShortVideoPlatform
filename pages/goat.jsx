import GoatDesk from "../src/components/goat-desk";
import GoatMob from "../src/components/goat-mob";

import ChooseComp from "../src/components/choose-comp";
import { SeoMeta } from "../src/components/commons/head-meta/seo-meta";
import { commonEvents } from "../src/analytics/mixpanel/events";
import { track } from "../src/analytics";
import { useEffect, useState } from "react";
import * as fbq from '../src/analytics/fb-pixel'
import { getCanonicalUrl } from "../src/utils/web";


export default function Hipi() {
  const [url, setUrl] = useState('');
  useEffect(()=>{
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Page Name'] = 'Goat';
    fbq.event('Screen View')
    track('Screen View',mixpanelEvents );
    setUrl(document?.location?.href)
  },[])
  return (
  <>
  <SeoMeta
        data={{
          title: 'Hipi GOAT contest - Singing Talent hunt.',
          // image: item?.thumbnail,
          description: 'Participate in Hipi GOAT contest on Hipi and win weekly cash awards. Top performers will get coaching sessions from Shilpa Rao and Rupali Jagga. And opportunity to perform at Finale episode of Zee Saregamapa.',
          canonical: url && getCanonicalUrl(url),
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
    <ChooseComp mobile={<GoatMob/>} desktop={<GoatDesk/>}/>
  </>
  )
}
