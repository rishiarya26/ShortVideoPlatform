/* eslint-disable max-len */

const Share = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    fill="none"
    viewBox="0 0 48 48"
  >
    <g filter="url(#filter0_b)">
      <rect
        width="48"
        height="48"
        fill="#fff"
        fillOpacity="0.2"
        rx="24"
      />
    </g>
    <g clipPath="url(#clip0)">
      <path
        fill="#fff"
        d="M36 23.992l-9.974-10.937v6.525h-2.12C17.33 19.58 12 24.91 12 31.485v3.458l.942-1.032a16.902 16.902 0 0112.484-5.508h.6v6.526L36 23.992z"
      />
    </g>
    <defs>
      <filter
        id="filter0_b"
        width="52"
        height="52"
        x="-2"
        y="-2"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur
          in="BackgroundImage"
          stdDeviation="1"
        />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur"
          result="shape"
        />
      </filter>
      <clipPath id="clip0">
        <path
          fill="#fff"
          d="M0 0H24V23.953H0z"
          transform="translate(12 12)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Share;
