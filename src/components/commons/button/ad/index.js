import React from 'react'
import RightArrow from '../../svgicons/right-arrow';

function AdButton({noShow = false, setMuted, adBtnClickCb, CtaText, CtaColor, ctaPath}) {

  if(!noShow){
    return false;
  }
  
  return (
    <div
      className="px-2 py-4 absolute bottom-16 w-full z-50 box-border"
      onClick={() => {
        setMuted && setMuted(true);
        adBtnClickCb && adBtnClickCb?.();
        window.open(ctaPath);
      }}
    >
      <a
        href={void(0)}
        style={{ backgroundColor: CtaColor }}
        target="_blank"
        rel="noreferrer"
        className="px-2 py-2 text-white rounded-md flex items-center justify-between text-sm font-semibold"
        >
        {CtaText}
        <span>
          <RightArrow value="#fff" />
        </span>
      </a>
    </div>
  )
}

export default AdButton;