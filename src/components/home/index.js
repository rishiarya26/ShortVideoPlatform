
import { withBasePath } from '../../config';

function Home() {
  return (
    <div className="h-screen  w-screen flex flex-col ">
      <div className="w-full h-28 bg-hipidblue flex items-center justify-center lg:justify-start lg:px-10 ">
        <img className="w-12" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
      </div>
      <div className="bg_grad flex items-center p-10 relative">
        <div className="flex justify-end pr-10 items-center w-5/12 ">
          <img className="w-60" src={withBasePath('images/hipi_screenshot.png')} alt="hipi logo" /> 
        </div>
        <div className="flex items-start justify-start flex-col w-7/12 text-white pr-60">
          <h1 className="text-5xl leading-snug font-semibold py-10">Hipi is best experienced on mobile device.</h1>
          <p className="font-medium leading-normal mb-4 text-2xl font-light">
            Hipi is a mobile only platform.
            Download the app on your Android and iOS devices, or visit
            <a href="https://hipi.co.in/">www.hipi.co.in</a>
            {' '}
            on your mobile.
          </p>
          <div className="flex w-full mt-6">
           <img className="pr-2" src={withBasePath('icons/play_store.png')} alt="hipi logo" />
            <img src={withBasePath('icons/app_store.png')} alt="hipi logo" /> 
          </div>
        </div>
        <div className="absolute z-0">
          <svg width="442" height="558" viewBox="0 0 442 558" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M442 239.988C442 195.324 418.286 156.238 382.773 134.53C382.497 134.187 382.215 133.831 381.944 133.659V133.543L156.434 -19.1661C147.73 -25.0694 137.784 -29.0372 127.328 -30.2089C122.672 -30.7288 117.942 -31 113.144 -31C73.8288 -31 38.7209 -13.0663 15.5148 15.0569C5.21306 27.54 0 43.4587 0 59.6411V103.549C0 103.549 0.60466 39.262 64.0895 82.3162L277.947 227.139C286.806 233.138 291.235 236.138 291.237 240.38C291.238 244.623 286.81 247.625 277.955 253.63L54.176 405.369C1.36858 439.783 0 510.145 0 510.145V662C0.0248833 661.96 5.8227 643.88 33.0052 623.794L94.2033 581.849C113.433 569.396 120.53 558.759 130.67 536.377L130.804 536.327C130.804 536.327 138.585 514.717 169.707 491.159C174.096 488.263 393.159 339.497 406.569 326.554C429.058 304.846 442 273.713 442 239.988Z" fill="white" fillOpacity="0.1" />
          </svg>
        </div>
        <div className="absolute right-48 top-0 z-0">
          <svg width="275" height="339" viewBox="0 0 275 339" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M275 76.5364C275 48.7585 260.246 24.4494 238.15 10.9487C237.979 10.7352 237.804 10.514 237.635 10.4072V10.3345L97.3288 -84.6401C91.9133 -88.3115 85.7253 -90.7793 79.2199 -91.508C76.3233 -91.8314 73.3802 -92 70.3953 -92C45.9342 -92 24.0911 -80.8464 9.65284 -63.3557C3.24342 -55.592 0 -45.6916 0 -35.6273V-8.31972C0 -8.31972 0.376203 -48.3017 39.8747 -21.5248L165.534 63.5382C174.397 69.5378 178.829 72.5376 178.83 76.7812C178.831 81.0248 174.402 84.0273 165.542 90.0322L33.7068 179.392C0.851493 200.796 0 244.556 0 244.556V339C0.0154817 338.975 3.62272 327.73 20.5349 315.239L58.6106 289.152C70.5749 281.407 74.9903 274.791 81.2991 260.871L81.3827 260.84C81.3827 260.84 86.2238 247.4 105.587 232.748C108.318 230.947 244.613 138.425 252.956 130.375C266.948 116.874 275 97.5114 275 76.5364Z" fill="white" fillOpacity="0.1" />
          </svg>
        </div>
      </div>
      <div className="w-full h-60 bg-hipidblue flex py-3 justify-between flex-col px-10 text-gray-300">
        <div className="flex w-full text-sm">
          <div className="flex w-1/2">
            <a href="#" className="pr-2 cursor-pointer">About Us</a>
            <p className="text-xs leading-5 text-gray-500">|</p>
            <a href="#" className="px-2 cursor-pointer">Help Center</a>
            <p className="text-xs leading-5 text-gray-500">|</p>
            <a href="#" className="px-2 cursor-pointer">Privacy Policy</a>
            <p className="text-xs leading-5 text-gray-500">|</p>
            <a href="#" className="px-2 cursor-pointer">Terms of Use</a>
          </div>
          <div className="flex justify-end w-1/2">
            <a href="#" className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M14 0H2C0.9005 0 0 0.9005 0 2V14C0 15.1005 0.9005 15.999 1.999 15.999H8.068V10.262H6.1515V7.7635H8.068V6.5115C8.068 4.581 9.493 3.0695 11.3125 3.0695H13.078V5.892H11.4975C11.0845 5.892 10.9635 6.1295 10.9635 6.4565V7.7625H13.078V10.262H10.9635V16H13.999C15.0995 16 15.998 15.1005 15.998 14.001V2C16 0.9005 15.1005 0 14 0Z" fill="white" />
              </svg>
            </a>
            <a href="#" className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 12.376V3.90541C0 1.81978 1.67907 0.140701 3.76471 0.140701H12.2353C14.3209 0.140701 16 1.81978 16 3.90541V12.376C16 14.4616 14.3209 16.1407 12.2353 16.1407H3.76471C1.67907 16.1407 0 14.4616 0 12.376ZM13.6471 3.43482C13.6471 2.91501 13.2257 2.49364 12.7059 2.49364C12.1861 2.49364 11.7647 2.91501 11.7647 3.43482C11.7647 3.95461 12.1861 4.376 12.7059 4.376C13.2257 4.376 13.6471 3.95461 13.6471 3.43482ZM8 4.1407C10.2036 4.1407 12 5.93715 12 8.14071C12 10.3443 10.2036 12.1407 8 12.1407C5.79643 12.1407 4 10.3443 4 8.14071C4 5.93715 5.79643 4.1407 8 4.1407ZM4.94118 8.14071C4.94118 6.44581 6.30508 5.08188 8 5.08188C9.69492 5.08188 11.0588 6.44581 11.0588 8.14071C11.0588 9.8356 9.69492 11.1995 8 11.1995C6.30508 11.1995 4.94118 9.8356 4.94118 8.14071Z" fill="white" />
              </svg>
            </a>
            <a href="#" className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 1.5377C15.4111 1.79864 14.7792 1.97561 14.1153 2.05462C14.7932 1.64868 15.3121 1.00481 15.5581 0.239948C14.9222 0.61587 14.2203 0.888838 13.4724 1.03681C12.8736 0.397935 12.0217 0 11.0769 0C9.26422 0 7.7945 1.46973 7.7945 3.28139C7.7945 3.53833 7.82349 3.78929 7.87949 4.02926C5.15201 3.89227 2.73347 2.58552 1.11477 0.59987C0.831818 1.08379 0.670851 1.64766 0.670851 2.24957C0.670851 3.38837 1.25075 4.39318 2.13059 4.98105C1.59268 4.96307 1.08677 4.81509 0.64387 4.56913V4.61013C0.64387 6.19983 1.77566 7.52657 3.27637 7.82854C3.00142 7.90252 2.71148 7.94352 2.41153 7.94352C2.19959 7.94352 1.99462 7.92252 1.79365 7.88252C2.21156 9.18728 3.42335 10.1361 4.85909 10.1621C3.73629 11.042 2.32055 11.5649 0.782851 11.5649C0.517909 11.5649 0.256942 11.5489 0 11.5199C1.45273 12.4527 3.17742 12.9966 5.03107 12.9966C11.0689 12.9966 14.3693 7.99552 14.3693 3.65833L14.3583 3.23342C15.0032 2.77347 15.5611 2.19559 16 1.5377Z" fill="white" />
              </svg>
            </a>
            <a href="#" className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="11">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 1.52588e-05H15.7748V10.9952H0V1.52588e-05Z" fill="white" />
                </mask>
                <g mask="url(#mask0)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.85188 7.94613V2.72945C7.52365 3.6019 9.18491 4.46819 10.867 5.3459C9.18994 6.21562 7.52823 7.07688 5.85188 7.94613ZM15.5022 1.76876C15.3093 0.929674 14.6231 0.310931 13.7968 0.218588C11.8411 7.39693e-05 9.86126 -0.00106889 7.89029 7.39674e-05C5.91886 -0.00106889 3.93897 7.39693e-05 1.98263 0.218588C1.1568 0.310931 0.471086 0.929903 0.278171 1.76876C0.00319999 2.96327 0 4.26773 0 5.49767C0 6.72762 0 8.03162 0.2752 9.22659C0.467886 10.0654 1.1536 10.6842 1.97966 10.7763C3.93577 10.995 5.91566 10.9962 7.88709 10.995C9.85851 10.9962 11.8379 10.995 13.7938 10.7763C14.6197 10.6842 15.3058 10.0654 15.4992 9.22659C15.7742 8.03185 15.7749 6.72762 15.7749 5.49767C15.7749 4.26773 15.7771 2.9635 15.5022 1.76876Z" fill="white" />
                </g>
              </svg>
            </a>

          </div>
        </div>
        <div className="flex w-full text-gray-400 text-xs">
          <p>Copyright © 2021 Zee Entertainment Enterprises Ltd. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}

export default Home;

