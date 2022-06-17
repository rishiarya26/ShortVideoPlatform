/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import { withBasePath } from '../../config';
import { Back } from '../commons/svgicons/back_white';
import StaticFooter from '../static-footer';
import Header from '../desk-header';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import hipiLogo from '../../../public/icons/apple-icon-152x152-dunplab-manifest-17016.png'
import { useEffect, useState } from 'react';
import {getCanonicalUrl} from '../../utils/web'


function Grievance() {
	const router = useRouter()
	const [url, setUrl] = useState('');

	useEffect(()=>{
		setUrl(document?.location?.href);
	},[])
  return (
	<>  
	
	      <SeoMeta
        data={{
			additionalMetaTags:[{
				name: 'fb:app_id',
				content: '255188469592363'
			  }
			],
          openGraph: {
				title: 'Privacy Policy',
				description: 'Privacy Policy',
				url:url && getCanonicalUrl(url) ,
            images: [
              {
                url: 'https://www.hipi.co.in/icons/icon-512x512.png',
                width: 512,
                height: 512,
                alt: "hipi logo",
              }
			],
			type: 'image/png',
            site_name: 'Hipi'
          }
        }}
      />
    <div className="static_body relative">
		<div className='hidden md:flex'><Header/></div>
      <div className="tray-container min-h-70v">
		<div className="tnc-text">
		{/* <div onClick={()=>router.back()}  className="p-4 flex items-center justify-center absolute left-0 top-3">
          <Back/>
    </div> */}
	<div className='mt-12 md:mt-24'>
	        <h1 className="">Grievance Redressal Mechanism</h1>
			</div>

		<h3 className='text-gray-800 font-medium'>Lodging of Grievance</h3>
      <p className='flex flex-col'>If you wish to register any complaint in respect of any audio visual content uploaded on Hipi, please register the complaint with our grievance officer Ms. Shrutika Saraswat at grievance@hipi.co.in , in the format mentioned below, in order to take cognisance of the complaint and make the resolution process quick and efficient:
	  <span className='flex'><span className='pr-1'>(i)</span> Full Name</span>
	  <span className='flex'><span className='pr-1'>(ii)</span> Email </span>
	  <span className='flex'><span className='pr-1'>(iii)</span> Content link and screenshot of the content</span>
	  <span className='flex'><span className='pr-1'>(iv)</span> Short summary of complaint or other additional information </span></p>
	  <p>Please note that in absence of the complaint not filed in the aforesaid format and/or incomplete and/or if misleading and vague in nature, the complaint will be considered as “invalid complaint”.</p>


		<h3 className='text-gray-800 font-medium'>Grievance Redressal Process </h3>
		<p className='flex flex-col'>
	  <span className='flex'><span className='pr-1'>(i)</span> All complaints received having the aforesaid information will be acknowledged within 24 (twenty-four) hours.</span>
	  <span className='flex'><span className='pr-1'>(ii)</span> The complaint will be reviewed, verified, and addressed at the earliest, however no later than 15 (fifteen) days upon receipt of the complaint. </span>
	  <span className='flex'><span className='pr-1'>(iii)</span> The complaint will be resolved within 1 (one) month from the receipt of the complaint.</span>
	  </p>



	  <h3 className='text-gray-800 font-medium'>Restriction on the User</h3>
      <p className='flex flex-col mb-24'>Over and above the Community Guidelines, the Users on Hipi are strictly prohibited to post content and/or any information on the following:
	  <span className='flex'><span className='pr-1'>(i)</span> Information that affects the unity, integrity and sovereignty of the country</span>
	  <span className='flex'><span className='pr-1'>(ii)</span> Information that is derogatory to the rules of the society, defamatory to the general public or misleads the general public </span>
	  <span className='flex'><span className='pr-1'>(iii)</span> Information that is unethical, obscene; racial</span>
	  <span className='flex'><span className='pr-1'>(iv)</span> Information that is derogatory to a person or exposes their private parts or shows such a person in a sexual act or nudity.</span></p>



	    </div>   
	</div>
	<StaticFooter/>
    </div>
	</>
  );
}

export default Grievance;

