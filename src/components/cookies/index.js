/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { withBasePath } from '../../config';
import { setItem } from '../../utils/cookie';
function Cookies() {
const [close, setClose] = useState(false);
const [delayComp, setDelayComp] = useState(false);
const cookiesAccepted = ()=>{
setClose(true);
setItem('cookie-agreed','yes');
}
const cookiesDecline = ()=>{
   setClose(true);
   setItem('cookie-agreed','yes');
   }
   
useEffect(()=>{
   setTimeout(()=>{
      setDelayComp(true);
      console.log('timeout')
   },[5000])
},[])

const router = useRouter();
return (
   <>
{delayComp && <div className={`w-full h-full ${close ? 'hidden' : 'flex'} justify-center cookie_layout items-center z-20 bg-black bg-opacity-70 fixed top-0 left-0 overflow-hidden p-6`}>

<div className="cookie_wrapper w-full max-h-full bg-white flex flex-col items-center justify-between overflow-scroll">
   <div className="p-8 py-8 flex flex-col justify-center">
      <p className=" h1_cookie text-3xl font-medium text-purple-800 text-center mb-4">Cookie consent</p>
      <p className="text-base pt-2">Our website uses cookies to enable basic functionality, analyze visitor traffic, provide social media features and deliver a better user experience.</p>
      <p className="text-base pt-2">We may also use cookies to help us deliver targeted content and assess the performance of that content and associated campaigns.</p>
      <p className="text-base pt-2">You may view or change your cookie preferences at any time via the cookie management link found within the footer. For more information, please review our</p>
      <button onClick={()=>router && router && router.push('/privacy-policy.html')} className="underline text-purple-600 text-sm text-left pt-2">Web Privacy Policy</button>
   </div>
   <div className="button_cook bg-gray-100 w-full p-4 py-8 flex flex-col items-center">
      <button onClick={cookiesAccepted} className="border-2 border-gray-500 p-2 px-6 rounded-full text-base cursor-pointer">Accept all cookies</button>
      <div onClick={cookiesDecline} className="border-2 cursor-pointer border-gray-500 p-2 px-6 rounded-full text-base mt-4">Decline all cookies</div>
   </div>
</div>

</div>}
</>
);
}
export default Cookies;
