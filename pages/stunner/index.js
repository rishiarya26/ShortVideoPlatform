/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-no-duplicate-props */
/*eslint-disable react/display-name */
import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import Stunner from "../../src/components/stunner";
import {faqStunner} from "../../src/utils/schema";
import { withBasePath } from '../../src/config'
import { toTrackMixpanel } from "../../src/analytics/mixpanel/events";
import { toTrackFirebase } from "../../src/analytics/firebase/events";
import { ToTrackFbEvents } from "../../src/analytics/fb-pixel/events";
import { useEffect } from "react";
import dynamic from "next/dynamic";

export default function Hipi() {
  useEffect(()=>{
    window.onunload = function () {
      window?.scrollTo(0, 0);
    }
  },[])

  const StaticFooter = dynamic(() => import('../../src/components/static-footer'),{
    loading: () => <div />,
    ssr: false
  });

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
     
    <Stunner/>

      <StaticFooter/>
      <div className="flex md:hidden w-full p-4 bg-white sticky bottom-0 z-20 shadow-inner items-center justify-between">
        <div className="flex flex-row items-center">
            <img className="w-12 h-12 mr-2" src={withBasePath('icons/Hipi-Logo-RGB.png')} alt="hipi logo" /> 
            <div className="flex flex-col justify-center ">
              <p className="text-sm font-semibold">Download Hipi App</p>
              <p className="text-xs ">Participate in #HipiStunner</p>
              <p className="text-xs ">Win Rs 1 Lac</p>
            </div>
        </div>
        <div>
            {/* <a className="border-2 border-gray-400 text-gray-600 px-3 py-1 mx-4 rounded-md text-sm" target="_blank" href="https://hipi.onelink.me/tMco/HSTest" rel="noreferrer" >Install</a> */}

            <div className="border-2 border-gray-400 text-gray-600 px-3 py-1 mx-4 rounded-md text-sm" onClick={()=>{
              toTrackMixpanel('stunnerInstallClick',{pageName:'Hipi Stunner'})
              toTrackFirebase('stunnerInstallClick',{page:'Hipi Stunner'})
              ToTrackFbEvents('stunnerInstallClick',{page:'Hipi Stunner'})
              window?.open('https://hipi.onelink.me/tMco/HSTest')
            }} >Install</div>
        </div>
      </div>

    </div>

    
  </>
  )
}
