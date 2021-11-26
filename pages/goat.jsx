import GoatDesk from "../src/components/goat-desk";
import GoatMob from "../src/components/goat-mob";

import ChooseComp from "../src/components/choose-comp";
import { SeoMeta } from "../src/components/commons/head-meta/seo-meta";
export default function Hipi() {
  return (
  <>
  <SeoMeta
        data={{
          title: 'Hipi GOAT contest - Singing Talent hunt.',
          // image: item?.thumbnail,
          description: 'Participate in Hipi GOAT contest on Hipi and win weekly cash awards. Top performers will get coaching sessions from Shilpa Rao and Rupali Jagga. And opportunity to perform at Finale episode of Zee Saregamapa.',
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
    <ChooseComp mobile={<GoatMob/>} desktop={<GoatDesk/>}/>
  </>
  )
}
