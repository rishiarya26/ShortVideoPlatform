/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import StaticFooter from '../static-footer';
import Header from '../desk-header';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import { useEffect, useState } from 'react';
import {getCanonicalUrl} from '../../utils/web'


function RewardsRules() {
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
	        <h1 className="">HIPI REWARDS: RULES AND REGULATIONS</h1>
			</div>
			<h3 className="text-gray-800 font-medium pb-2">CONTEST DESCRIPTION</h3>
	        <p><strong>"Hipi Rewards”</strong> is a lucky draw-based contest (<strong>“Contest”</strong>) which can be accessed on the Application (as defined below) owned and operated by Zee Entertainment Enterprises Limited (<strong>“ZEEL”</strong>). Broadly, the Contest consists of the following experiences:</p>
			<p className='flex'> <span className='px-2'>•</span>To enter the Contest, the Participant(s) (as defined below) will have to Watch videos, and/or Follow creators, and/or Upload videos (each as defined below) on the Application.  The Participant(s) shall receive a link of these Rules and Regulations upon clicking the Contest advertisement banner.</p>
			<p className='flex'> <span className='px-2'>•</span>The Participant(s) who Watch videos, and/or Follow creators, and/or Upload videos on the Application, shall automatically enter the Contest and stand a chance to win the Gratification (as defined below) during the Term (as defined below) of the Contest. </p>
			<p>This Rules and Regulations set forth the general terms and conditions and rules of the Contest titled <strong>“Hipi Rewards”</strong> and is in addition to (not in lieu of) to the<span className='cursor-pointer  text-blue-600' onClick={()=> router && router?.push('/rewards')}> Hipi Rewards – FAQs</span>,<span className='cursor-pointer  text-blue-600' onClick={()=> router && router?.push('/terms-conditions.html')}>Terms of Use </span>,  <span className='cursor-pointer  text-blue-600' onClick={()=> router && router?.push('/community-guidelines.html')}>Community Guidelines</span>  and <span className='cursor-pointer  text-blue-600' onClick={()=> router && router?.push('/privacy-policy.html')}>Privacy Policy </span> that apply to the Application.</p>
			<p>For the purpose of this Contest, wherever the context so requires:</p>
			
			<p className='flex'> <span className='px-2'>(i)</span>“Application” shall mean the platform currently branded as "Hipi" and accessible from the Device(s).</p>
			<p className='flex'> <span className='px-2'>(ii)</span>"Contest" refers to the Contest available on the ‘Rewards’ page of the Application and is titled "Hipi Rewards". The Contest is available on the Application which may be played by the Participants on the Device(s) in accordance with the Rules & Regulations. The Contest may also include other forms of contests, lucky draws, games hosted by ZEEL or third-party partners or sponsors during the Term of the Contest.</p>
			<p className='flex'> <span className='px-2'>(iv)</span>"Intellectual Property" shall include but not limited to Contest, creatives, game/ Contest format, prize format, scoring format, all trademarks and copyrights obtained by the ZEEL for the purposes of this Contest, UI design, domain names and terminologies used in this document to define specific aspects of the Contest and any other Intellectual Property associated or related or developed in relation to the Contest.</p>
			<p className='flex'> <span className='px-2'>(v)</span>“Gratification” shall mean a chance for the Participant(s) of the Contest during the Term of the Contest to win  coins on daily basis in the denominations of INR 4/ (Indian National Rupees Four Only), INR 6/- (Indian National Rupees Six Only), INR 8/- (Indian National Rupees Eight Only) INR 10/- (Indian National Rupees Ten Only) and INR 12/- (Indian National Rupees Twelve Only) respectively through spin the wheel. Since this is a lucky draw-based contest the Participant may not win any amount after playing this Contest.   The Gratification shall be awarded to Winners through spin the wheel game and at ZEEL’s sole discretion and shall be binding on all Participant(s). The Gratification is non-transferable and non-assignable. The Winners can accumulate not more than 162 (one hundred and sixty-two) redeemable coins in 1 particular calendar day on the Platform. </p>
			<p className='flex'> <span className='px-2'>(vi)</span>"Intellectual Property" shall include but not be limited to copyrights, trademarks, patents, trade secrets, domain names and / or any other legal interests recognized or protected as intellectual property.</p>
			<p className='flex'> <span className='px-2'>(vii)</span>"Participant(s)" means any person(s) who (i) has downloaded the latest version of Application on his/her Device, (ii) plays the Contest on the Application (iii) is present in India except resident(s) of  Andhra Pradesh, Arunachal Pradesh, Telangana, Meghalaya Sikkim, Nagaland and Tamil Nadu and (iv) is of sound mind and health and (v) has agreed to enter and participate in the Contest in accordance with the Rules & Regulations as defined in this document.</p>
			<p className='flex'> <span className='px-2'>(viii)</span>"Registered User(s)" means a person who registers on the Application through an e-mail ID, phone number or Facebook ID to access and / or participate in the Contest.</p>
			<p className='flex'> <span className='px-2'>(ix)</span>"Rules & Regulations" means these rules and regulations governing the Contest, as stated herein in entirety and as may be amended by ZEEL from time to time without prior notice and includes key rules accompanying the version of the Contest in the Application.</p>
			<p className='flex'> <span className='px-2'>(x)</span>“Term” shall mean the tenure of the Contest made available on the Application at ZEEL’s sole discretion. </p>
			<p className='flex'> <span className='px-2'>(xi)</span>"Unique Identifier" refers to the unique identification number assigned to the phone number/email ID/Facebook ID of a Registered User. An unregistered Hipi User is assigned a guest Unique Identifier for the purposes of the Contest.</p>
			<p className='flex'> <span className='px-2'>(xii)</span>“User” shall mean any person who seeks to play the Contest and has registered itself on the Application for the Contest. Registration shall be completed upon the User providing all the registration data as may be required. However, the User does not have to compulsorily register itself on the Application.</p>
			<p className='flex'> <span className='px-2'>(xiii)</span>“Winner” shall mean lucky winners of the Contest during the Term of the Contest by ZEEL at its sole discretion through spin the wheel game who shall be awarded with Gratification. One Participant(s) shall be eligible to win multiple times however one Participant(s) cannot accumulate more than 162 (one hundred and sixty-two) redeemable coins in 1 particular calendar day. </p>
			
			<h3 className="text-gray-800 font-medium pb-2">1.ELIGIBILITY AND PARTICIPATION</h3>
			<p className='flex'> <span className='px-2'>(a)</span>The Contest is made available in English language exclusively the Application as accessible on the Devices.</p>
			<p className='flex'> <span className='px-2'>(b)</span>The Contest will work on the Application on Android (operating system version 4.4 and onwards) smartphones only. The Contest may work on tablets and devices other than smartphones operating on the Android (version 4.4 onwards) operating platforms. </p>
			<p className='flex'> <span className='px-2'>(c)</span>The Contest may work only in the territory of India and shall not be accessible from other territory(ies) across the world. Notwithstanding anything mentioned in this Rules and Regulations, resident(s) of Andhra Pradesh, Arunachal Pradesh, Telangana, Meghalaya Sikkim, Nagaland and Tamil Nadu are not eligible to participate in the Contest. The Gratification through the Contest shall be applicable only for Participant(s) from territories who are explicitly allowed and who are eligible and playing in India on the Application. </p>
			<p className='flex'> <span className='px-2'>(e)</span>To participate in the Contest, the User should (i) agree to enter and participate in the Contest in accordance with the Rules and Regulations as defined in this document (ii) play the Contest on the Application, (iii) be present in India and (iv) be of sound mind and health. The Participation in the Contest will be governed by the Indian Data Privacy requirements only. In case the Participant is below the age of 18 years; ZEEL shall assume a deemed acceptance of the Rules and Regulations by the parent and/or guardian of the Participant</p>
			
			<h3 className="text-gray-800 font-medium pb-2">2.REGISTRATION</h3>
			
			
			<p className='flex'> <span className='px-2'>(a)</span><span>Hipi’s <span className='cursor-pointer  text-blue-600' onClick={()=> router && router?.push('/terms-conditions.html')}>Terms of Use </span>,  <span className='cursor-pointer  text-blue-600' onClick={()=> router && router?.push('/community-guidelines.html')}>Community Guidelines</span>  and <span className='cursor-pointer  text-blue-600' onClick={()=> router && router?.push('/privacy-policy.html')}>Privacy Policy </span>  shall apply in relation to the Participant’s registration on the Application and the Participant shall at all times be bound by the same.</span></p>
			<p className='flex'> <span className='px-2'>(b)</span>By Participating in the Contest, the Participant allows ZEEL to access and display personal information such as name, city location, photo for any kind of marketing activity. The city location (derived from the IP address) of the Participant may be displayed during the Contest.</p>
			<p className='flex'> <span className='px-2'>(c)</span>Prior to proceeding, the User agrees with the Rules and Regulations governing the Contest.</p>
			<p className='flex'> <span className='px-2'>(d)</span>All Users that participate in the Contest shall be deemed to have read and accepted the Terms and Conditions, Term of Use, Community Guidelines and the Privacy Policy updated from time to time.</p>
			<p className='flex'> <span className='px-2'>(e)</span>The phone number first used for registration/ login and through which the Participant plays in the Contest shall be the Unique Identifier for the respective Participant. The coins can be redeemed only on such phone numbers associated with PayTM wallet account. If the Participant(S) do not possess PayTM wallet account, the coins will not be redeemable by the Participant(s), irrespective of Devices used for Contest.</p>
			<p className='flex'> <span className='px-2'>(f)</span>Registration is mandatory for the purposes of collecting Gratification and to play the Contest.</p>
			<p className='flex'> <span className='px-2'>(g)</span>Registering on the Application does not necessarily entitle the Participant(s) to be eligible to win the Gratification.</p>
			
			<h3 className="text-gray-800 font-medium pb-2">3.CHARGES</h3>
			
			
			<p className='flex'> <span className='px-2'>(a)</span>The Application download is free of cost, however, the viewing of the Application, live or otherwise, and access and play of the Contest shall consume data and may be subject to Application subscription packages. Therefore, the use of the Application and the Contest will result in the use and consumption of data for which data charges as charged by your internet/telecom operator may apply. </p>
			<p className='flex'> <span className='px-2'>(b)</span>ZEEL will not and does not receive any monies and/or consideration from the internet/telecom operators and/or any third party, in connection with the data consumed by the Participant for playing the Contest.</p>
			
			<h3 className="text-gray-800 font-medium pb-2">4.CONTEST RULES</h3>
			
			<p className='flex'> <span className='px-2'>(a)</span>The Participant(s) shall Participate in the following three ways to collect and win Gratification on the Application:</p>
			<p className='flex'> <span className='px-2'>1. </span>Watch and win <strong>(“Watch”):</strong></p>
			<p className='flex'> <span className='px-2'>1.1.</span>There are three levels under the Watch contest.</p>
			<p className='flex'> <span className='px-2'>1.2.</span><span><strong>Level 1:</strong> The Participant(s) on viewing 10 (ten) videos on the Application shall unlock the spin the wheel option for Level 1. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game. </span></p>
			<p className='flex'> <span className='px-2'>1.3.</span><span><strong>Level 2:</strong> The Participant(s) on viewing 20 (twenty) unique videos on the Application shall unlock the spin the wheel option for Level 2. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game. </span></p>
			<p className='flex'> <span className='px-2'>1.4.</span><span><strong>Level 3:</strong> The Participant(s) on viewing 30 (thirty) unique videos on the Application shall unlock the spin the wheel option for Level 3. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game. </span></p>
			
			<p className='flex'> <span className='px-2'>2. </span>Follow and win<strong> (“Follow”):</strong></p>
			
			<p className='flex'> <span className='px-2'>2.1.</span>There are three levels under the Follow contest.</p>
			<p className='flex'> <span className='px-2'>2.2.</span><span><strong>Level 1:</strong>The Participant(s) on following 20 (twenty) creators on the Application shall unlock the spin the wheel option for Level 1. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game. </span></p>
			<p className='flex'> <span className='px-2'>2.3.</span><span><strong>Level 2:</strong>The Participant(s) on following 40 (forty) unique creators on the Application shall unlock the spin the wheel option for Level 2. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game</span></p>
			<p className='flex'> <span className='px-2'>2.4.</span><span><strong>Level 3:</strong>The Participant(s) on following 60 (sixty) unique creators on the Application shall unlock the spin the wheel option for Level 3. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game.</span></p>
			
			<p className='flex'> <span className='px-2'>3. </span>Upload and win <strong>(“Upload”):</strong></p>

			<p className='flex'> <span className='px-2'>3.1.</span>There are three levels under the Upload contest.</p>

			<p className='flex'> <span className='px-2'>3.2.</span><span><strong>Level 1:</strong>The Participant(s) on receiving 5 (five) views on a video uploaded by such Participant(s) on the Application shall unlock the spin the wheel option for Level 1. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game.</span></p>
			<p className='flex'> <span className='px-2'>3.3.</span><span><strong>Level 2:</strong>The Participant(s) on receiving 10 (ten) unique views on a video uploaded by such Participant(s) on the Application shall unlock the spin the wheel option for Level 2. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game.</span></p>
			<p className='flex'> <span className='px-2'>3.4.</span><span><strong>Level 3:</strong>The Participant(s) on receiving 15 (fifteen) unique views on a video uploaded by such Participant(s) on the Application shall unlock the spin the wheel option for Level 3. The Participant(s) then stand a chance to win and collect Gratification by playing spin the wheel game.</span></p>
			

			<p className='flex'> <span className='px-2'>(b)</span>One redeemable coin is equivalent to INR 1/- (Indian national Rupees One Only) under the Contest and the maximum aggregate coins won by Participant(s) can only be 162 (one hundred and sixty-two) for any particular day by an individual Participant(s). </p>
			<p className='flex'> <span className='px-2'>(c)</span>Participant(s) may redeem coins by clicking on ‘Redeem Coins’ button on the ‘Coins’ screen on the Application. Once won all coins shall remain redeemable for a period of 90 (ninety) days from the date of winning, post which the coins shall exhaust and expire. </p>
			<p className='flex'> <span className='px-2'>(d)</span>The Participant(s) can access and play the Contest by clicking on ‘Rewards’ option available on the Application as well.</p>
			<p className='flex'> <span className='px-2'>(e)</span>In the event ZEEL receives any third-party claims, such Participant(s) shall stand disqualified from the Contest. </p>
			<p className='flex'> <span className='px-2'>(f)</span>It is mandatory for the Participant(s) to have an account on Application. </p>
			<p className='flex'> <span className='px-2'>(g)</span>ZEEL reserves the right to randomly select the lucky Winners through spin the wheel game from the Participant(s) during the Term of the Contest at ZEEL’s sole discretion. Such decision of ZEEL shall be final and binding on all Participant(s) of the Contest. </p>
	
			<h3 className="text-gray-800 font-medium pb-2">5.GRATIFICATION:</h3>
		
			<p className='flex'> <span className='px-2'>(a)</span>All Participant(s) are eligible to win Gratification during the Contest. </p>
			<p className='flex'> <span className='px-2'>(b)</span>ZEEL reserves the right to revise the Gratification and offer a substitute prize, at its sole discretion.</p>
			<p className='flex'> <span className='px-2'>(c)</span>It is the sole responsibility of the Participant to maintain the secrecy of Gratification link and to ensure that the same is not shared with any other person. A Gratification once claimed whether erroneously on another device / through an ID other than the intended ID / someone accessing a Participant’s Hipi login ID (in event of multiple users) shall not be the responsibility of ZEEL.</p>
			<p className='flex'> <span className='px-2'>(d)</span>The Participant(s) will be responsible for providing the correct login details on the Application of and ZEEL will not be responsible to validate correctness of the details provided by the Participant.</p>
			<p className='flex'> <span className='px-2'>(e)</span>ZEEL shall not be responsible in cases of Gratification forfeiture resulting due to incorrect login details provided on the Application, absence of a registered ID, in cases where the Gratification has not been credited/cannot be utilized due to absence of a KYC compliance with ZEEL’s terms and conditions, or any other reason(s) whatsoever. </p>
			<p className='flex'> <span className='px-2'>(f)</span>Participant(s) are expected to collect the Gratification as per validity mentioned against the Gratification. Please note that all Gratification can have different validity/expiry dates and ZEEL shall not entertain any request for change, replacement or extension in any Gratification in the event of expiry.</p>
			<p className='flex'> <span className='px-2'>(g)</span>If the said Participant is not 18 years of age as on the date of winning the Contest, then the parent’s or guardian’s details shall be accepted. </p>
			<p className='flex'> <span className='px-2'>(h)</span>ZEEL is not responsible to validate correctness of the mobile number provided by the Participant(s).</p>
			<p className='flex'> <span className='px-2'>(i)</span><span>For any queries/complaints or clarifications in relation to the redemption of the on the Application, the Participant is required to contact ZEEL at <span><a target="_blank" className='text-blue-600 font-medium cursor-pointer' href='mailto:contact@hipi.co.in' rel="noreferrer">contact@hipi.co.in</a></span></span></p>
			<p className='flex'> <span className='px-2'>(j)</span>By accepting the Rules & Regulations, the Participant(s) hereby agrees to comply with the Terms and Conditions of ZEEL.</p>
			<p className='flex'> <span className='px-2'>(k)</span>By agreeing to the Rules and Regulations, the Participant(s) agrees to be contacted at the number provided by him/her for purposes, including but not limited to, collection of KYC documents, validation for Winner’s determination, and such other details as may be deemed necessary by ZEEL.</p>
			<p className='flex'> <span className='px-2'>(l)</span>ZEEL reserves the right at its discretion to forfeit a Winner’s eligibility to win a Gratification in the following scenarios and proceed to contact the next eligible Participant for Gratification determination:</p>

			<p className='flex pl-2'> <span className='px-2'>i.</span>Failure to provide any documentation, proof or requested information, within the defined timelines</p>
			<p className='flex pl-2'> <span className='px-2'>ii.</span>Failure to access and submit the online form within defined timelines</p>
			<p className='flex pl-2'> <span className='px-2'>iii.</span>Any false/incorrect/misleading information provided by the Participant</p>
			<p className='flex pl-2'> <span className='px-2'>iv.</span>Any discrepancy is identified on KYC review including but not limited to PAN not belonging to said Participant</p>
			<p className='flex pl-2'> <span className='px-2'>v.</span>Failure to successfully contact the said Participant on the furnished contact details as per defined process</p>
			<p className='flex pl-2'> <span className='px-2'>vi.</span>Non-compliance to tax (direct and indirect) compliances required to claim the Prizes</p>
			<p className='flex pl-2'> <span className='px-2'>vii.</span>Failure to collect / claim the Prizes as per defined process and any other event not listed above</p>
			<p className='flex pl-2'> <span className='px-2'>viii.</span>viii.	Any Participant who breaches or is suspected to be in breach of the Rules & Regulations or any applicable law or if he/she is found to be misusing the Application or are engaged in illegal or fraudulent use of Application in any manner.</p>
			<p className='flex pl-2'> <span className='px-2'>IX.</span>ix.	If ZEEL has reasonable grounds to suspect that a resident of Andhra Pradesh, Arunachal Pradesh, Telangana, Meghalaya Sikkim, Nagaland and Tamil Nadu has fraudulently participated in this Contest. </p>
			
			<p className='flex'> <span className='px-2'>(m)</span>ZEEL will not permit or entertain any requests or claims to check / audit / challenge the logic of the factors relevant for determining lucky Winners.</p>


			<h3 className="text-gray-800 font-medium pb-2">6.GENERAL TERMS AND CONDITIONS</h3>
			
			<p className='flex'> <span className='px-2'>(a)</span>ZEEL may, at its discretion, contact the Participant(s), if required, for any clarifications needed regarding the information provided by such Participant(s). To facilitate the prize fulfilment process, ZEEL has the right, at any time, to require proof of identity and/or eligibility from the Participant(s). Upon request from ZEEL, the Participant(s) may be required to furnish necessary supporting documentation, including but not limited to proof of age, address, name, photo identity and nationality.</p>
			<p className='flex'> <span className='px-2'>(b)</span>Failure to provide any proof or requested information which is not available on the Application, within the timelines as may be communicated by ZEEL to the Participant(s), could result in the Gratification being forfeited.</p>
			<p className='flex'> <span className='px-2'>(c)</span>All personal details and information requested by and submitted to ZEEL by the Participant(s) must be truthful, accurate and not misleading. ZEEL reserves the right to disqualify any Participant(s) from the Contest, at its sole discretion, should the Participant(s) at any stage submit false, inaccurate or misleading personal details and/or information. ZEEL also reserves the right to forfeit the Gratification in cases where a discrepancy is found to exist in the information furnished/provided by the winning Participant.</p>
			<p className='flex'> <span className='px-2'>(d)</span>All attempts will be made to protect the Participant(s) data along with the Points earned from loss and corruption, but in an event that such data loss happens, ZEEL may have to continue with whatever data is available, or in any other manner as it may deem reasonable.</p>
			<p className='flex'> <span className='px-2'>(e)</span>It is recommended that the Participant(s) maintain privacy of his/her personal details and not mention the phone number or any other personal details on any social media platform or any other website.</p>
			<p className='flex'> <span className='px-2'>(f)</span>In case a Winner and/or Winners are below 18 years of age, his/her guardian is eligible to collect the Gratification on his/her behalf and shall be liable to furnish necessary supporting documentation as proof of relationship, age, address, name, photo identity and nationality to enable fulfilment of the prize. </p>
			<p className='flex'> <span className='px-2'>(g)</span><span>ZEEL will have access to and collect Contest data. By participating in the Contest or accessing the gamification feed, the Participant(s) consent to the collection, storage, processing and the transfer of and sharing of the Contest data by ZEEL, in accordance with the terms of its <span className='cursor-pointer  text-blue-600' onClick={()=> router && router?.push('/privacy-policy.html')}>Privacy Policy </span>and which the User confirms having read.</span></p>
			<p className='flex'> <span className='px-2'>(h)</span>ZEEL reserves the right to end the Contest at any time at its sole discretion irrespective of the Term.</p>
			

			<h3 className="text-gray-800 font-medium pb-2">7.DISCLAIMER</h3>
			
			
			<p className='flex'> <span className='px-2'>(a)</span>ZEEL is not responsible for the loss of any nature, and/or any physical injury and/or disability and/or disfigurement and/or mental trauma and/or death that may occur/ occurs to the participant, who has been considered as invalid and/or not selected and/or selected as a winner while participating in the Contest, in relation to the Contest and/ or Gratification.</p>
			<p className='flex'> <span className='px-2'>(b)</span>The interpretation and implementation of the Rules & Regulation shall be at the sole discretion of ZEEL. The decisions of ZEEL shall be final and binding, and not subject to challenge or appeal.</p>
			<p className='flex'> <span className='px-2'>(c)</span>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW OF INDIA, Hipi AND/OR CONTEST IS PROVIDED ON AN "AS IS" BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. WITHOUT LIMITING THE FOREGOING PROVISIONS, YOU ASSUME SOLE RISK AND RESPONSIBILITY FOR SELECTING Hipi TO ACHIEVE YOUR INTENDED RESULTS, AND SOLE RESPONSIBILITY FOR THE INSTALLATION OF, USE OF, REGISTRATION, AND RESULTS OBTAINED FROM Hipi. WITHOUT LIMITING THE FOREGOING PROVISIONS, ZEEL MAKES NO WARRANTY THAT Hipi WILL BE ERROR-FREE, VIRUS FREE, OR FREE FROM INTERRUPTIONS OR OTHER FAILURES OR THAT THE Hipi WILL SATISFY YOUR SPECIFIC REQUIREMENTS OR THAT THE ERRORS WILL BE RECTIFIED. YOU UNDERSTAND THAT Hipi AN BE BLOCKED OR MADE INOPERABLE AND ZEEL ASSUMES NO RESPONSIBILITY OR LIABILITY FOR THE SAME. Hipi IS NOT FAULT-TOLERANT AND IS NOT DESIGNED OR INTENDED FOR USE IN HAZARDOUS ENVIRONMENTS REQUIRING FAIL-SAFE PERFORMANCE, INCLUDING WITHOUT LIMITATION, IN THE OPERATION OF NUCLEAR FACILITIES, AIRCRAFT NAVIGATION OR COMMUNICATION SYSTEMS, AIR TRAFFIC CONTROL, WEAPONS SYSTEMS, DIRECT LIFE-SUPPORT MACHINES, OR ANY OTHER APPLICATION IN WHICH THE FAILURE OF Hipi NETWORK COULD LEAD DIRECTLY TO DEATH, PERSONAL INJURY, OR SEVERE PHYSICAL OR PROPERTY DAMAGE (COLLECTIVELY, "HIGH RISK ACTIVITIES"). ZEEL EXPRESSLY DISCLAIMS ANY EXPRESS OR IMPLIED WARRANTY OF FITNESS FOR HIGH RISK ACTIVITIES.</p>
			
			<h3 className="text-gray-800 font-medium pb-2">8.OTHER TERMS AND CONDITIONS</h3>
			
			<p className='flex'> <span className='px-2'>(a)</span>The Contest is meant for entertainment and recreational purposes only, and is not a bet, gamble, award or challenge or other form of formal event.</p>
			<p className='flex'> <span className='px-2'>(b)</span>Any loss or outrage or dissatisfaction suffered during playing the Contest by Participant(s) would not be the responsibility of ZEEL and/or its associates and affiliates, who will not be responsible to make good any such loss or dissatisfaction. Under no circumstances whatsoever, will the Participant(s) be entitled to claim any damages against ZEEL and/or its associates and affiliates including but not limited to general and special damages, consequential, pecuniary and non-pecuniary, liquidated, aggravated, exemplary damages, compensatory and non-compensatory, nominal and damages for loss of profit/ loss of opportunity.</p>
			<p className='flex'> <span className='px-2'>(c)</span>Other than the Device(s), the Contest will not be accessible on landscape mode, or through web browsers, and any third-party live TV streaming medium or any other operating systems/platforms on which the Application is available.</p>
			<p className='flex'> <span className='px-2'>(d)</span>ZEEL will endeavour to ensure that the integrity of the Contest is maintained at all times and will take reasonable steps in this regard. In the event ZEEL receives information that the integrity of the Contest has been compromised in any manner, including by using unfair or unlawful means, ZEEL reserves the right to take all actions, including suspending the Participant from the Contest, to protect itself, the Application and the Contest.</p>
			<p className='flex'> <span className='px-2'>(e)</span>By accepting the Rules & Regulations, the Participant agrees and authorizes ZEEL to use any information available and linked to his Unique Identifier (Phone number, Email) provided at the time of registration on the Application. The Participation in the Contest will be governed by the Indian Data Privacy requirements only.</p>
			<p className='flex'> <span className='px-2'>(f)</span>ZEEL will have access to and collect information and data related to the Participant’s and playing of the Contest by the Participant during Contest ("Contest Data"). The Participant consents to the use of this Contest Data by ZEEL for research and development for a better experience, including but not limited to understanding the functioning of the Contest, mapping general Participant behaviour in response to the features of the Contest, the improvement of the Application and the Contest in general, etc. By participating in the Contest, the Participants consent to the collection, storage, processing and the transfer of and sharing of the Contest Data by ZEEL, in accordance with its Privacy Policy. The Participation in the Contest will be governed by the Indian Data Privacy requirements only.</p>
			<p className='flex'> <span className='px-2'>(g)</span>None of the Participants shall, without the prior written approval of ZEEL, speak to the press or any other media or any third person, nor give any interviews or comments relating to any aspect of the Contest. The Participant shall not disclose any information whatsoever relating to ZEEL to any other party including screen shots of the Contest on social media websites. Violation of this clause shall immediately disqualify the Participant’s prospects of further participation.</p>
			
			
			<h3 className="text-gray-800 font-medium pb-2">9.INTELLECTUAL PROPERTY</h3>
			
			<p className='flex'> <span className='px-2'>(a)</span>The Content on Hipi and the "Hipi" word mark and the “Hipi” design mark, as well as certain other of the names, logos, and materials displayed on or through Hipi that constitute trademarks, trade-names, service marks or logos ("Marks") are owned by or licensed to Zee Entertainment Enterprises Limited and are subject to copyright, trademark, and other intellectual property rights under Indian laws. You agree not to reproduce, duplicate, copy, download, stream capture, archive, upload, publish, broadcast, sell, resell, modify, translate, decompile, disassemble, reverse engineer or exploit for any purposes the Hipi or any portion of the Hipi, including, without limitation, the Content and the Marks, except as authorized by these TERMS or as otherwise authorized in writing by ZEEL. In addition, you are strictly prohibited from creating derivative works, or materials that otherwise are derived from or based on in any way the Content and the Marks, including montages, mash-ups and similar videos, wallpaper, desktop themes, greeting cards, and merchandise, except as authorized by these Terms or as otherwise authorized in writing by ZEEL. You must abide by all copyright notices, information, and restrictions contained in or associated with any Content. You must not remove, alter, interfere with, or circumvent any copyright, trademark, or other proprietary notices marked on the Content or any digital rights management mechanism, device or other content protection or access control measure (including, without limitation, geo-filtering and/or encryption) associated with the Content.</p>
			<p className='flex'> <span className='px-2'>(b)</span>The Participant agrees that all intellectual property rights, title and interest in the user generated content published or generated on the Application by the Participant shall solely vest with ZEEL.</p>
			
			<h3 className="text-gray-800 font-medium pb-2">10.USER CONDUCT</h3>
			
			<p className='flex'> <span className='px-2'>(a)</span>Participant(s) agree not to disrupt, overburden, or aid or assist in the disruption or overburdening of any computer or server used to offer or support ZEEL or ZEEL’s services.</p>
			<p className='flex'> <span className='px-2'>(b)</span>Participant(s) shall not attempt to gain unauthorized access to the user accounts, servers or networks connected to ZEEL services by any means other than the user interface provided by ZEEL, including but not limited to, by circumventing or modifying, attempting to circumvent or modify, or encouraging or assisting any other person to circumvent or modify, any security, technology, device, or software that underlies or is part of the ZEEL’s services.</p>
			<p className='flex'> <span className='px-2'>(c)</span>Participant(s) shall not attempt to transmit content regarding services, products, surveys, contests, pyramid schemes, spam, unsolicited advertising or promotional materials, or chain letters.</p>
			
			<h3 className="text-gray-800 font-medium pb-2">11.GENERAL RULES & REGULATIONS</h3>
			
			<p className='flex'> <span className='px-2'>(a)</span>The Participant’s participation in the Contest shall considered to be acceptance of all Rules & Regulations as set forth herein including the Privacy Policy.</p>
			<p className='flex'> <span className='px-2'>(b)</span>The Participant hereby represents that he/she is not under any contract, exclusive or otherwise, with any other third party/ agency or is not under any kind of disqualification or disability under law, to enter into an agreement with ZEEL or its associates and affiliates, as the case may be.</p>
			<p className='flex'> <span className='px-2'>(c)</span>The Participant shall undertake, warrant and guarantee to ZEEL that the Participant has the full legal capacity to participate in the Contest, in accordance with these Rules & Regulations.</p>
			<p className='flex'> <span className='px-2'>(d)</span>The Participant acknowledges that he/she has voluntarily chosen to participate in the Contest at his / her free-will and is willing to bear all risk, costs & consequences arising from such participation in the Contest.</p>
			<p className='flex'> <span className='px-2'>(e)</span>The Participant shall not have any claim against ZEEL and/or any of its associates and affiliates connected with the Contest. ZEEL, its associates and affiliates or vendors connected with the Contest shall not be responsible for any such eventuality and the Participant(s) shall not be entitled to claim any compensation from ZEEL.</p>
			<p className='flex'> <span className='px-2'>(f)</span>In the event of any fault, misunderstanding or dispute concerning any part of the Contest, and/or the operation of the telephone system, internet system, or the validity of any question or answer options, the decision of ZEEL shall be final and binding on all Participant(s) and other persons. ZEEL is empowered to take a decision on any case or instances not covered by the present Rules & Regulations.</p>
			<p className='flex'> <span className='px-2'>(g)</span>ZEEL reserves the right to amend (add to, delete or modify) the Rules & Regulations prospectively or retrospectively, at its discretion and without prior approval in order to improve the Contest or remediate any issues that may occur. The Participant is requested to carefully read these Rules & Regulations from time to time before using the Application for participating in the Contest. It shall be the Participant’s responsibility to check these Rules & Regulations periodically for changes.</p>
			<p className='flex'> <span className='px-2'>(h)</span>ZEEL has the sole right at any time/to alter/ amend/ withdraw/ replace/discontinue and/or terminate the Contest without any prior intimation or notice to the public and ZEEL is not obligated in any manner whatsoever to compensate any person(s) who have participated in the Contest.</p>
			<p className='flex'> <span className='px-2'>(i)</span>If the operation of the Contest is prevented by an event of force majeure or otherwise, ZEEL may cancel all or any part of the Contest or take such other decision as it deems fit.</p>
			<p className='flex'> <span className='px-2'>(j)</span>If any provision of these Rules & Regulations is held by any Court or other competent authority to be void or unenforceable in whole or part, the other provisions of these Rules & Regulations and the remainder of the affected provisions shall continue to be valid. These Rules & Regulations and the Contest shall be governed by and construed in accordance with the laws of India and the Participant(s) submit irrevocably to the jurisdiction of the Courts in Mumbai.</p>
			<p className='flex'> <span className='px-2'>(k)</span>ZEEL is empowered to take a decision on any case not covered by the present Rules & Regulations.</p>
			<p className='flex'> <span className='px-2'>(l)</span>ZEEL, its associates and affiliates will not be liable for any loss of earnings, employment or otherwise, caused to the Participant(s) and arising as a result of his/her participation in the Contest.</p>
			<p className='flex'> <span className='px-2'>(m)</span>The Participant(s) hereby agree to indemnify ZEEL, its associates and affiliates against any claims that might arise from his/her actions or omissions while participating in the Contest.</p>
			<p className='flex'> <span className='px-2'>(n)</span>The Participant hereby agrees and undertakes that, ZEEL is in no manner whatsoever responsible and/or shall not be held liable in any manner whatsoever, for any injury of any kind including mental and/or emotional trauma caused to the Participant(s) in any manner whatsoever, in relation to the Contest.</p>
			<p className='flex'> <span className='px-2'>(o)</span>The only way to enter the Contest is through participation as described in these Rules & Regulations. Any person claiming that he/she can help get you access to the Contest for a consideration is defrauding you. Please contact your local police and report this person immediately.</p>
			<p className='flex'> <span className='px-2'>(p)</span>The Participant shall not have any ownership interest, license or other rights in the application for Contest or any right in Contest Intellectual Property therein, whether by license, implication, estoppel or otherwise.</p>
			<p className='flex'> <span className='px-2'>(q)</span>Subject to these Rules & Regulations, ZEEL hereby grants you a limited, non-exclusive, non-sub licensable and non-transferable license, limited to the territory of India, to use the Contest and the content solely for purposes of using the Contest and services provided therein. The Participant acknowledges and agrees that he/she shall not copy, republish, post, display, translate, transmit, reproduce or distribute any content through any medium without obtaining the necessary authorization from ZEEL or thirty party owners of such content.</p>
			<p className='flex'> <span className='px-2'>(r)</span>ZEEL in its sole discretion may suspend or terminate and/or block the Participant(s) from accessing all or any part the Application and/or any service provided therein if he/she breaches or is suspected to be in breach of the Rules & Regulations or any applicable law or if he/she is found to be misusing the Application or are engaged in illegal or fraudulent use of Application in any manner. Suspension or termination of the Participant’s account may result in loss or destruction of any information/data associated with such account.</p>
			<p className='flex'> <span className='px-2'>(s)</span>All these Rules and Regulations are specific to the Contest and do not supersede or substitute the Terms of Use and Privacy Policy of using the Application.</p>
			<p className='flex'> <span className='px-2'>(t)</span>Participant’s correspondence, transactions and usage of the services of ZEEL shall be subject to the Terms & Conditions, Rules & Regulations, policies and other service terms adopted/implemented by ZEEL, and the Participant(s) shall be solely responsible for reviewing the same prior to transacting or availing of the services of ZEEL. Participant agrees that ZEEL will not be responsible or liable for any loss or damage of any sort incurred because of any issues related to transactions. </p>
			<p className='flex'> <span className='px-2'>(u)</span><span>In case of any queries, please write to <span><a target="_blank" className='text-blue-600 font-medium cursor-pointer' href='mailto:contact@hipi.co.in' rel="noreferrer">contact@hipi.co.in</a></span> setting out your concerns/issues related to the Contest. All endeavours shall be made to reply to the queries within reasonable time on a best effort basis. However, the absence of a reply shall not be deemed to mean acceptance by ZEEL of any claims made in the query.</span></p>
			
			



	    </div>   
	</div>
	<StaticFooter/>
    </div>
	</>
  );
}

export default RewardsRules;

