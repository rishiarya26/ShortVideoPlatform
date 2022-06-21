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


function Contact() {
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
		<div className='w-full flex flex-col md:flex-row md:py-24 py-8'>
          <div className='md:w-1/2 md:pl-32 pl-4 pr-4'>
          <img className='object-contain'  src={withBasePath('images/contact.jpg')} alt="hipi logo" /> 
          </div>
          <div className='md:w-1/2 flex-col flex p-8 px-32 justify-center tray-container text-center'> 
		  <h1 className="">Contact Us</h1>
				<p className='flexflex-col'>You can contact us for product feedback, content collaborations, and general enquiries by sending an email at<span> <a className='text-gray-800 font-medium cursor-pointer' href='mailto:contact@hipi.co.in'>contact@hipi.co.in</a></span>
			</p>
          </div>
      </div>
	  
     
	
	<StaticFooter/>
    </div>
	</>
  );
}

export default Contact;

