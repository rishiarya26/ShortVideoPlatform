import GoatDeskLb from "../src/components/goat-desk-lb"
import ChooseComp from "../src/components/choose-comp";
import GoatMobLb from "../src/components/goat-mob-lb"
import { SeoMeta } from "../src/components/commons/head-meta/seo-meta";
import { useEffect } from "react";
import { commonEvents } from "../src/analytics/mixpanel/events";
import { track } from "../src/analytics";
import * as fbq from '../src/analytics/fb-pixel'
// import { getCanonicalUrl } from "../src/utils/web";

export default function Hipi() {
  useEffect(()=>{
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Page Name'] = 'Goat_Leaderboard';
    fbq.event('Screen View')
    track('Screen View',mixpanelEvents );
  },[])
  return (
  <>
  <SeoMeta
        data={{
          title: 'Hipi GOAT contest leaderboard - Singing Talent hunt.',
          description: 'Leaderboard for Hipi GOAT contest on Hipi. Top performers will get coaching sessions from Shilpa Rao and Rupali Jagga. And opportunity to perform at Finale episode of Zee Saregamapa.',
        }}
      />
    <ChooseComp mobile={<GoatMobLb/>} desktop={<GoatDeskLb/>}/>
  </>
  )
}
