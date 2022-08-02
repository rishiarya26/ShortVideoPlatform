import {  useState } from "react";
import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import Stunner from "../../src/components/stunner";

export default function Hipi() {

  const [url, setUrl] = useState('');

  return (
  <>
  <SeoMeta
        data={{
          title: 'Hipi Stunner 2022 Contest presented By Nikita Anand | Hipi ',
          // image: item?.thumbnail,
          description: 'Hipi Stunner is designed for you to celebrate your uniqueness both body and in Showcase how you carry your fashion up your sleeve and walk the big stage in style. Be a tenner,a Hipi Stunner ',
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
    {/* <ChooseComp mobile={<GoatMob/>} desktop={<GoatDesk/>}/> */}
    <Stunner/>
  </>
  )
}
