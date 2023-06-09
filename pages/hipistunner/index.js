import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import Stunner from "../../src/components/stunner";
import {faqStunner} from "../../src/utils/schema";
import { withBasePath } from '../../src/config'
import StaticFooter from "../../src/components/static-footer";

export default function Hipi() {
  return (
  <>
   <SeoMeta
        data={{
          title: 'Hipi Stunner 2022 Contest presented By Nikita Anand | Hipi ',
          // image: item?.thumbnail,
          description: 'Hipi Stunner is designed for you to celebrate your uniqueness both body and in Showcase how you carry your fashion up your sleeve and walk the big stage in style. Be a tenner,a Hipi Stunner ',}}/>
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStunner)}}
        />
<div className="w-screen h-screen relative">
     
    <Stunner type='hipiStunner'/>

    </div>

    
  </>
  )
}
