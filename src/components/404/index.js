/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities */
// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import { withBasePath } from '../../config';
import FooterMenu from '../footer-menu';
import StaticFooter from '../static-footer';

function Error() {
  const router = useRouter();
  console.log(router)
  return (
	<div className="relative flex flex-col justify-center items-center h-screen w-screen bg-gray-300">
	<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0)">
<path d="M81.9737 81.9081C100.7 63.182 100.7 32.8209 81.9737 14.0947C63.2476 -4.6314 32.8865 -4.6314 14.1603 14.0947C-4.5658 32.8209 -4.5658 63.182 14.1603 81.9081C32.8865 100.634 63.2476 100.634 81.9737 81.9081Z" fill="#F5F5F5"/>
<path d="M66.1954 30H29.8047C26.6047 30 24 32.4955 24 35.5615V56.0963C24 59.1622 26.6047 61.6578 29.8047 61.6578H30.9209V67.5045C30.9209 68.8592 32.1116 70 33.5256 70C34.2698 70 34.9395 69.7148 35.4605 69.1444L42.1581 61.7291H66.1954C69.3953 61.7291 72 59.2335 72 56.1676V35.5615C72 32.4955 69.3953 30 66.1954 30ZM68.2047 56.0963C68.2047 57.1658 67.2372 58.0927 66.1209 58.0927H41.2651C40.7442 58.0927 40.2233 58.3779 39.8512 58.7344L34.6419 64.5098V59.8752C34.6419 58.877 33.8233 58.0927 32.7814 58.0927V58.164H29.8047C28.6884 58.164 27.7209 57.2371 27.7209 56.1676V35.5615C27.7209 34.492 28.6884 33.5651 29.8047 33.5651H66.1209C67.2372 33.5651 68.2047 34.492 68.2047 35.5615V56.0963Z" fill="black"/>
<path d="M56.9894 46.011C56.9953 41.0463 52.9753 37.0168 48.0106 37.011C43.0459 37.0051 39.0165 41.0251 39.0106 45.9898C39.0047 50.9545 43.0247 54.984 47.9894 54.9898C52.9541 54.9956 56.9836 50.9757 56.9894 46.011Z" fill="#D21404"/>
<path d="M51.9995 45.0022L44.0054 44.9732C43.4535 44.9712 43.0045 45.417 43.0025 45.9689C43.0005 46.5208 43.4463 46.9699 43.9982 46.9719L51.9923 47.0008C52.5442 47.0028 52.9933 46.557 52.9953 46.0051C52.9973 45.4532 52.5515 45.0042 51.9995 45.0022Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="96" height="96" fill="white"/>
</clipPath>
</defs>
</svg>
<div className="text-lg font-bold p-4">
OOPS Something went wrong!
</div>
<div  className="text-base font-semibold mt-6">
Explore more on Hipi
</div>
<button onClick={()=> router?.push('/feed/for-you')} className="rounded-sm text-white py-1 my-2 px-4 bg-hipired  tracking-wide xxs:text-sm xs:text-base  focus:outline-none">
Explore
</button>
<FooterMenu />
</div>
  );
}

export default Error;

