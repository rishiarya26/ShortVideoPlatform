/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import StaticFooter from '../static-footer';
import Header from '../desk-header';
function Terms() {
	const router = useRouter();
  return (
    <div className="static_body relative">
	
  <div className='hidden md:flex'><Header/></div>

      <div className="tray-container">
		<div className="tnc-text">
		{/* <div onClick={()=>router.back()}  className="p-4 flex items-center justify-center absolute left-0 top-3">
          <Back/>
        </div> */}
		<div className='mt-12  md:mt-24'>
	        <h1>Terms of Use</h1>
			</div>
	        <p>Welcome to Hipi. We provide you with access to a free to use, interactive platform Hipi (“Hipi”) which can be downloaded through your app store.   You can use Hipi  to create, share and view content and connect with other users (“Service”). These terms of use along with the Community Guidelines (together referred to as “Hipi Terms of Use”), and the Privacy Policy accessible <span className='cursor-pointer font-medium text-gray-800' onClick={()=>router?.push('/privacy-policy.html')}>here</span> govern your use of the Service. 
	        </p>
	        <p>This document is an electronic record in terms of Information Technology Act, 2000 and rules thereunder pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000 and rules made thereunder. </p>

	        <p>PLEASE READ THE TERMS CAREFULLY BEFORE USE OF THE SERVICE. THESE TERMS CONSTITUTE A LEGAL AND BINDING AGREEMENT BETWEEN YOU (THE USER OF THE SERVICE) AND ZEE ENTERTAINMENT ENTERPRISES LIMITED (“ZEEL”) (THE OWNER OF HIPI), AND GOVERN YOUR USE OF THE SERVICE. BY BROWSING OR CONTINUALLY USING HIPI, YOU EXPRESSLY ACCEPT THESE HIPI TERMS OF USE, AND THE PRIVACY POLICY, ANY AMENDMENTS THERETO, AND ANY OTHER TERMS OR POLICIES WHICH GOVERN THE SERVICE FROM TIME TO TIME. IF YOU DO USE BY NOT ACCEPT TO THESE TERMS, YOU ARE NOT ENTITLED TO AVAIL OF/USE THE SERVICE, AND ANY YOU OF THE SERVICE SHALL BE UNAUTHORIZED.</p>
	        <p>For the purpose of these Hipi Terms of Use, the terms "You" "Your" or "User" shall mean any person, natural or legal who uses or browses Hipi. The term "We", "Us", "Our" shall mean ZEEL..</p>
	        <h3 className='text-gray-800 font-medium'>DEFINITIONS</h3>

	        <p className='flex flex-col'>Certain words and expressions in the Hipi Terms of Use have a specific meaning, and are reproduced below for ease of reference:
	        <span className='flex'><span className='pr-1'>1.</span> 'Content' includes all Templates, text, graphics, images, music, software, audio, video, information,  or any other materials available on Hipi  and/or the Service as well as the look and feel of Hipi.</span> 
	        <span className='flex'><span className='pr-1'>2.</span> 'Devices' means any and all internet enabled devices like smart phones, tablets, laptops, desktops, etc. which are compatible with and have access to the Internet.</span> 
			<span className='flex'><span className='pr-1'>3.</span> 'Internet' shall mean the system making use of the TCP/IP software protocols known as the internet or the worldwide web whatever the communications links may be which connects the user (including by way of fixed, mobile, DSL, ISDN, UMTS WiMax or other broadband links) including any developments in such protocols or any other protocols which may be developed which give equivalent, reduced or enhanced functionality compared with such protocols. </span> 
			<span className='flex'><span className='pr-1'>4.</span> “Community Guidelines” means Hipi’s community guidelines available <span className='cursor-pointer font-medium text-gray-800' onClick={()=>router?.push('/community-guidelines.html')}>here.</span></span> 

	        </p>
	        <h3 className='text-gray-800 font-medium'>REGISTRATION</h3>
	        <p>This Service can only be availed of by users who have registered on Hipi. You will not be permitted to post any Posts (as hereinafter defined) without registering on Hipi first. To register yourself on Hipi, You may be required to provide certain personal information to ZEEL, such as your name, age, gender, email address, mobile number. You may only register on Hipi if you are above 18 years of age. </p>
	        <p>On successful registration on Hipi, ZEEL will intimate You of the same, and You will be entitled to avail of the Service. </p>
	        <h3 className='text-gray-800 font-medium'>ACCESSING THE SERVICE THROUGH VPN</h3>
	        <p>You may not access or use the Service by means or any technology which conceals Your actual location or provides incorrect details of Your location, for example, through use of a virtual private network (VPN).</p>
	        <h3 className='text-gray-800 font-medium'>USE OF HIPI</h3>
			<p>You may use Hipi and the Content therein and avail the Services so long as such use is in compliance with applicable law. You may not use Hipi for any purpose not intended under these Hipi Terms of Use. You will not use Hipi in any way that harms ZEEL or directors, employees, affiliates, distributors, partners, service providers and/or any other user/ visitor of Hipi. </p>
			<p>You may not use the Site in any manner that could damage, disable, overburden, block, or impair Hipi, whether in part or in full and whether permanently or temporarily, or disallow or interfere with any other party's use and enjoyment of Hipi and the Services. </p>
			
			<h3 className='text-gray-800 font-medium'>ELIGIBILITY</h3>
			<p>Unless otherwise specified, Hipi is available for individuals who have attained the age of majority in their jurisdiction. In the case of India, this Service is restricted to users who are aged 18 years or older unless you use the Service with the consent of your parent or legal guardian.If You are under the relevant age of majority in Your jurisdiction, You may only access or use the Service in accordance with applicable law which enables a minor in your jurisdiction to access such a service. In India, by accessing, browsing, uploading or downloading Content and/or Posts and/or downloading and/or installing and/or using the Services, YOU represent and warrant that YOU are 18 years of age or older and in case YOU are less than 18 years of age, YOU may not access the Services, except with the consent of, and under the supervision of YOUR parent or legal guardian. Therefore, it shall be presumed that any access by a minor is with the consent of and under the supervision of the parent and/or legal guardian. SOME CONTENT OFFERED OR POSTS ON HIPI MAY NOT BE SUITABLE FOR SOME USERS AND THEREFORE VIEWER DISCRETION IS ADVISED. FURTHER, SOME CONTENT OFFERED OR POSTS ON HIPI MAY NOT BE APPROPRIATE FOR VIEWERSHIP BY CHILDREN. PARENTS AND/OR LEGAL GUARDIANS ARE RESPONSIBLE FOR ALLOWING THEIR CHILDREN AND/OR WARDS TO ACCESS CONTENT  OR POSTS ON HIPI. As a parent or guardian, you acknowledge that but allowing any minor in your care to access any Devices through which the Services may be accessible, you assume full responsibility for the Content or Postsviewed by such minor and ZEEL shall have no responsibility towards such access, viewing, AND/OR DOWNOADING OF CONTENT AND/OR POSTS. </p>
			<p>As a parent and/or legal guardian, you agree and acknowledge that if you allow access to any minor in your care to view such Content or Posts, you will always be responsible for the access and viewing, as agreed under these Hipi Terms of Use. </p>
			<p>Your access to and use of the Services is also subject to all applicable laws, rules, and regulations framed thereunder.</p>
			
			<h3 className='text-gray-800 font-medium'>USER GENERATED CONTENT ON HIPI</h3>

	        <p>The Hipi platform will be made available on Your app store by ZEEL to enable You to share your own (user generated) comments, text, pictures and/or videos(“Posts”) with other Users on the Site for an interactive experience. You may add music, filters, graphics, and other template elements to such Posts as may be made available by ZEEL on Hipi from time- to- time (“Templates”). ZEEL hereby grants you a revocable, non-exclusive, royalty free and worldwide license to use the Templates solely for the purpose of creating and publishing your Posts on Hipi. </p>
	        <p>Whether or not your Posts are made in combination with ZEEL’s preinstalled Templates, your Posts are considered as newly created audio-visual electronic records for which you are the publisher and author.</p>
	        <p>By sharing Posts on Hipi, you understand, acknowledge and agree that such Posts may be viewed by the other users on Hipi, and the same can be limited at your own discretion by You changing the privacy settings of your user profile to limit the audience of your Posts to certain groups only. The Posts would also continue to remain on the Hipi platform until removed by You or removed in accordance with the conditions mentioned elsewhere in these Hipi Terms of Use.</p>
			<p>ZEEL’s role is that of an ‘intermediary’ as defined under the Information Technology Act, 2000 and the rules thereunder, with regard to the Posts. Being an intermediary, ZEEL has no responsibility and / or liability in respect of any Posts on Hipi, including for intellectual property rights infringement, defamation, obscenity or any other violation under applicable law.</p>


			<h3 className='text-gray-800 font-medium'>POSTS RELATING TO NEWS CONTENT</h3>
			<p>In the event You qualify to be a publisher of news and current affairs content as defined under the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 (“IT Rules”), You are required to furnish details of Your user accounts on Hipi to the Ministry of Information and Broadcasting of the Government of India (“MIB”), along with such other information and documents required by the MIB, in accordance with the IT Rules. </p>
	        
			<h3 className='text-gray-800 font-medium'>HIPI INTELLECTUAL PROPERTY RIGHTS</h3>
			<p>No right, title, or interest in any Content is transferred to You whether as a result of accessing Hipi and availing the Services, or otherwise. ZEEL reserves all right, title and interest in all such Content. Except as authorized under these Hipi Terms of Use, You may not download, alter, copy, modify, distribute, transmit, or derive another work from any Content obtained from Hipi. </p>
			<p>ZEEL assert all proprietary rights in and to all names and trademarks in connection with Hipi and the Service (except in the Posts). Any use of ZEEL’s trademarks or copyright in connection with any service that does not belong to ZEEL, unless otherwise authorized in a written license agreement, will constitute an infringement of ZEEL’s intellectual property rights and may be actionable under applicable law.</p>

			<h3 className='text-gray-800 font-medium'>OWNERSHIP OF POSTS AND ACCOUNT</h3>
			<p>You retain all ownership right, title and interest in your account and in the Posts (excluding any  Templates used) which you publish on Hipi, including any images contained therein. However, by submitting the Posts on Hipi, you hereby grant ZEEL a worldwide, perpetual, royalty free, non-exclusive, sub-licensable right to reproduce, distribute, issue copies, make available, publicly communicate and display copies of the Posts shared by You. </p>
			<p>You represent and warrant that you have taken all requisite consents, permissions or licenses required for uploading your Post on Hipi, including, but not limited to, consents from individuals featured in your Posts, and/or any consents or licenses required for music and/or artwork contained in your Post, prior to uploading such Posts on Hipi. ZEEL does not assume any responsibility or liability for any Posts including any content therein. </p>
			<p>ZEEL reserves the right to disallow or delete any Posts which it determines, in its sole discretion, is in violation of these Hipi Terms of Use, and/or its Community Guidelines. ZEEL may also delete or takedown any Posts upon receipt of a valid order of a court or authorized Government agency in accordance with its obligations as an intermediary under the IT Rules. </p>

			<h3 className='text-gray-800 font-medium'>YOUR RESPONSIBILITY</h3>
			<p className='flex flex-col'>In addition to the responsibilities set out under the Community Guidelines, You Undertake that, without prejudice to Your obligation to otherwise comply with applicable laws, rules and regulations, You shall not share any information/material or Post that:
			<span className='flex'><span className='pr-1'>•</span> belongs to another person and to which You do not have any right to; </span>
			<span className='flex'><span className='pr-1'>•</span> is  defamatory, obscene, pornographic, paedophilic, invasive of another's privacy (including bodily privacy), insulting or harassing on the basis of gender, libellous, racially or ethnically objectionable, relating or encouraging money laundering or gambling, or otherwise inconsistent with or contrary to the laws in force; is harmful to child; </span>
			<span className='flex'><span className='pr-1'>•</span> infringes any patent, trademark, copyright or other proprietary rights; </span>
			<span className='flex'><span className='pr-1'>•</span> violates any law for the time being in force;</span>
			<span className='flex'><span className='pr-1'>•</span> deceives or misleads the addressee about the origin of the message or knowingly and intentionally communicates any information which is patently false or misleading in nature but may reasonably be perceived as a fact; impersonates another person (including celebrities or any influencer); </span>
			<span className='flex'><span className='pr-1'>•</span> threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign States, or public order, or causes incitement to the commission of any cognisable offence or prevents investigation of any offence or is insulting to any other nation;</span>
			<span className='flex'><span className='pr-1'>•</span> contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource; </span>
			<span className='flex'><span className='pr-1'>•</span> is patently force and untrue, and is written or published in any form, with the intent to mislead or harass a person, entity or agency, for financial gain or to cause any injury to any person;</span>
			</p>
			<p className='flex flex-col'>You further undertake that:
			<span className='flex'><span className='pr-1'>•</span> You shall not buy, sell, or transfer any part of Your account, or profile on Hipi, including your username, login credentials, password, badges or Posts. </span>
			<span className='flex'><span className='pr-1'>•</span> You shall not report any Posts or user accounts unless they are genuinely in violation of any law, the Community Guidelines, or any provision of these Hipi Terms of Use. </span>
			</p>

			<h3 className='text-gray-800 font-medium'>REPORTING OF POSTS </h3>
			<p>In case You believe that any Post on Hipi violates any law, our Community Guidelines, or any provision of these Hipi Terms of Use, you may report such Posts by clicking on the ‘report’ button on the Post. You may be required to provide reasons for reporting such Posts. Alternatively, You may also file a complaint or grievance with Our Grievance Officer, whose details are provided in these terms.</p>
			<p>Upon such Post being reported, ZEEL shall take up to 24  hours to acknowledge Your complaint  , and upto 15 (fifteen) days to determine whether such Post is required to be taken down from Hipi. You acknowledge and agree that ZEEL’s decision in all such matters will be final binding, and ZEEL shall not be liable for any claims in this regard.</p>

			<h3 className='text-gray-800 font-medium'>REPORTING OF ACCOUNTS </h3>
			<p>In case You believe that any User account on Hipi violates any law, our Community Guidelines, or any provision of these Hipi Terms of Use, you may report such account by clicking on the ‘report’ button on the User’s profile. You may be required to provide reasons for reporting such Accounts. Alternatively, You may also file a complaint or grievance with Our Grievance Officer, whose details are provided below.</p>
			<p>Upon such account being reported, the details of a user’s profile are sent to ZEEL, and ZEEL shall take up to 24 hours to acknowledge your complaint, and upto 15 (fifteen) to determine whether such profile, or certain specific posts from the profile, are required to be taken down from Hipi. You acknowledge and agree that ZEEL’s decision in all such matters will be final binding, and ZEEL shall not be liable for any claims in this regard.</p>

			<h3 className='text-gray-800 font-medium'>TERMINATION OF SERVICE</h3>	
			<p>ZEEL reserves the right to suspend, limit and/or terminate your use of Your account or remove Your Posts on the Hipi platform, or the Service, upon providing you with notice, if, in ZEEL’s sole discretion and opinion, that you have breached its Community Guidelines and/or the Hipi Terms of Use and/or any other policy or guideline which may be issued by ZEEL from time to time. Any suspected fraudulent, abusive or illegal activity may be grounds for terminating Your user account and may be referred to appropriate law enforcement authorities.</p>
			<p>You may also voluntarily deactivate, suspend or delete Your Account by following the instructions at the Hipi Help Centre. </p>

		<h3 className='text-gray-800 font-medium'>GRIEVANCE OFFICER</h3>
		<p>You may submit any complaints, concerns, or grievances arising out of any matter, including violations of these Hipi Terms of Use or the Community Guidelines, to the Hipi Grievance Officer. The contact details of the Grievance Officer are as follow:</p>
		<p>Ms. Shrutika Saraswat</p>
		<p>Contact Details: grievance@hipi.co.in</p>
		<p>The Grievance Officer shall acknowledge the complaint within 24 hours and dispose of Your complaint within a period of 15 (fifteen) days from its receipt. </p>
		<p>You would be required to furnish relevant details pertaining to your concern, complaint or grievance, specifically including your user details, and details / description of the alleged violation, what relief You are requesting, and/or any other information which may be required by ZEEL to assess your concern, complaint or grievance.</p>

		<h3 className='text-gray-800 font-medium'>THIRD PARTY CONTENT</h3>
		<p>You may be provided with content, information or links on Hipi which may direct you to third party content, websites or applications (“Third Party Content”). ZEEL’s role is limited to providing a communication platform along with hosting services to third parties, to enable transmission of Third Party Content to You.  ZEEL’s role is limited to an ‘intermediary’ as defined under the Information Technology Act, 2000 in relation to such Third Party Content.  ZEEL accepts no liability or responsibility in respect of Third Party Content. Your use of any Third Party content is subject to the terms of use of the respective third party website, and ZEEL is not responsible for Your use of any third party website. Please exercise your independent judgment while viewing any Third Party Content.</p>

		<h3 className='text-gray-800 font-medium'>ADVERTISEMENTS </h3>
		<p>ZEEL disclaims any liability arising out of the advertisements, usage or viewing of products or services advertised on Hipi.</p>
		<p>As Hipi is free, and earns part of its revenue through advertisements, You agree not to use any ad-blocking software or similar built-in web browster options designed to block online advertising while using the Service.</p>

		<h3 className='text-gray-800 font-medium'>FEEDBACK</h3>
		<p>ZEEL welcomes and encourages YOU to provide feedback, comments and suggestions for improvements to Hipi ("Feedback"). YOU may submit Feedback at the Help Center. YOU acknowledge and agree that all Feedback will be the sole and exclusive property of ZEEL and YOU hereby irrevocably assign to ZEEL all of YOUR right, title, and interest in and to all Feedback, including without limitation all worldwide patent rights, copyright rights, trade secret rights, and other proprietary or intellectual property rights therein. At ZEEL's request and expense, YOU will execute documents and take such further acts as ZEEL may reasonably request to assist ZEEL to acquire, perfect, and maintain its intellectual property rights and other legal protections for the Feedback. You further acknowledge and agree that ZEEL shall not be under an obligation to take any action pursuant to the Feedback provided by You. ZEEL may, at its sole discretion, decide whether any action is required to be taken based on the Feedback received from You. You hereby expressly agree to indemnify and keep ZEEL harmless against any liabilities that may suffered or incurred by ZEEL as a consequence of any action taken by ZEEL pursuant to Your Feedback.</p>

		<h3 className='text-gray-800 font-medium'>WARRANTY/DISCLAIMER</h3>
		<p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW OF INDIA,  HIPI IS PROVIDED ON AN "AS IS" BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. WITHOUT LIMITING THE FOREGOING PROVISION S, YOU ASSUME SOLE RISK AND RESPONSIBILITY FOR SELECTING HIPI TO ACHIEVE YOUR INTENDED RESULTS, AND SOLE RESPONSIBILITY FOR THE INSTALLATION OF, USE OF, AND RESULTS OBTAINED FROM HIPI. WITHOUT LIMITING THE FOREGOING PROVISIONS, ZEEL MAKES NO WARRANTY THAT HIPI WILL BE ERROR-FREE, VIRUS FREE, OR FREE FROM INTERRUPTIONS OR OTHER FAILURES OR THAT HIPI WILL SATISFY YOUR SPECIFIC REQUIREMENTS OR THAT THE ERRORS WILL BE RECTIFIED. YOU UNDERSTAND THAT HIPI MAY BE BLOCKED OR MADE INOPERABLE AND ZEEL ASSUMES NO RESPONSIBILITY OR LIABILITY FOR THE SAME. HIPI IS NOT FAULT-TOLERANT AND IS NOT DESIGNED OR INTENDED FOR USE IN HAZARDOUS ENVIRONMENTS REQUIRING FAIL-SAFE PERFORMANCE, INCLUDING WITHOUT LIMITATION, IN THE OPERATION OF NUCLEAR FACILITIES, AIRCRAFT NAVIGATION OR COMMUNICATION SYSTEMS, AIR TRAFFIC CONTROL, WEAPONS SYSTEMS, DIRECT LIFE-SUPPORT MACHINES, OR ANY OTHER APPLICATION IN WHICH THE FAILURE OF HIPI NETWORK COULD LEAD DIRECTLY TO DEATH, PERSONAL INJURY, OR SEVERE PHYSICAL OR PROPERTY DAMAGE (COLLECTIVELY, "HIGH RISK ACTIVITIES"). ZEEL EXPRESSLY DISCLAIMS ANY EXPRESS OR IMPLIED WARRANTY OF FITNESS FOR HIGH RISK ACTIVITIES.</p>

		<h3 className='text-gray-800 font-medium'>INDEMNIFICATION</h3>
		<p>YOU AGREE TO INDEMNIFY, DEFEND, AND HOLD HARMLESS ZEEL, ITS SUBSIDIARIES, AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, CONSULTANTS AND AGENTS (“INDEMNIFIED PARTIES”) FROM AND AGAINST ANY AND ALL CLAIMS, LIABILITIES, DAMAGES, LOSSES, COSTS, EXPENSES, FEES (INCLUDING REASONABLE ATTORNEYS' FEES AND COSTS) THAT SUCH INDEMNIFIED PARTIES MAY INCUR AS A RESULT OF OR ARISING FROM (A) ANY INFORMATION (INCLUDING, WITHOUT LIMITATION, YOUR USER GENERATED CONTENT (INCLUDING POSTS), FEEDBACK, OR ANY OTHER CONTENT) YOU (OR ANYONE USING YOUR ACCOUNT) SUBMIT, POST, OR TRANSMIT ON OR ); (B) YOUR (OR ANYONE USING YOUR ACCOUNT'S) USE OF HIPI; (C) YOUR (OR ANYONE USING YOUR ACCOUNT'S) VIOLATION OF THESE HIPI TERMS OF USE; OR (D) YOUR (OR ANYONE USING YOUR ACCOUNT'S) VIOLATION OF ANY RIGHTS OF ANY OTHER PERSON OR ENTITY, INCLUDING, WITHOUT LIMITATION, ANY COPYRIGHT, PATENT, TRADEMARK, TRADE SECRET OR OTHER PROPRIETARY RIGHTS OF ANY PERSON OR ENTITY, OR VIOLATION OF APPLICABLE LAW. ZEEL RESERVES THE RIGHT, AT ITS OWN EXPENSE, TO ASSUME THE EXCLUSIVE DEFENSE AND CONTROL OF ANY MATTER OTHERWISE SUBJECT TO INDEMNIFICATION BY YOU, IN WHICH EVENT YOU WILL COOPERATE WITH ZEEL IN ASSERTING ANY AVAILABLE DEFENSES.</p>

		<h3 className='text-gray-800 font-medium'>LIMITATION OF LIABILITY</h3>
		<p>UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY, WHETHER IN TORT, CONTRACT, OR OTHERWISE, SHALL ZEEL BE LIABLE TO YOU OR TO ANY OTHER PERSON OR ENTITY FOR ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, REMOTE OR CONSEQUENTIAL DAMAGES OR ANY OTHER DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOSS OF GOODWILL, LOSS OF CONFIDENTIAL OR OTHER INFORMATION, BUSINESS INTERRUPTION, WORK STOPPAGE, COMPUTER FAILURE OR MALFUNCTION, PERSONAL INJURY, LOSS OF PRIVACY, FAILURE TO MEET ANY DUTY INCLUDING A DUTY OF GOOD FAITH OR OF REASONABLE CARE, NEGLIGENCE (WHETHER ACTIVE OR PASSIVE), AND ANY OTHER PECUNIARY OR OTHER LOSS WHATSOEVER) ARISING OUT OF OR IN ANY WAY RELATED TO THE USE OR INABILITY TO USE HIPI , LOSS OF DATA OR OTHERWISE UNDER OR IN CONNECTION WITH ANY PROVISION OF THESE TERMS, EVEN IN THE EVENT OF FAULT, TORT (INCLUDING NEGLIGENCE, AND GROSS NEGLIGENCE), STRICT LIABILITY, BREACH OF CONTRACT, OR BREACH OF WARRANTY BY ZEEL, AND EVEN IF ZEEL HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THIS LIMITATION OF LIABILITY SHALL NOT APPLY TO LIABILITY FOR DEATH OR PERSONAL INJURY TO THE EXTENT THAT APPLICABLE LAW PROHIBITS SUCH LIMITATION. THE FOREGOING PROVISIONS SHALL BE ENFORCEABLE TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.</p>

		<h3 className='text-gray-800 font-medium'>PRIVACY POLICY</h3>
		<p>All information or data provided by You or collected by us shall be governed in accordance with the Privacy Policy available <span className='cursor-pointer font-medium text-gray-800' onClick={()=>router?.push('/privacy-policy.html')}>here</span></p>

		<h3 className='text-gray-800 font-medium'>RELATIONSHIP</h3>
		<p>The relationship between ZEEL and You is on a principal-to-principal basis. You are in no way ZEEL’s legal representative, partner or agent for any reason whatsoever.</p>

		<h3 className='text-gray-800 font-medium'>EXPORT LAWS</h3>
		<p>YOU agree to comply fully with all Indian export laws and regulations to ensure that Hipi are not exported or re-exported directly or indirectly in violation of, or used for any purposes prohibited by, such laws and regulations</p>

		<h3 className='text-gray-800 font-medium'>CONFIDENTIALITY</h3>
		<p>YOU agree that Hipi, including, but not limited to, the object code components, provided to YOU is "Confidential Information" of ZEEL. YOU shall retain all Confidential Information in strict confidence at least with the same amount of diligence that YOU exercise in preserving the secrecy of YOUR most-valuable information, but in no event less than reasonable diligence.</p>

		<h3 className='text-gray-800 font-medium'>ASSIGNMENT</h3>
		<p>These Hipi Terms of Use are personal to YOU and YOU shall not assign, transfer, sub-contract or otherwise part with these Hipi Terms of Use or any right or obligation under it without ZEEL's prior written consent. Any attempt by YOU to assign or transfer these Hipi Terms of Use , without such written consent, will be null and of no effect. ZEEL may assign or transfer these Hipi Terms of Use to any third party, at its sole discretion, without restriction. Subject to the foregoing, these Hipi Terms of Use will bind and inure to the benefit of the parties, their successors, personal representatives and permitted assigns.</p>

		<h3 className='text-gray-800 font-medium'>SEVERABILITY</h3>
		<p>If any provision of these Hipi Terms of Use  is held to be unenforceable, the enforceability of the remaining provisions shall in no way be affected or impaired thereby.</p>

		<h3 className='text-gray-800 font-medium'>WAIVER</h3>
		<p>The failure of ZEEL to enforce or to exercise at any time or for any period any term of or any right pursuant to these Hipi Terms of Use shall not be construed as a waiver of any such right and shall in no way affect ZEEL’s right later to enforce or exercise it.</p>

		<h3 className='text-gray-800 font-medium'>ELECTRONIC COMMUNICATION</h3>
		<p>When You use or send any data, information or communication to ZEEL, You agree and understand that You are communicating with ZEEL through electronic records and You consent to receive communications via electronic records from ZEEL periodically and as and when required. ZEEL will communicate with You by email or any push or other message or electronic records on the email address and or mobile number available with ZEEL which will be deemed adequate service of notice / electronic record.</p>

		<h3 className='text-gray-800 font-medium'>NOTICE</h3>
		<p>You hereby expressly agree that ZEEL shall under no circumstance shall be liable to You for any damages whatsoever. Further, You hereby expressly agree that ZEEL makes no representations under these Hipi Terms of Use that any complaint raised by You will be resolved to Your satisfaction. All steps to be taken by ZEEL in this regard shall be at the sole discretion of ZEEL.</p>
		<p>If You have any claims with respect to the ownership of Content and/or Posts transmitted through Hipi, please follow the “Ownership Claims and Dispute Resolution Mechanism” available <span className='cursor-pointer font-medium text-gray-800' onClick={()=>router?.push('/privacy-policy.html')}>here</span>.</p>

		<h3 className='text-gray-800 font-medium'>LAW & DISPUTES</h3>
		<p>These Hipi Terms of Use and all matters arising from it are governed by and construed in accordance with the laws of India and courts of Mumbai, India shall have exclusive jurisdiction over all disputes arising in connection with these Hipi Terms of Use.</p>

		<h3 className='text-gray-800 font-medium'>ENTIRE AGREEMENT AND AMENDMENT</h3>
		<p>These Hipi Terms of Use expressly supersedes and completely replaces any and all prior ‘Terms of Use’. ZEEL shall not be bound by or liable to YOU for any pre-existing or contemporaneous written or oral representations or warranties, made by anyone, with respect to Hipi including any authorized agents, employees, or representatives.</p>
		<p>ZEEL reserves the right, at its sole discretion, to modify these Hipi Terms of Use from time to time (“Updated Terms of Use”). The Updated Terms of Use shall be effective immediately and shall supersede these Hipi Terms of Use. ZEEL shall not be under an obligation to notify you of any changes to the Hipi Terms of Use. YOU shall be solely responsible for reviewing the Hipi Terms of Use from time to time for any modifications. By continuing to use Hipi after the Updated Terms of Use have been published, YOU affirm YOUR agreement to the Updated Terms of Use.</p>



	    </div>   
	</div>
	<StaticFooter/>
    </div>
  );
}

export default Terms;

