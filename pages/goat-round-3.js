import Round3Mob from "../src/components/round-3-mob";
import Round3Desk from "../src/components/round-3-desk";
import ChooseComp from "../src/components/choose-comp";

import { SeoMeta } from "../src/components/commons/head-meta/seo-meta";
import { useEffect } from "react";
import { commonEvents } from "../src/analytics/mixpanel/events";
import { track } from "../src/analytics";
// import { getCanonicalUrl } from "../src/utils/web";

export default function Hipi() {
  
  return (
  <>
  <SeoMeta
        data={{
          title: 'Hipi GOAT contest leaderboard - Singing Talent hunt.',
          description: 'Leaderboard for Hipi GOAT contest on Hipi. Top performers will get coaching sessions from Shilpa Rao and Rupali Jagga. And opportunity to perform at Finale episode of Zee Saregamapa.',
          // canonical: getCanonicalUrl && getCanonicalUrl(),
        }}
      />
    <ChooseComp mobile={<Round3Mob/>} desktop={<Round3Desk/>}/>
    
  </>
  )
}
