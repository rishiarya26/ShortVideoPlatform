/* eslint-disable max-len */

const Comment = () => (
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
    <path
      fill="#fff"
      d="M18.001 14a6 6 0 00-6 6v4c0 .24.014.477.042.71A1 1 0 0012 25v8.826a1 1 0 001.65.759l4.788-4.104A2 2 0 0119.74 30H30a6 6 0 006-6v-4a6 6 0 00-6-6h-12z"
    />
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
    </defs>
  </svg>
);
export default Comment;
