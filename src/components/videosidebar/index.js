import React, { useState } from 'react';

function VideoSidebar(props) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="absolute bottom-28 right-3 text-white">
      <div className="relative p-3 text-center">
        <img className="usrimg w-12 h-12 rounded-full" src="https://assets2.charmboard.com/pro/images/104578166157776556785/1578291929591.jpeg?tr=w-200,h-200,z-0.75,fo-face,c-thumb,pr-true,q-70,g-face" />
        <div className="absolute bottom-0 left-6">
          <svg viewBox="0 0 60 60" width={24} height={24}>
            {' '}
            <defs>
              {' '}
              <clipPath id="prefix__a">
                {' '}
                <path d="M0 0h60v60H0z" />
                {' '}
              </clipPath>
              {' '}
            </defs>
            {' '}
            <g clipPath="url(#prefix__a)">
              {' '}
              <g display="block">
                {' '}
                <path fill="#FF2B54" d="M54 30c0 13.255-10.745 24-24 24S6 43.255 6 30 16.745 6 30 6s24 10.745 24 24z" />
                {' '}
                <path d="M54 30c0 13.255-10.745 24-24 24S6 43.255 6 30 16.745 6 30 6s24 10.745 24 24z" fill="none" />
                {' '}
              </g>
              {' '}
              <g display="block">
                {' '}
                <path fill="#FF2B54" d="M30 21.125v18" />
                {' '}
                <path strokeLinecap="round" stroke="#FFF" strokeWidth={4} d="M30 21.125v18" fill="none" />
                {' '}
              </g>
              {' '}
              <g display="block">
                {' '}
                <g strokeLinecap="round" stroke="#FFF" strokeWidth={4} fill="none">
                  {' '}
                  <path d="M-.125-9V9" transform="matrix(0 .92974 -1.00419 0 30 30.125)" />
                  {' '}
                  <path strokeLinejoin="round" d="M-.125-9V9" transform="matrix(0 .92974 -1.00419 0 30 30.125)" />
                  {' '}
                </g>
                {' '}
              </g>
              {' '}
            </g>
            {' '}
          </svg>
        </div>
      </div>
      <div className="relative p-3 text-center
"
      >
        {liked ? (
          <svg onClick={e => setLiked(false)} version="1.1" className="white" width="56" height="56" viewBox="0 0 56 56"><path className="st0" fill="#FFFFFF" fillOpacity="0.9" d="M45.5,22.2c0-0.1,0-0.3,0-0.4c0,0,0,0,0,0c-0.2-5.6-4.3-10-10-10c-5,0-7.5,3.3-7.5,3.3s-2.5-3.3-7.5-3.3c-5.8,0-10,4.6-10,10.4c0,2.1,0.6,4.2,1.5,6.2c0,0,0,0,0,0c0,0.1,0.1,0.1,0.1,0.2c0.2,0.4,0.4,0.7,0.6,1.1c0.1,0.1,0.2,0.3,0.2,0.4c0.2,0.4,0.4,0.7,0.7,1.1c0.1,0.1,0.1,0.2,0.2,0.3c0.3,0.4,0.6,0.9,0.9,1.3c0.1,0.1,0.2,0.2,0.3,0.3c0.3,0.3,0.5,0.6,0.8,1c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.1,0.1,0.1,0.2,0.2c0.3,0.3,0.6,0.7,0.9,1c0.1,0.1,0.1,0.1,0.2,0.2c0.4,0.4,0.7,0.8,1.1,1.2c0.1,0.1,0.2,0.2,0.3,0.3c0.3,0.3,0.6,0.6,0.8,0.8c0.1,0.1,0.2,0.2,0.3,0.3c0.4,0.3,0.7,0.7,1.1,1c0,0,0,0,0,0c3,2.7,5.4,4.6,7.1,4.6h0h0c1.7,0,4-1.8,7.1-4.6C40.1,34.8,45.5,28.8,45.5,22.2C45.5,22.2,45.5,22.2,45.5,22.2z" /></svg>
        ) : (
          <svg onClick={e => setLiked(true)} version="1.1" className="red" width="56" height="56" viewBox="0 0 56 56"><path className="st0" fill="#FE2C55" fillOpacity="0.9" d="M45.5,22.2c0-0.1,0-0.3,0-0.4c0,0,0,0,0,0c-0.2-5.6-4.3-10-10-10c-5,0-7.5,3.3-7.5,3.3s-2.5-3.3-7.5-3.3c-5.8,0-10,4.6-10,10.4c0,2.1,0.6,4.2,1.5,6.2c0,0,0,0,0,0c0,0.1,0.1,0.1,0.1,0.2c0.2,0.4,0.4,0.7,0.6,1.1c0.1,0.1,0.2,0.3,0.2,0.4c0.2,0.4,0.4,0.7,0.7,1.1c0.1,0.1,0.1,0.2,0.2,0.3c0.3,0.4,0.6,0.9,0.9,1.3c0.1,0.1,0.2,0.2,0.3,0.3c0.3,0.3,0.5,0.6,0.8,1c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.1,0.1,0.1,0.2,0.2c0.3,0.3,0.6,0.7,0.9,1c0.1,0.1,0.1,0.1,0.2,0.2c0.4,0.4,0.7,0.8,1.1,1.2c0.1,0.1,0.2,0.2,0.3,0.3c0.3,0.3,0.6,0.6,0.8,0.8c0.1,0.1,0.2,0.2,0.3,0.3c0.4,0.3,0.7,0.7,1.1,1c0,0,0,0,0,0c3,2.7,5.4,4.6,7.1,4.6h0h0c1.7,0,4-1.8,7.1-4.6C40.1,34.8,45.5,28.8,45.5,22.2C45.5,22.2,45.5,22.2,45.5,22.2z" /></svg>
        )}
        <p className="text-sm">500</p>
      </div>
      <div className="relative p-3 text-center flex flex-col items-center">
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.9" filter="url(#CommentShadowColor_filter0_d)"><path fillRule="evenodd" clipRule="evenodd" d="M38.4943 35.3128C42.6 31.2 45 26.9162 45 21.928C45 11.8056 35.733 3.60001 24.2999 3.60001C12.8671 3.60001 3.6 11.8056 3.6 21.9283C3.6 32.051 13.1669 39 24.6 39V42.3569C24.6 43.4205 25.7028 44.105 26.638 43.5983C29.5598 42.015 34.9741 38.8392 38.4943 35.3128ZM14.2446 19.4564C15.8786 19.4564 17.2031 20.7714 17.2031 22.3912C17.2031 24.0142 15.8786 25.3291 14.2446 25.3291C12.6134 25.3291 11.2888 24.0142 11.2888 22.3912C11.2888 20.7714 12.6134 19.4564 14.2446 19.4564ZM27.2572 22.3912C27.2572 20.7714 25.9332 19.4564 24.3 19.4564C22.667 19.4564 21.3429 20.7714 21.3429 22.3912C21.343 24.0142 22.6671 25.3291 24.3 25.3291C25.9332 25.3291 27.2572 24.0142 27.2572 22.3912ZM34.355 19.4564C35.9887 19.4564 37.3113 20.7714 37.3113 22.3912C37.3113 24.0142 35.9888 25.3291 34.355 25.3291C32.7213 25.3291 31.3969 24.0142 31.397 22.3912C31.397 20.7714 32.7214 19.4564 34.355 19.4564Z" fill="white" /></g>
          <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M24.6001 38.9999C24.6001 38.9999 36.0669 38.1138 40.8601 31.9764C36.0669 38.7276 31.2737 42.4101 27.0796 43.6376C22.8855 44.8651 24.6001 38.9999 24.6001 38.9999Z" fill="url(#CommentShadowColor_paint0_linear)" />
          <defs>
            <filter id="CommentShadowColor_filter0_d" x="1.2001" y="2.40001" width="46.2" height="44.9688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.2" />
              <feGaussianBlur stdDeviation="1.2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <linearGradient id="CommentShadowColor_paint0_linear" x1="20.4103" y1="37.6698" x2="22.3081" y2="43.6335" gradientUnits="userSpaceOnUse">
              <stop />
              <stop offset="1" stopOpacity="0.01" />
            </linearGradient>
          </defs>
        </svg>
        <p className="text-sm">25</p>
      </div>
      <div className="relative p-3 text-center flex flex-col items-center">
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.9" filter="url(#ShareShadowColor_filter0_d)"><path fillRule="evenodd" clipRule="evenodd" d="M25.8 10.3085C25.8 9.04248 27.3162 8.39262 28.233 9.26572L42.1847 22.5524C43.4124 23.7216 43.3695 25.6932 42.092 26.8079L28.1867 38.9414C27.2552 39.7542 25.8 39.0926 25.8 37.8564V32.3581C25.8 32.3581 10.8695 29.6685 6.08025 38.4593C5.63374 39.2789 3.89328 39.5657 4.24706 35.4764C5.72648 27.9499 8.75001 16.1999 25.8 16.1999V10.3085Z" fill="white" /></g>
          <path opacity="0.03" fillRule="evenodd" clipRule="evenodd" d="M36.0958 16.8L38.8639 22.3362C39.3536 23.3155 39.1184 24.5021 38.2921 25.2206L25.8958 36C25.8958 36 25.2958 39 27.0958 39C28.8958 39 43.2958 25.8 43.2958 25.8C43.2958 25.8 43.8958 24 42.0958 22.2C40.2958 20.4 36.0958 16.8 36.0958 16.8Z" fill="#161823" />
          <path opacity="0.09" fillRule="evenodd" clipRule="evenodd" d="M25.7997 16.8389V32.4389C25.7997 32.4389 11.5114 30.4255 7.03635 37.2389C2.73042 43.7949 3.12588 29.8349 9.60816 22.8829C16.0904 15.931 25.7997 16.8389 25.7997 16.8389Z" fill="url(#ShareShadowColor_paint0_radial)" />
          <defs>
            <filter id="ShareShadowColor_filter0_d" x="1.79995" y="7.66563" width="43.6786" height="35.2335" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.2" />
              <feGaussianBlur stdDeviation="1.2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <radialGradient id="ShareShadowColor_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26.324 42.5462) rotate(-113.046) scale(19.0955 18.771)">
              <stop />
              <stop offset="0.995496" stopOpacity="0.01" />
              <stop offset="1" stopOpacity="0.01" />
            </radialGradient>
          </defs>
        </svg>
        <p className="text-sm">7029</p>
      </div>
    </div>
  );
}

export default VideoSidebar;
