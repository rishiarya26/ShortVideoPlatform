/* eslint-disable max-len */

const Liked = () => (
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
        fill="#5C2ADE"
        fillOpacity="0.6"
        rx="24"
      />
    </g>
    <g fill="#fff" clipPath="url(#clip0)">
      <path d="M13.75 34h2.5c.965 0 1.75-.785 1.75-1.75v-11.5c0-.965-.785-1.75-1.75-1.75h-2.5c-.965 0-1.75.785-1.75 1.75v11.5c0 .965.785 1.75 1.75 1.75zM24.781 11.75c-1 0-1.5.5-1.5 3 0 2.376-2.301 4.288-3.781 5.273v12.388c1.601.741 4.806 1.839 9.781 1.839h1.6c1.95 0 3.61-1.4 3.94-3.32l1.12-6.5a3.998 3.998 0 00-3.94-4.68h-4.72s.75-1.5.75-4c0-3-2.25-4-3.25-4z" />
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
          d="M0 0H24V24H0z"
          transform="translate(12 11)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Liked;
