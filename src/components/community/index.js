/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';
import StaticFooter from '../static-footer';

function Community() {
  return (
    <div className="h-screen  w-screen flex flex-col ">
      <div className="w-full h-28 bg-black p-4 flex items-center justify-center lg:justify-start lg:px-10 ">
        <img className="w-20" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
      </div>


      <div className="w-full bg-hipidblue flex justify-between flex-col text-white p-20">
        <div className="text-5xl font-bold">
        HiPi Community Guidelines
        </div>
        <div className="text-xl font-bold mt-4">
        A.    Adult Nudity and Sexual Content 
        </div>
        <p>
        As a platform, we aim to keep our Application free from any obscene, pornographic or sexually explicit content. This includes Content which may be either partially or fully animated. Since we are a platform that is family oriented, we encourage you to evaluate your Content for any such material, and use great discretion before uploading the Content. 
        </p>
        <p className="my-2 font-semibold text-lg">
          1. Nudity 
        </p>
        <p>Do not post Content that has any full or partial nudity, including, but not limited to depictions of genitalia, uncovered buttocks or partial or complete exposed breasts. </p>
        <p className="my-2 font-semibold text-lg">
          2. Pornography and Sexually Explicit Content  
        </p>
        <p>
        Do not post Content that explicitly depicts sexual organs / sexual activities for the purpose of sexual gratification. In particular, do not post material which includes, but is not limited to:
        </p>
       
        <ul className="list-disc mx-8 my-2">
          <li>
          Sexual activities including sexual intercourse, stimulation of genitalia, oral sex, sexual arousal, sexual fetish, non-penetrative sex and non-consensual sex.
          </li>
          <li>
          Depiction of violent sexual conduct including rape and other forms of sexual assault, sexualised violence, or sexual exploitation from a person in power. 
          </li>
          <li>
          Graphic illustrations of any kind of sexual activity, including cartoons, hentai, or anime.
          </li>
         <li>Attempted sexual solicitation by offering or asking for sex, sexual favours or sexual partners, sex chat or conversations or ‘sexting’, or nude photos/videos/imagery including the practice of ‘revenge porn’.</li>
         <li>Images portraying nudity hinting towards pornographic intent.</li>
         <li>Identifying victims (including alleged victims) of (childhood or adult) sexual exploitation by name or image.</li>
<li>Highly coarse language with explicit sexual connotations. </li>
        </ul>
        <p>(the above points are together referred to as<span className="font-semibold"> “Sexually Explicit Content”</span>) </p>
        <div className="text-xl font-bold mt-4">
        B.    Protecting Children Below the Age of 18
        </div>
        <p>
        As we are a platform focused on family content , we are deeply committed to child safely and have zero tolerance for any Content that is (i) harmful for, or (ii) endangers children, or (iii) amounts to child pornography. 
        </p>
        <p className="my-2 font-semibold text-lg">
          1. Child Pornography, Nudity and Abuse
        </p>
        <p>Do not post any Sexually Explicit Content in relation to, or that captures minors (those under the age of 18) as well as any full or partial nudity of minors including, but not limited to depictions of genitalia, uncovered buttocks or exposed breasts. Sexually Explicit Content involving children would also include but is not limited to:</p>
        <ul className="list-disc mx-8 my-2">
          <li>Depiction of children engaging in Sexually Explicit Content, either filmed or in a computer generated, or animated form.</li>
          <li>Links to third party websites that host material of children engaging in Sexually Explicit Content. </li>
          <li>Sharing fantasies/desires/expressing interest in engaging in Sexually Explicit Content involving children.</li>
          <li>Sending, or trying to obtain Sexually Explicit Content from a child, including nude images.</li>
          <li>Depiction of a person in power inflicting physical and/or psychological trauma /abuse on a minor.</li>
        </ul>
        <p>
        We understand that parents or other caregivers may not upload Content with an intent for such Content to be viewed or shared or linked as vulgar, provocative, pornographic or obscene. However, the platform comprises of users from various groups of people from different walks of life, having varying sensibilities and orientations, who may view such Content in a different light. To safeguard the interest of your child, we encourage you to exude high levels of discretion and caution before uploading Content comprising of your child and refer to the section of “Tips for Parents/Caregivers/Guardians”below for further guidance.
        </p>
        <p className="my-2 font-semibold text-lg">
          2. Tips for Parents / Caregivers/Guardians
        </p>
        <p>A few tips for parents, caregivers and guardians are below:</p>
        <ul className="list-disc mx-8 my-2">
          <li>Do not post nude/partially nude images of your children. While we understand that people like to share pictures of their children, we may remove images or videos of nude or partially nude children even when they are shared with good intentions as per our polices. This is to prevent others from reusing these images in inappropriate ways.</li>
          <li>Do not post information (either in a post or via comments) that reveals personal information, or the location of your children online. This would include full names / birth date / home address / uniforms that would identify a particular school / schedules of your children.</li>
          <li>Always check with the parents/caregivers/guardians before sharing information about other children. </li>
          <li>Continue to exude discretion as to who has access to your account and the password to the same. Remember to never give your password to your child.</li>

        </ul>
        <p className="my-2 font-semibold text-lg">
          3. Grooming
        </p>
        <p>Grooming, or an adult engaging in predatory behavior to prepare a child for sexual activity, or building an emotional relationship with a minor to gain their trust for the purposes of sexual abuse, sexual exploitation, or sexual trafficking is prohibited. In particular, do not post Content that: (1) encourages, or justifies grooming behaviour; (2) communicates with a minor in a sexually explicit manner; and (3) tricks, bribes, incentivizes or blackmails a child to transmit Sexually Explicit Content.</p>
        <p className="my-2 font-semibold text-lg">
          4. Irresponsible behavior 
        </p>
        <p>Do not post Content that depicts minors consuming or possessing drugs, alcohol, tobacco, e-cigarettes, or any other substance. </p>
        <div className="text-xl font-bold mt-4">
        C. Prohibited Activities
        </div>
        <p className="my-2 font-semibold text-lg">
          1. Violence
        </p>
        <p>Do not upload Content that is gratuitously shocking, sadistic, or excessively graphic, or Content that glorifies violence or celebrates the suffering or humiliation of others, including but not limited to:</p>
        <ul className="list-disc mx-8 my-2">
          <li>Depictions or enactment of or threats of violence or cruelty against people or animals, or of dying or wounded people, or animals .</li>
          <li>Depictions of dismembered, mutilated, charred, or burned human or animal remains.</li>
          <li>Depictions of gore in which an open wound or injury is the core focus.</li>
          <li>Depictions of severe physical violence, including beating, kicking, strangling, drowning, biting, poisoning, burning, or forcible restraint of a human or animal.</li>
        </ul>
        <p>However, Content that is aimed at raising awareness for certain societal issues may be permitted to be posted with limited terms of distribution. </p>
        <p>Videos and photos that show the death of any person may be requested to be removed by a family member. </p>
        <p className="my-2 font-semibold text-lg">
          2. Harmful individuals and organizations
        </p>
        <p>Harmful individuals and organizations are those who commit crimes or cause severe harm, and include those engaged in the following, but are not limited to: hate groups, cults, violent extremist organizations / terrorist organisations, homicide / organised violence / criminal activity, human / organ trafficking, arms / drug trafficking, kidnapping, extortion, blackmailing, money laundering, fraud, or cybercrime. </p>
        <p>Do not post any Content which expresses support, or praise for the above harmful individuals and organizations, or their leaders or members. Any Content which contains names, symbols, logos, flags, slogans, uniforms, gestures, portraits, or other objects meant to represent harmful individuals and/or organizations is not permitted. However, any Content which is educational, historical, artistic, satirical, or aims to raise awareness of the danger posed and harm caused by these individuals and/or organizations may be permitted to be posted with limited terms of distribution. However, such Content should not in any way identify victims in violation of applicable law. Content should not include the personal information/identification/visible features of the face etc. of the victims, which should at the very least be blurred.  </p>
        <p className="my-2 font-semibold text-lg">
          3. Promotion of Crime / Criminal Activities
        </p>
        <p>We do not permit the promotion of any criminal or illegal activities punishable by law, including violent crime, theft, assault, kidnapping, and other harmful behavior. Do not post Content that promotes, glorifies, commends, or admits to any criminal activities.        </p>
        <p className="my-2 font-semibold text-lg">
          4. Dangerous Weaponry, Drugs and other Similar Goods
        </p>
        <p>
        Do not post any Content which includes the sale, trade, promotion or use of unlawfully acquired goods, weapons (including firearms or ammunition), or drugs, e-cigarettes or other controlled substances. 
        </p>
        <p className="my-2 font-semibold text-lg">
          5. Frauds, scams and misleading content
        </p>
        <p>Do not post Content that promotes phishing, ponzi schemes, or other type of scams or fraudulent activities to deceive people to gain advantage. Do not make misleading, inaccurate, deceptive, or disparaging statements as part of the Content. </p>
        <p className="my-2 font-semibold text-lg">
          6. Human and animal exploitation 
        </p>
        <p>Do not post Content that promotes human exploitation, human or animal trafficking, or bestiality, including but not limited to: </p>
        <ul className="list-disc mx-8 my-2">
          <li>Depicts humans forcing animals to attack each other (except in the wild), such as cockfighting. </li>
          <li>Depicts humans abusing an animal for sexual gratification or otherwise.</li>
          <li>Depicts humans hunting animals, or any animal remains from hunting (including trophy hunting).</li>
          <li>Depicts animals in a foreign habitat, such as a circus. </li>
          <li>Which may lead to exploitation of human by promoting or advocating it. For example, sex trafficking, forced marriages etc. </li>
          <li>Solicitation for sexual activities like prostitution and escort services. </li>
        </ul>
        <p>
        However, such Content, the sole purpose of which is to raise awareness on social causes, or Content depicting animals in their natural habitat, may be permitted to be posted with appropriate disclaimers and with limited terms of distribution. 
        </p>
        <p className="my-2 font-semibold text-lg">
          7. Other Illegal Activities 
        </p>
        <p>Do not post any Content, the publication or promotion or which is prohibited by law, including of gambling activities, cheating, plagiarism, and drug trafficking. </p>
        <p className="my-2 font-semibold text-lg">
          8. Irresponsible behavior
        </p>
        <p>Do not post Content that:</p>
        <ul className="list-disc mx-8 my-2">
          <li>Depicts the consumption or possession of drugs, alcohol, tobacco, e-cigarettes, or any other substance by adults. </li>
          <li>May risk the safety of any humans or animals should it be recreated (such as dangerous pranks, imitable stunts, etc ). </li>
          <li>Includes any profanity, vulgar or mocking language.</li>
        </ul>
        <div className="text-xl font-bold mt-4">
        D. Armed Services
        </div>
        <p>Do not post Content that depicts or includes any armed services or government personnel. Individuals featured in the Content should specifically not wear uniforms or identifiable objects (such as badges) of armed services or government personnel (including the military, police, navy, or air force) unless they are authorized to wear the same and appear in the Content in their professional capacity.</p>
        <div className="text-xl font-bold mt-4">
        E. National Flag, Emblem and currency
        </div>
        <p>Where there is Content displaying the national flag, national emblem or national currency of any country, it should not in any way appear to be derogatory of its honor or shown in such light that the any of them are disrespected. Any Content which distorts or demeans the national emblem, flag,  symbols, currency etc. deliberately is prohibited and may be removed as per our policies.</p>
        <div className="text-xl font-bold mt-4">
        F. Hate Speech
        </div>
        <p>Hate speech, or Content that verbally or physically attacks/incites violence, hurts religious sentiments or feelings, or calls for harm to an individual or a group of individuals on the basis of race, ethnicity, national origin, religious affiliation, sexual orientation, caste, sex, gender, gender identity, immigration status and contraction of a disease or disability is not permitted. Attacks on such groups include violent or de-humanizing speech, statements of inferiority, or calls for exclusion or segregation.</p>
        <div className="text-xl font-bold mt-4">
        G. Fake News & Defamatory Content 
        </div>
        <p>Do not post Content that is:  </p>
        <ul className="list-disc mx-8 my-2">
          <li>fake or may spread fake news/ information that may cause harm; or</li>
          <li>derogatory, disparaging, demeaning or defamatory to any individual or organisation.</li>
        </ul>
        <p>We do not encourage posting of such Content at all as we recognize the devastating and cascading effect that fake news and/or defamatory Content can have on the individual or organization and even has the potential of creating anxiety amongst the citizens and threatening the peace and security of a nation. While we believe in curtailing spread of fake news,  rumors and defamatory Content, due to the nature of the same, it is difficult for us as a platform to assess or analyse such Content. Therefore, we may or may not remove such Content, but we shall endeavor in reducing its circulation. </p>
        <div className="text-xl font-bold mt-4">
        H.    Self-harm and Suicide 
        </div>
        <p>Do not post Content that promotes, encourages or glorifies suicide, self-harm, dangerous activities or violence, especially amongst children. Any Content showing activities or challenges that could lead to harm or injury or eating disorders is strictly prohibited, including any promotion of games which encourage self harm or suicide.  </p>
        <p>However, such Content, the sole purpose of which is to raise awareness on social causes carrying appropriate disclaimers may be permitted to be posted and with limited terms of distribution. </p>
        <div className="text-xl font-bold mt-4">
        I.      Harassment and Bullying
        </div>
        <p>As an organization, we have zero tolerance for bullying, intimidation, social exclusion, stalking,  harassment or blackmail of any nature. Do not post Content targeting others maliciously and/ or Content which are humiliating, harassing or bullying. This includes Content which shows physical or verbal bullying or violence, especially against minors.</p>
        <div className="text-xl font-bold mt-4">
        J.      Infringement of Privacy
        </div>
        <p>As an organisation, we strongly believe in protection of individual privacy and do not tolerate Content that promotes identity theft by revealing personal information of individual or violates privacy. Do not post Content that contains any personal or confidential information of another individual, including of children.  Where any other individual appears in the Content.  we presume that you have taken the consent of said individual for the same, or from the legal guardian of the child who may feature in your Content, and the Application will not be liable for the inclusion of any such Content.</p>
        <div className="text-xl font-bold mt-4">
        K.    Intellectual Property Rights
        </div>
        <p>Do not post Content that infringes third party copyright, trademark or any other intellectual property rights. Please ensure that you have all the rights before sharing any Content and that you respect other people intellectual property rights. The Application is not liable for any Content that may infringe third party content. </p>
        <div className="text-xl font-bold mt-4">
        L.     Impersonation and Fake Accounts
        </div>
        <p>Do not impersonate others, or create fake accounts of other individuals or organisations in order to deceive people. We also do not allow Content which promotes or shares instructions on artificial traffic generation. In case where such account or Content is reported, we will remove such account or Content from our platform if it violates our policy. </p>
        <div className="text-xl font-bold mt-4">
        M.  Religious Places and Private Property
        </div>
        <p>Do not post Content in any locations where you do not have permission to do so, such as inside religious places or on private property. </p>
      </div>

      



      <StaticFooter/>
    </div>
  );
}

export default Community;

