/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import { withBasePath } from '../../config';
import { Back } from '../commons/svgicons/back_white';
import StaticFooter from '../static-footer';

function Terms() {
	const router = useRouter();
  return (
    <div className="static_body relative">
      <div className="tray-container">
		<div className="tnc-text">
		<div onClick={()=>router.back()}  className="p-4 flex items-center justify-center absolute left-0 top-3">
          <Back/>
        </div>
		<div className='mt-16'>
	        <h1>Terms of Use</h1>
			</div>
	        <p>Welcome to HiPi. We provide you with access to a free to use, interactive platform HiPi available
	        on Zee5 mobile app. You can access the platform (“HiPi”) through your app store or the website
	        www.zee5.com/HiPi (“Site”) and the Application (as hereinafter defined), through which you can
	        create, share and view content and connect with other users(“Service”). These terms of use along
	        with the Community Guidelines available at www.zee5.com/HiPi (together referred to as “HiPi
	        Terms of Use”), the Site’s terms of use accessible at www.zee5.com/HiPi (“Site Terms of Use”) and
	        the Privacy Policy accessible at www.zee5.com/HiPi (“Privacy Policy”) govern your use of the
	        Service.
	        </p>
	        <p>In case of any conflict between the Site Terms of Use and the HiPi Terms of Use in connection with
	        your use of the Service, these HiPi Terms of Use shall prevail.
	        This document is an electronic record in terms of Information Technology Act, 2000 and rules
	        thereunder pertaining to electronic records in various statutes as amended by the Information
	        Technology Act, 2000 and rules made thereunder.</p>

	        <p>PLEASE READ THE TERMS CAREFULLY BEFORE USE OF THE SERVICE. THESE TERMS CONSTITUTE
	        A LEGAL AND BINDING AGREEMENT BETWEEN YOU (THE USER OF THE SERVICE) AND ZEEL (THE
	        OWNER OF THE SITE AND HIPI), AND GOVERN YOUR USE OF THE SERVICE. BY BROWSING OR
	        CONTINUALLY USING HIPI, YOU EXPRESSLY ACCEPT THESE HIPI TERMS OF USE, The SITES TERMS
	        OF USE, AND THE PRIVACY POLICY, ANY AMENDMENTS THERETO, AND ANY OTHER TERMS OR
	        POLICIES WHICH GOVERN THIS SITE. IF YOU DO NOT ACCEPT TO THE TERMS, YOU ARE NOT
	        ENTITLED TO AVAIL OF/USE THE SERVICE, AND ANY USE BY YOU OF THE SERVICE SHALL BE
	        UNAUTHORIZED.</p>
	        <p>For the purpose of these HiPi Terms of Use, the terms "You" "Your" or "User" shall mean any person,
	        natural or legal who uses or browses HiPi. The term "We", "Us", "Our" shall mean ZEEL.</p>
	        <h3>DEFINITIONS</h3>

	        <p>Certain words and expressions in the HiPi Terms of Use have a specific meaning, and are
	        reproduced below for ease of reference:
	        1. 'Application' means the ZEE5 application owned by ZEEL to provide the Content on Devices,
	        which is available on various platforms such as iOS, android and supported web browsers
	        etc.
	        2. 'Content' means all text, graphics, images, music, software, audio, video, information,
	        advertisements (including third- party advertisements) or any other materials available on
	        ZEE5.
	        3. 'Devices' means any and all internet enabled devices like smart phones, tablets, laptops,
	        desktops, etc. which are compatible with and have access to the Internet.
	        4. 'ZEE5' means the Site, ZEE5 mobile web, and any other future variations or domain,
	        Application and any present and future means and modes to offer the Service.

	        5. 'Internet' shall mean the system making use of the TCP/IP software protocols known as the
	        internet or the worldwide web whatever the communications links may be which connects
	        the user (including by way of fixed, mobile, DSL, ISDN, UMTS WiMax or other broadband
	        links) including any developments in such protocols or any other protocols which may be
	        developed which give equivalent, reduced or enhanced functionality compared with such
	        protocols.
	        6. “Community Guidelines” means HiPi’s community guidelines available at:
	        www.zee5.com/HiPi
	        </p>
	        <h3>REGISTRATION</h3>
	        <p>This Service can only be availed of by registered users who have registered on HiPi. You will not be
	        permitted to post any Posts (as hereinafter defined) without registering on HiPi first. To register
	        yourself on HiPi, You may be required to provide certain personal information to ZEEL, such as your
	        name, age, gender, email address, mobile number. You may only register on HiPi if you are above
	        18 years of age.</p>
	        <p>On successful registration on HiPi, ZEEL will intimate You of the same, and You will be entitled to
	        avail of the Service.</p>
	        <h3>ELIGIBILITY</h3>
	        <p>Unless otherwise specified, HiPi is available for individuals who have attained the age of majority
	        or older. If You are under the relevant age of majority in Your jurisdiction, You may only access or
	        use the Service in accordance with applicable law which enables a minor in your jurisdiction to
	        access such a service. In India, by accessing, browsing, uploading or downloading Content and/or
	        downloading and/or installing and/or using the Services, YOU represent and warrant that YOU are
	        18 years of age or older and in case YOU are less than 18 years of age. YOU may not access the
	        Services, except with the consent and under the supervision of YOUR parent or legal guardian.
	        Therefore, it shall be presumed that any access by a minor is with the consent of and under the
	        supervision of the parent and/or legal guardian. SOME CONTENT OFFERED ON THE SITE AND ON
	        HIPI MAY NOT BE SUITABLE FOR SOME USERS AND THEREFORE VIEWER DISCRETION IS ADVISED.
	        FURTHER, SOME CONTENT OFFERED ON THE SITE AND/OR HIPI MAY NOT BE APPROPRIATE FOR
	        VIEWERSHIP BY CHILDREN. PARENTS AND/OR LEGAL GUARDIANS ARE RESPONSIBLE FOR
	        ALLOWING THEIR CHILDREN AND/OR WARDS TO ACCESS CONTENT ON THE SERVICE, INCLUDING
	        CONTENT ON HIPI. As a parent or guardian, you acknowledge that but allowing any minor in your
	        care to access any Devices through which the Services may be accessible, you assume full
	        responsibility for the Content viewed by such minor and ZEEL shall have no responsibility towards
	        such access, viewing, AND/OR DOWNOADING OF CONTENT.
	        As a parent and/or legal guardian, you agree and acknowledge that if you allow access to any minor
	        in your care to view such Content, you will always be responsible for the access and viewing, as
	        agreed under these Terms of Use.
	        Your access to and use of the Services is also subject to all applicable laws, rules, and regulations</p>
	        <h3>USER GENERATED CONTENT ON HIPI</h3>

	        <p>The HiPi platform will be made available on the Site by ZEEL to enable You to share your comments,
	        pictures and/or videos (“Posts”) with other Users on the Site for an interactive experience. You may
	        add music, filters, and other template elements to such Posts as may be made available by ZEEL
	        on HiPi from time- to- time (“Templates”). ZEEL hereby grants you a revocable, non-exclusive,
	        royalty free and worldwide license to use the Templates solely for the purpose of creating and
	        publishing your Posts on HiPi.</p>
	        <p>Whether or not your Posts are made in combination with ZEEL’s preinstalled Templates, your Posts
	        are considered as newly created audio-visual electronic records for which you are the publisher
	        and author.</p>
	        <p>By sharing Posts on HiPi, you understand, acknowledge and agree that such Posts may be viewed
	        by the other users on HiPi, and the same can be limited at your own discretion by You changing the
	        privacy settings of your user profile to limit the audience of your Posts to certain groups only. The
	        Posts would also continue to remain on the HiPi platform until removed by You or removed in
	        accordance with the conditions mentioned elsewhere in these HiPi Terms of Use.</p>
	        <h3>OWNERSHIP OF POSTS AND ACCOUNT</h3>
	        <p>You retain all ownership right, title and interest in your account and in the Posts (excluding any
	        Templates used) which you publish on HiPi, including any images contained therein. However, by
	        submitting the Posts, you hereby grant ZEEL a worldwide, perpetual, royalty free, non-exclusive,
	        sub-licensable right to reproduce, distribute, issue copies, make available, publicly communicate
	        and display copies of the Posts shared by You.</p>
	        <p>You represent and warrant that you have taken all requisite consents, permissions or licenses
	        required for uploading your Post on HiPi, including, but not limited to, consents from individuals
	        featured in your Posts, and/or any consents or licenses required for music and/or artwork
	        contained in your Post, prior to uploading such Posts on HiPi. ZEEL does not assume any
	        responsibility or liability for any Posts including any content therein.</p>
	        <p>ZEEL reserves the right to disallow or delete any Posts which it determines, in its sole discretion, is
	        in violation of these HiPi Terms of Use, and/or its Community Guidelines.</p>
	        <h3>YOUR RESPONSIBILITY</h3>
	        <p>In addition to the responsibilities set out in the Site Terms of Use and the Community Guidelines,
	        You Undertake that, without prejudice to Your obligation to otherwise comply with applicable laws,
	        rules and regulations, You shall not share any information/material or Post that:
	        • belongs to another person and to which the Participant does not have any right to;
	        • is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic,
	        libellous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging,
	        relating or encouraging money laundering or gambling, or otherwise unlawful in any manner
	        whatsoever;
	        • harms minors in any way;
	        • infringes any patent, trademark, design, copyright or other proprietary rights;
	        • violates any law for the time being in force;

	        • deceives or misleads the addressee about the origin of such messages or communicates any
	        information which is grossly offensive or menacing in nature;
	        • impersonates another person including celebrities or any influencer;
	        • contains software viruses or any other computer code, files or programs designed to interrupt,
	        destroy or limit the functionality of any computer resource;
	        • threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with
	        foreign states, or public order or causes incitement to the commission of any cognizable
	        offence or prevents investigation of any offence or is insulting any other nation.
	        You further undertake that:
	        • You shall not buy, sell, or transfer any part of Your account, or profile on HiPi, including your
	        username, login credentials, password, badges or Posts.
	        • You shall not report any Posts or user accounts unless they are genuinely in violation of
	        any law, the Community Guidelines, or any provision of these HiPi Terms of Use.</p>
	        <h3>REPORTING OF POSTS</h3>
	        <p>In case You believe that any Post on HiPi violates any law, our Community Guidelines, or any
	        provision of these HiPi Terms of Use, you may report such Posts by clicking on the ‘report’ button
	        on the Post. You may be required to provide reasons for reporting such Posts.
	        Upon such Post being reported, ZEEL shall take up to 48 hours to review such Post, and determine
	        whether such Post is required to be taken down from HiPi. You acknowledge and agree that ZEEL’s
	        decision in all such matters will be final binding, and ZEEL shall not be liable for any claims in this
	        regard.</p>
	        <h3>REPORTING OF ACCOUNTS</h3>
	        <p>In case You believe that any User account on HiPi violates any law, our Community Guidelines, or
	        any provision of these HiPi Terms of Use, you may report such account by clicking on the ‘report’
	        button on the User’s profile. You may be required to provide reasons for reporting such Accounts.
	        Upon such account being reported, the details of a user’s profile are sent to ZEEL, and ZEEL shall
	        take up to 48 hours to review such User’s profile to determine whether such profile, or certain
	        specific posts from the profile, are required to be taken down from HiPi. You acknowledge and
	        agree that ZEEL’s decision in all such matters will be final binding, and ZEEL shall not be liable for
	        any claims in this regard.</p>
	        <h3>TERMINATION OF SERVICE</h3>
	        <p>ZEEL reserves the right to suspend, limit and/or terminate your use of Your account on the HiPi
	        platform, or the Service, upon providing you with notice, if, in ZEEL’s opinion, that you have
	        breached its Community Guidelines and/or the HiPi Terms of Use and/or any other policy or
	        guideline which may be issued by ZEEL from time to time.</p>
	        <h3>FEEDBACK</h3>
	        <p>ZEEL welcomes and encourages YOU to provide feedback, comments and suggestions for
	        improvements to HiPi ("Feedback"). YOU may submit Feedback at the Help Center. YOU
	        acknowledge and agree that all Feedback will be the sole and exclusive property of ZEEL and YOU
	        hereby irrevocably assign to ZEEL all of YOUR right, title, and interest in and to all Feedback,
	        including without limitation all worldwide patent rights, copyright rights, trade secret rights, and
	        other proprietary or intellectual property rights therein. At ZEEL's request and expense, YOU will
	        execute documents and take such further acts as ZEEL may reasonably request to assist ZEEL to
	        acquire, perfect, and maintain its intellectual property rights and other legal protections for the
	        Feedback. You further acknowledge and agree that ZEEL shall not be under an obligation to take
	        any action pursuant to the Feedback provided by You. ZEEL may, at its sole discretion, decide
	        whether any action is required to be taken based on the Feedback received from You. You hereby
	        expressly agree to indemnify and keep ZEEL harmless against any liabilities that may suffered or
	        incurred by ZEEL as a consequence of any action taken by ZEEL pursuant to Your Feedback.</p>
	        <h3>Warranty/Disclaimer</h3>
	        <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW OF INDIA, ZEE5, THE SITE, AND HIPI
	        IS PROVIDED ON AN "AS IS" BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
	        WITHOUT LIMITING THE FOREGOING PROVISIONS, YOU ASSUME SOLE RISK AND RESPONSIBILITY
	        FOR SELECTING ZEE5 TO ACHIEVE YOUR INTENDED RESULTS, AND SOLE RESPONSIBILITY FOR
	        THE INSTALLATION OF, USE OF, AND RESULTS OBTAINED FROM ZEE5. WITHOUT LIMITING THE
	        FOREGOING PROVISIONS, ZEEL MAKES NO WARRANTY THAT ZEE5 OR HIPI WILL BE ERROR-FREE,
	        VIRUS FREE, OR FREE FROM INTERRUPTIONS OR OTHER FAILURES OR THAT ZEE5 OR HIPI WILL
	        SATISFY YOUR SPECIFIC REQUIREMENTS OR THAT THE ERRORS WILL BE RECTIFIED. YOU
	        UNDERSTAND THAT ZEE5 AN BE BLOCKED OR MADE INOPERABLE AND ZEEL ASSUMES NO
	        RESPONSIBILITY OR LIABILITY FOR THE SAME. ZEE5 IS NOT FAULT-TOLERANT AND IS NOT
	        DESIGNED OR INTENDED FOR USE IN HAZARDOUS ENVIRONMENTS REQUIRING FAIL-SAFE
	        PERFORMANCE, INCLUDING WITHOUT LIMITATION, IN THE OPERATION OF NUCLEAR FACILITIES,
	        AIRCRAFT NAVIGATION OR COMMUNICATION SYSTEMS, AIR TRAFFIC CONTROL, WEAPONS
	        SYSTEMS, DIRECT LIFE-SUPPORT MACHINES, OR ANY OTHER APPLICATION IN WHICH THE FAILURE
	        OF ZEE5 NETWORK COULD LEAD DIRECTLY TO DEATH, PERSONAL INJURY, OR SEVERE PHYSICAL
	        OR PROPERTY DAMAGE (COLLECTIVELY, "HIGH RISK ACTIVITIES"). ZEEL EXPRESSLY DISCLAIMS
	        ANY EXPRESS OR IMPLIED WARRANTY OF FITNESS FOR HIGH RISK ACTIVITIES.</p>
	        <h3>INDEMNIFICATION</h3>
	        <p>YOU AGREE TO INDEMNIFY, DEFEND, AND HOLD HARMLESS ZEEL, ITS SUBSIDIARIES, AFFILIATES,
	        OFFICERS, DIRECTORS, EMPLOYEES, CONSULTANTS AND AGENTS (“INDEMNIFIED PARTIES”)
	        FROM AND AGAINST ANY AND ALL CLAIMS, LIABILITIES, DAMAGES, LOSSES, COSTS, EXPENSES,
	        FEES (INCLUDING REASONABLE ATTORNEYS' FEES AND COSTS) THAT SUCH INDEMNIFIED
	        PARTIES MAY INCUR AS A RESULT OF OR ARISING FROM (A) ANY INFORMATION (INCLUDING,
	        WITHOUT LIMITATION, YOUR USER GENERATED CONTENT, FEEDBACK, OR ANY OTHER CONTENT)
	        YOU (OR ANYONE USING YOUR ACCOUNT) SUBMIT, POST, OR TRANSMIT ON OR ); (B) YOUR (OR
	        ANYONE USING YOUR ACCOUNT'S) USE OF HIPI; (C) YOUR (OR ANYONE USING YOUR ACCOUNT'S)
	        VIOLATION OF THESE TERMS; OR (D) YOUR (OR ANYONE USING YOUR ACCOUNT'S) VIOLATION OF
	        ANY RIGHTS OF ANY OTHER PERSON OR ENTITY, INCLUDING, WITHOUT LIMITATION, ANY
	        COPYRIGHT, PATENT, TRADEMARK, TRADE SECRET OR OTHER PROPRIETARY RIGHTS OF ANY
	        PERSON OR ENTITY. ZEEL RESERVES THE RIGHT, AT ITS OWN EXPENSE, TO ASSUME THE
	        EXCLUSIVE DEFENSE AND CONTROL OF ANY MATTER OTHERWISE SUBJECT TO INDEMNIFICATION
	        BY YOU, IN WHICH EVENT YOU WILL COOPERATE WITH ZEEL IN ASSERTING ANY AVAILABLE
	        DEFENSES.</p>
	        <h3>LIMITATION OF LIABILITY</h3>
	        <p>UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY, WHETHER IN TORT, CONTRACT, OR
	        OTHERWISE, SHALL ZEEL BE LIABLE TO YOU OR TO ANY OTHER PERSON OR ENTITY FOR ANY

	        INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, REMOTE OR CONSEQUENTIAL DAMAGES OR ANY
	        OTHER DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF
	        PROFITS, LOSS OF GOODWILL, LOSS OF CONFIDENTIAL OR OTHER INFORMATION, BUSINESS
	        INTERRUPTION, WORK STOPPAGE, COMPUTER FAILURE OR MALFUNCTION, PERSONAL INJURY,
	        LOSS OF PRIVACY, FAILURE TO MEET ANY DUTY INCLUDING A DUTY OF GOOD FAITH OR OF
	        REASONABLE CARE, NEGLIGENCE (WHETHER ACTIVE OR PASSIVE), AND ANY OTHER PECUNIARY
	        OR OTHER LOSS WHATSOEVER) ARISING OUT OF OR IN ANY WAY RELATED TO THE USE OR
	        INABILITY TO USE HIPI , LOSS OF DATA OR OTHERWISE UNDER OR IN CONNECTION WITH ANY
	        PROVISION OF THESE TERMS, EVEN IN THE EVENT OF FAULT, TORT (INCLUDING NEGLIGENCE,
	        AND GROSS NEGLIGENCE), STRICT LIABILITY, BREACH OF CONTRACT, OR BREACH OF WARRANTY
	        BY ZEEL, AND EVEN IF ZEEL HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THIS
	        LIMITATION OF LIABILITY SHALL NOT APPLY TO LIABILITY FOR DEATH OR PERSONAL INJURY TO
	        THE EXTENT THAT APPLICABLE LAW PROHIBITS SUCH LIMITATION. THE FOREGOING PROVISIONS
	        SHALL BE ENFORCEABLE TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.</p>
	        <h3>PRIVACY POLICY</h3>
	        <p>All information or data provided by You or collected by us shall be governed in accordance with the
	        Privacy Policy located at www.zee5.com/privacypolicy</p>
	        <h3>RELATIONSHIP</h3>
	        <p>The relationship between ZEEL and You is on a principal-to-principal basis. You are in no way ZEEL’s
	        legal representative, partner or agent for any reason whatsoever.</p>
	        <h3>EXPORT LAWS</h3>
	        <p>YOU agree to comply fully with all Indian export laws and regulations to ensure that HiPi are not
	        exported or re-exported directly or indirectly in violation of, or used for any purposes prohibited by,
	        such laws and regulations.</p>
	        <h3>CONFIDENTIALITY</h3>
	        <p>YOU agree that HiPi, including, but not limited to, the object code components, provided to YOU is
	        "Confidential Information" of ZEEL. YOU shall retain all Confidential Information in strict confidence
	        at least with the same amount of diligence that YOU exercise in preserving the secrecy of YOUR
	        most-valuable information, but in no event less than reasonable diligence.</p>
	        <h3>ASSIGNMENT</h3>
	        <p>These TERMS are personal to YOU and YOU shall not assign, transfer, sub-contract or otherwise
	        part with these TERMS or any right or obligation under it without ZEEL's prior written consent. Any
	        attempt by YOU to assign or transfer these TERMS, without such written consent, will be null and
	        of no effect. ZEEL may assign or transfer these TERMS to any third party, at its sole discretion,
	        without restriction. Subject to the foregoing, these TERMS will bind and inure to the benefit of the
	        parties, their successors, personal representatives and permitted assigns.</p>
	        <h3>SEVERABILITY</h3>
	        <p>If any provision of these TERMS is held to be unenforceable, the enforceability of the remaining
	        provisions shall in no way be affected or impaired thereby.</p>
	        <h3>WAIVER</h3>
	        <p>The failure of ZEEL to enforce or to exercise at any time or for any period any term of or any right
	        pursuant to these Terms of Use shall not be construed as a waiver of any such right and shall in
	        no way affect ZEEL’s right later to enforce or exercise it.</p>

	        <h3>ELECTRONIC COMMUNICATION</h3>
	        <p>When You use or send any data, information or communication to ZEEL, You agree and understand
	        that You are communicating with ZEEL through electronic records and You consent to receive
	        communications via electronic records from ZEEL periodically and as and when required. ZEEL will
	        communicate with You by email or any push or other message or electronic records on the email
	        address and or mobile number available with ZEEL which will be deemed adequate service of
	        notice / electronic record.</p>
	        <h3>NOTICE</h3>
	        <p>Any notices or other communications required will be in writing and emailed to ZEEL
	        at support.in@zee5.com. For notices made by e-mail, the date of receipt will be deemed the date
	        on which such notice is transmitted.
	        In the event you have any complaints with respect to any Content on HiPi, please write to us
	        at support.in@zee5.com. with details of the objectionable content and Your details including Your
	        name and mobile number and such other details as may be requested by Us. Based on the
	        complaint raised, we will take reasonable measures to resolve the issue. You hereby expressly
	        agree that ZEEL shall under no circumstance shall be liable to You for any damages whatsoever.
	        Further, You hereby expressly agree that ZEEL makes no representations under these Terms of
	        Use that any complaint raised by You will be resolved to Your satisfaction. All steps to be taken by
	        ZEEL in this regard shall be at the sole discretion of ZEEL.
	        If You have any claims with respect to the ownership of Content transmitted through HiPi, please
	        follow the “Ownership Claims and Dispute Resolution Mechanism”
	        at www.zee5.com/privacypolicy.</p>
	        <h3>LAW & DISPUTES</h3>
	        <p>These TERMS and all matters arising from it are governed by and construed in accordance with
	        the laws of India and courts of Mumbai, India shall have exclusive jurisdiction over all disputes
	        arising in connection with these TERMS.</p>
	        <h3>ENTIRE AGREEMENT AND AMENDMENT</h3>
	        <p>These TERMS expressly supersedes and completely replaces any and all prior ‘Terms of Use’. ZEEL
	        shall not be bound by or liable to YOU for any pre-existing or contemporaneous written or oral
	        representations or warranties, made by anyone, with respect to HiPi including any authorized
	        agents, employees, or representatives.</p>
	        <p>ZEEL reserves the right, at its sole discretion, to modify the TERMS from time to time (“Updated
	        Terms of Use”). The Updated Terms of Use shall be effective immediately and shall supersede
	        these Terms of Use. ZEEL shall not be under an obligation to notify you of any changes to the Terms
	        of Use. YOU shall be solely responsible for reviewing the Terms of Use from time to time for any
	        modifications. By continuing to use HiPi after the Updated Terms of Use have been published, YOU
	        affirm YOUR agreement to the Updated Terms of Use.</p>
	        <h3>CONTACT</h3>
	        <p>You have any questions about these Terms of Use, please contact ZEEL at support.in@zee5.com.</p>
	    </div>   
	</div>
    </div>
  );
}

export default Terms;

