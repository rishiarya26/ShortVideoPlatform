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
	        <p>We, Zee Entertainment Enterprises Limited (“we”, “us”, “ZEEL”) value the trust placed in us by You and therefore, we follow the highest standards of privacy guidelines to protect the information shared by You with us. </p>

			<p>This Privacy Policy (“Privacy Policy”) governs the use of Your Personal Information shared (as defined below) with or collected by ZEEL from the users of the “Hipi” platform, including the Hipi website, and mobile applications (“Hipi”).</p>

			<p>Your viewing or browsing of our content or Your use of our services offered on Hipi is constructed to mean that You consent to our use, collection, storage, processing, alteration, retrieval, indexing, erasure, making available of, and/or transfer (“Processing”) of your Personal Information in accordance with this Privacy Policy, and you agree to be bound by the terms of this Privacy Policy. </p>

			<p>If You do not agree with the terms contained herein, please do not view, browse or download Hipi. By mere browsing or use of Hipi platform or its application, You consent to the terms of this Privacy Policy and agree to the Processing of Your Personal Information in the manner as provided under this Privacy Policy.</p>

			<p>This Privacy Policy is a part of, and should be read together with the Terms of Use available <span className='cursor-pointer font-medium text-gray-800' onClick={()=>router?.push('/terms-conditions.html')}>here</span>. All capitalized terms that have not been specifically defined herein shall have the same meaning as provided under the Terms of Use. </p>
			 
			 <h3> I.	Collection and Purpose of Use of Personal Information</h3>
			 <p>We collect the information directly provided by you, as well as from your usage and log data, data collected through cookies and similar technologies, as elaborated below:</p>
			 <p>a.	Data provided by user</p>
			 <p>We collect information with respect to Your name, mobile number, email, address, IP Address, zip code, age, gender, occupation etc. and as further detailed in this policy (“Personal Information”).</p>
			 <p>We collect Personal Information about You when You use or browse Hipi, at the time of Your registration with Hipi. Data is also collected  when You share information with us through email, by posting on Hipi platforms or by any other means like customer care centre, etc made available to You by us. </p>
			<p>Based on Your purchase of a subscription package, our payment gateway partners or pre-paid instrument service providers, as applicable, collect information with respect to Your credit/debit card details, net banking, or other bank account details. For instance, ZEEL will be using third party payment gateway providers to process and facilitate the payment of Your Subscription Fee to ZEEL which will enable your access to the subscription. This information is stored by our payment gateway partners or pre-paid instrument service providers, as applicable, and not by ZEEL. </p>
			<p>Please note that ZEEL does not directly collect any such financial information from You. Such payment gateway partners or pre-paid instrument service providers, as applicable, are not controlled by us. When you visit such payment gateways or pre-paid instrument service providers, as applicable, you do so at your own risk. These payment gateways or pre-paid instrument service providers, as applicable, may have their own privacy policies in place, which we recommend You review. We also encourage you to familiarize yourself with the privacy statements provided by such payment gateways or pre-paid instrument service providers, as applicable, prior to providing them with information about you or entering into any transactions with them. We do not assume any responsibility or liability for such partners, the content of such payment gateways or pre-paid instrument service providers, as applicable, and their privacy practices, nor do we endorse them.</p>
			<p>If you choose to log-in, access or otherwise connect to Hipi, through a third-party service (such as Facebook, Twitter, etc), we may, for example, collect your user ID and user name associated with that service, as well as any information you make public using that service. We may also collect information you have authorized the service to share with us (such as your user ID, billing information, public profile information, email address, birthday, and other account and profile data). </p>
			<p>We collect information in order to provide You with a safe, efficient, smooth and customized experience. This allows us to provide services and features that most likely meet Your needs, and to customize Hipi to make Your experience safer and easier.</p>
			<p>Except as provided herein, we do not solicit any sensitive Personal Information about You. However, if You share such information with us voluntarily, we will not be liable for any actions, claims, costs, expenses or other liabilities that may arise as a consequence of such any unauthorized use or misuse of such information.</p>
			<p>b.	Inferred Information through usage and log data</p>	
			<p>We may also use Your information to: (i) track user behaviour; (ii) evaluate Your interest for various genres of content, services, offers; and (iii) perform analytics and conduct customer research, to determine Your interest, for identifying Content that generates sales and to analyse traffic patterns, demographics, devices, interests, and behaviour to better understand, protect and serve our users. This information is compiled and analysed on an aggregated basis. This information may include the platform that You just visited (whether this platform is on Hipi or not), which platform You next visit, and Your computer browser information.</p>
			<p>If You choose to post messages on social media accounts, message boards, chat rooms or other message areas or leave feedback, we will collect that information You provide to Us. We retain this information as necessary to resolve disputes, provide customer support and troubleshoot problems as permitted by law.</p>
			<p>If You send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about Your activities or postings on Hipi, we may collect and store such information.</p>
			<p>We identify and use Your IP address to help diagnose any problems with our server, and to administer Hipi. Your IP address is also used to help identify You and to gather broad demographic information to customize Your experience on Hipi.</p>
			<p>We will occasionally ask You to complete optional online surveys. These surveys may ask You for contact information and demographic information (like zip code, age, etc). We use this data to tailor Your experience at Hipi, providing You with content that We think You might be interested in and to display content according to Your preferences.</p>
			<p>c.	Cookie</p>
			<p>A "cookie" is a small piece of information stored by a web server on a web browser so it can be later read back from that browser. Cookies are useful for enabling the browser to remember information specific to a given user. We place both permanent and temporary cookies in Your computer's hard drive. The cookies do not contain any of Your Personal Information.</p>
			<p>We may combine Your Personal Information, other information and information collected from tracking technologies and aggregate it with information collected from other users using our service to attempt to provide You with the Service and a better experience on Hipi. </p>


			<h3>II.	User consent</h3>
			<p>You expressly understand, agree and acknowledge that our Processing of your Personal Information is for a lawful purpose connected with a function or activity of Hipi platform. You hereby consent to the Processing of the Personal Information by Hipi or ZEEL for the purposes set out herein. You further understand, agree and acknowledge that Your Personal Information, including that which is classified as Sensitive Personal Data or Information as per applicable laws, is considered necessary for Hipi to provide the Service to You and for Your usage of the platform and other services provided by Hipi and You affirmatively give consent to Hipi for Processing Your Personal Information. </p>
			<p>Further, you will have the option to not provide your consent, or withdraw any consent given earlier, provided that the decision to not provide consent / withdrawal of the consent is intimated to us in writing at contact@hipi.co.in If you do not provide us Personal Information or withdraw the consent to provide us with any of your Personal Information at any point in time, we shall have the option not to provide the benefits for the purpose of which the said Personal Information was sought, this and may lead to cancellation of your registration with the Hipi and/or your access to certain features of Hipi can be restricted and may also lead to complete cessation of Your access to Hipi.  </p>
			
			<h3>III.	Disclosure and Transfer of Personal Information with Third Parties</h3>
			<p>We may disclose or transfer Your Personal Information to affiliates and group companies. We may also disclose or transfer Your Personal Information with third parties inside and outside India strictly on confidential terms. We may disclose or transfer such information to third parties in order to provide You access to Hipi and facilitate Your participation in any contest, game or activity conducted by ZEEL, to comply with Our legal obligations, to enforce Our Terms of Use, to facilitate Our marketing and advertising activities, or to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to Hipi.</p>
			<p>You hereby provide Your express consent to us for sharing Your Personal Information with third parties and our affiliates for  marketing and advertising purposes.</p>
			<p>We shall endeavour that the third parties and agents engaged by us to whom we may provide access to Your Personal Information for the purposes set out herein are under an contractual obligation to protect Your Personal Information in accordance with the same standard that Hipi has agreed to be subject to in this Privacy Policy. </p>
			<p>Hipi may disclose Your Personal Information to such extent as Hipi may deem necessary for You to enter into commercial transactions with the website and/or application of Hipi. Recipients of your Personal Information may be located outside India. This may include countries where applicable data protection laws provide a lesser degree of protection than India.  However, You expressly consent to usage of such Personal Information.</p>
			<p>In the event of any requirement by court order, government or quasi-government agency to disclose Your Personal Information, we will disclose information as may be legally required. We may also disclose Your Personal Information if we, in the good faith believe that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process.</p>
			<p>In the event ZEEL is merged with or acquired by another company or in case of re-organization or re-structuring of business, we and our affiliates will share Your Personal Information, wholly or in part, with another business entity.</p>

			<h3>IV.	Third Party Sites</h3>
			<p>Hipi may provide links to various third-party websites that may collect Your Personal Information. Use of Your information collected by such third party platform will be governed by the privacy policy in such third party platform. ZEEL has no control on the operation of such third party websites and You may share information with such third party at Your sole risk. ZEEL shall not be liable to You for any misappropriation of Your Personal Information by such third party.</p>
			

			<h3>V.	Promotional and Marketing Activities</h3>
			<p>We will send communications through various modes like SMS, message, email, etc to You at regular intervals to notify You of, among other things, various offers, new content, exclusive deals etc., that may be available or new services that You may be interest to subscribe to etc. By accessing Hipi, You expressly consent to receiving such communications from us at regular intervals.</p>
			<p>However, if You do not wish to receive any communication from us, You may request to unsubscribe from such communication by sending an email to contact@hipi.co.in with the subject as “Unsubscribe”.</p>
			
			<h3>VI.	Data Retention </h3>
			<p>We retain Personal Information only for as long as We believe it to be necessary for purposes set out herein for which the Personal Information was collected, subject to any legal requirements for the data to be retained for longer periods of time. </p>
			
			<h3>VII.	User Requests</h3>
			<p className='flex flex-col'>If You wish to
			<span className='flex'><span className='pr-1'>•</span> receive confirmation of the Processing of Your Personal Information, or a brief summary of the processing activities relating to Your Personal Information; </span>
			<span className='flex'><span className='pr-1'>•</span> access, update, or correct your Personal Information for any reason; </span>
			<span className='flex'><span className='pr-1'>•</span> delete/restrict the disclosure of only that Personal Information that is no longer necessary for the purpose it was collected;</span>
			</p>
			<p>You can always do so by sending a request to us on the e-mail id of our Customer Services department provided at the bottom of this page. Do note that any request for deletion/restriction on the disclosure of Your Personal Information will be dealt with as per applicable law.</p>
			<p className='flex flex-col'>Where the Processing was carried out through automated means, You also have the right to obtain from us your Personal Information that:
			<span className='flex'><span className='pr-1'>•</span> You consented to give us; or  </span>
			<span className='flex'><span className='pr-1'>•</span> that is necessary to perform a contract with You that has been generated in the course of your access of Hipi; or</span>
			<span className='flex'><span className='pr-1'>•</span> the Personal Information that forms part of your profile with us.</span>
			</p>

			<h3>VIII.	Security and Compliance with Laws</h3>
			<p>We strive to protect Your Personal Information against unauthorized disclosure, misuse, unlawful use, modification, loss or destruction. We take all reasonable measures and precautions, as per standard industry practises, to keep Your Personal Information confidential. We ensure compliance with all applicable laws.</p>
			<p>We use reasonable administrative, logical, physical and managerial measures to safeguard your personal information against loss, theft and unauthorized access, use and modification as per law. Unfortunately, no measures can be guaranteed to provide 100% security. Accordingly, we cannot guarantee the security of your information. By continuing to access the Hipi platform you are aware of such risk.</p>

			<h3>IX.	Amendments</h3>
			<p>This Privacy Policy is subject to change from time to time without any written notice to You. We reserve the right, at our sole discretion, to modify the terms of this Privacy Policy from time to time in order to ensure compliance with applicable laws (“Updated Terms”). The Updated Terms shall be effective immediately and shall supersede these the terms of this Privacy Policy. Upon updating the Policy, we may revise the "Updated" date at the bottom of this Privacy Policy. We will not be under an obligation to notify you of any changes to this Privacy Policy. You shall be solely responsible for reviewing the Privacy Policy from time to time for any modifications. By continuing to use Hipi after the Updated Terms have been published, You affirm Your agreement to the Updated Terms.  </p>

			<h3>X.	Contact Us</h3>
			<p>If You require any information or clarification regarding the use of Your Personal Information or this Privacy Policy, You can contact us at contact@hipi.co.in  </p>
			<p>ZEEL is a company based in India. By browsing/using Hipi, You hereby acknowledge that ZEEL is not responsible or liable in any manner to comply with any local laws of Your territory except India with respect to Hipi.</p>

	    </div>   
	</div>
	<StaticFooter/>
    </div>
	</>
  );
}

export default Privacy;

