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


function Privacy() {
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
      <div className="tray-container">
		<div className="tnc-text">
		{/* <div onClick={()=>router.back()}  className="p-4 flex items-center justify-center absolute left-0 top-3">
          <Back/>
    </div> */}
	<div className='mt-12 md:mt-24'>
	        <h1 className="">Privacy Policy</h1>
			</div>
	        <p>We, Zee Entertainment Enterprises Limited ("we", "us", "ZEEL") value the trust placed in use by You and therefore, we follow the highest standards of privacy guidelines to protect the information shared by You with us.</p>

			<p>This Privacy Policy ("Privacy Policy") governs the use of Personal Information shared (as defined below) with or collected by ZEEL from the users or subscribers of 'ZEE5.'</p>

			<p>Your viewing or browsing of our content or Your use of our services offered on ZEE5 is constructed to mean that You consent to our collection, storage, processing and transfer of your Personal Information or Sensitive Personal Data or Information in accordance with this Privacy Policy and you consent to the terms and conditions of this Privacy Policy. You agree to be bound by the terms of this Privacy Policy.</p>

			<p>If You do not agree with the terms contained herein, please do not download or browse ZEE5. By mere browsing or use of ZEE5 platform or its application, You consent to the terms of this Privacy Policy and agree to the use of Your Personal Information in the manner as provided under this Privacy Policy.</p>

			<p>All capitalized terms that have not been specifically defined herein shall have the same meaning as provided under the Terms of Use.</p>

			<p>This Privacy Policy should be read in conjunction and together with the Terms of Use available on www.zee5.com/terms</p>

			<p>'Personal Information', 'Information' and 'Sensitive Personal Data or Information' shall have the meaning ascribed to it under the applicable laws in India.</p>

			<p>Collection And Use Of Personal Information
			We collect the information directly provided by you, your usage and log data, data collected through cookies and similar technologies.</p>

			<p>Data provided by user
			We collect the following personal information about You when You use or browse ZEE5, at the time of Your registration with ZEE5 and when You share such information with Us through email, by posting on ZEE5 or by any other means like customer care centre, etc made available to You by Us.</p>

			<p>We collect information with respect to Your name, mobile number, email, address, IP Address, zip code, age, gender, occupation etc.</p>

			<p>Based on Your purchase of a subscription package, our payment gateway partners collect information with respect to Your credit/debit card details or other bank account details. This information is stored by our payment gateway partners. For instance, ZEE5 will be using third party payment gateway providers to process and facilitate the payment of Your Subscription Fee to ZEE5 for providing you access to the subscription. Please note that ZEE5 does not directly collect any financial information such as credit card or debit card or net banking details from You. Such payment gateway partners are not controlled by us. When you visit such payment gateways you do so at your own risk. These payment gateways may have their own privacy policies in place, which we recommend You review if You visit any such payment gateways. We do not assume any responsibility or liability for such payment gateways, the content of such payment gateways and their privacy practices, nor do we endorse them. We encourage you to familiarize yourself with the privacy statements provided by such payment gateways prior to providing them with information about you or entering into any transactions with them.</p>

			<p>While transacting with these payment gateways, You may provide Your financial information including without limitation Your bank account details, credit card account details or your details pertaining to any payment settlement or pre-paid instrument service provider. You understand, agree and acknowledge that ZEE5 never receives Your financial and payment information from these payment gateways. Your Personal Information, Sensitive Personal Data or Information and nancial information will be dealt with by these payment gateways in accordance with their respective privacy policies and other terms and conditions and ZEE5 shall not be liable, accountable or responsible for Your Personal Information, Sensitive Personal Data or Information and nancial information which You provide to these payment gateways.</p>

			<p>If you choose to log-in, access or otherwise connect to ZEE5, through a third-party service (such as Facebook, Twitter, etc), we may, for example, collect your user ID and user name associated with that service, as well as any information you make public using that service. We may also collect information you have authorized the service to share with us (such as your user ID, billing information, public profile information, email address, birthday, and other account and profile data).</p>

			<p>We collect information in order to provide You with a safe, efficient, smooth and customized experience. This allows Us to provide services and features that most likely meet Your needs, and to customize ZEE5 to make Your experience safer and easier.</p>

			Except as provided herein, we do not solicit any Sensitive Information about You. However, if You share such information with us voluntarily, We will not be liable for any actions, claims, costs, expenses or other liabilities that may arise as a consequence of such any unauthorized use or misuse of such information.

			<p>Inferred Information through usage and log data
			We may track certain information about You based upon Your behaviour on ZEE5. We use this information for conducting internal research on Our users' demographics, devices, interests, and behaviour to better understand, protect and serve Our users. This information is compiled and analysed on an aggregated basis. This information may include the platform that You just visited (whether this platform is on ZEE5 or not), which platform You next visit, Your computer browser information. We may also collect Your Information to track user behaviour and preferences for internal analytics and research.We may also use Your information: (i) to evaluate Your interest for various genres of content, services, offers; (ii) to perform analytics and conduct customer research, to determine Your interest, for identifying Content that generate sales and to analyse traffic patterns.</p>

			<p>If You choose to post messages on social media accounts, message boards, chat rooms or other message areas or leave feedback, We will collect that information You provide to Us. We retain this information as necessary to resolve disputes, provide customer support and troubleshoot problems as permitted by law.</p>

			<p>If You send Us personal correspondence, such as emails or letters, or if other users or third parties send Us correspondence about Your activities or postings on ZEE5, we may collect and store such information.</p>

			<p>ZEEL is a company based in India. By browsing/using ZEE5, You hereby acknowledge that ZEEL is not responsible or liable in any manner to comply with any local laws of Your territory except India with respect to ZEE5.</p>
	    </div>   
	</div>
    </div>
	</>
  );
}

export default Privacy;

