import React, { memo, useEffect, useState } from 'react'
import { pushAdService } from '../../../../sources/ad-service';
import RightArrow from '../../svgicons/right-arrow';

function AdButton({vmaxAd, noShow = false, setMuted, adBtnClickCb, CtaText, CtaColor, ctaPath, id, activeVideoId, ctaTrackers}) {

  const [btnColor, setBtnColor] = useState("#63ABFF");
  const [show, setShow] = useState(false)

  useEffect(()=>{
    if(!vmaxAd) return; //safe check from vmaxAd condition
    if(noShow && id === activeVideoId) setTimeout(()=> {
      setShow(true);
      setTimeout(()=>{ setBtnColor(CtaColor)},2000)
    },2000);
    else setBtnColor("#8e8e97");
  },[activeVideoId])

  if(!noShow){
    return false;
  }

  const callTrackers = async() => {
    if(ctaTrackers?.length > 0){
      try{
        ctaTrackers.map(async url => await pushAdService({url}).then(res => res));
      }catch(err){ 
        console.log(err,"pushAdService error");
      }
    }
  }
  
  return (
    <>
    {show && <div
      className="px-2 py-4 absolute bottom-16 w-full z-50 box-border animateBottom"
      onClick={() => {
        setMuted && setMuted(true);
        adBtnClickCb && adBtnClickCb?.();
        callTrackers();
        window.open(ctaPath);
      }}
    >
      <a
        href={void(0)}
        style={{ backgroundColor: btnColor }}
        target="_blank"
        rel="noreferrer"
        className="px-2 py-2 text-white rounded-md flex items-center justify-between text-sm font-semibold transition ease-linear delay-1000"
        >
        {CtaText}
        <span>
          <RightArrow value="#fff" />
        </span>
      </a>
    </div>}
    </>
  )
}

export default memo(AdButton);