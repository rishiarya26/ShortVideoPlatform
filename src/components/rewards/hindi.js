/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities*/
import { withBasePath } from '../../config';

const Hindi=()=> (
        <div className=' md:mt-4'>
        <div className='flex w-full flex-col-reverse md:flex-row pb-4 md:pb-12'>
            <div className='w-full md:w-1/2 flex-col flex py-6 md:pl-40 md:p-8 px-8 justify-center '>
                <h1 className='text-3xl text-center md:text-left reward_font font-bold font-gray-700 pb-2 mt-4 mb-2'>Hipi करो, Rewards जीतो</h1>
                <p className='md:w-3/4'>Hipi Reward Program एक इनाम कार्यक्रम है। Hipi app पर रोज़ाना videos देखकर, users rewards कमा सकते हैं लेकिन videos देखने की ये गतिविधि समयबद्ध है। एक निश्चित समय के भीतर videos को देखकर, users coins इकठ्ठा कर सकते हैं। आप सिर्फ videos देखकर ही नहीं बल्कि videos बनाकर और अपने दोस्तों और परिवार के साथ videos share करके भी Hipi rewards पा सकते हैं। ऐसा करने पर, आपको ज़्यादा coins और फ़ायदे मिलेंगे। जैसे-जैसे आपका level बढ़ेगा, coins बढ़ते जाएंगे। </p>
                <p className='md:w-3/4'>Hipi rewards कमाने के लिए, कुछ आसान तरीके आपको अधिकतम लाभ दिला सकते हैं जिसका वर्गीकरण यहां दिया गया है:</p>
                
            </div>
            <div className=' w-full md:w-7/12 px-8 md:pr-20 md:pt-8 md:py-0'>
                <img className='flex object-contain min-h-20 hidden md:flex'alt="Supermonindia contest" src={withBasePath('images/rewards/hipi_rewards_sec_1.webp')} />
            </div>
        </div>
        <div className="">
            <div className='flex  flex-col items-center w-full py-8 px-4 md:py-14 bg_pastel_reward text-center'>
                <h3 className='mt-4 font-medium text-2xl pb-1 reward_font'>Videos देखो, Rewards कमाओ </h3>
                <p>जब आप videos देखते हैं तो Hipi app पर निम्न levels को unlock कर देंगे:</p>
                <div className='flex w-full flex-row justify-center items-center py-4'>
                <div className='box_shadow_1 bg-white p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>1</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>25 videos देखने पर</p>
                </div>
                <div className='box_shadow_1 bg-white p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4 md:mx-8'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>2</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>50 videos देखने पर</p>
                </div>
                <div className='box_shadow_1 bg-white p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>3</p>
                     <p className=' text-gray-500 text-xs md:text-sm font-medium'>75 videos देखने पर</p>
                </div>
                </div>
   
                <p className='text-left w-full md:w-4/12 text-xs px-6'>           
                 <ul className='list-disc'>
                    {/* <li>केवल पूरी तरह देखे गए videos ही मान्य होंगे  </li>
                    <li>आंशिक रूप से देखे गए या छोड़े गए videos मान्य नहीं होंगे </li> */}
                    <li>केवल वही videos मान्य होंगे जो कम से कम 5 सेकंड क लिए देखे गए हैं</li>
                <li>यदि आप एक ही video को कई बार देखते हैं तो भी 1 ही video गिना जायेगा</li>
                <li>आपकी दैनिक प्रगति रोज़ रात 11:59 बजे reset हो जाएगी। हर रोज़ रात को 11:59 बजे से पहले, आप Spin The Wheel के ज़रिये coins इकठ्ठा कर के, नए levels को unlock कर पाएंगे। हरेक नया level आपको ज़्यादा से ज़्यादा rewards हासिल करने का मौका देगा।</li>
                </ul>
                </p>
            </div>
            {/* <div className='flex  flex-col items-center w-full py-8 px-4 md:py-14 bg_1 text-center'>
                <h3 className='mt-4 font-medium text-2xl pb-1 reward_font'>Earn rewards when you follow creators</h3>
                <p className='text-center w-full md:w-1/2'>When you follow creators on the app, you will unlock the following levels:</p>
             
                <div className='flex w-full justify-center items-center py-4'>
                <div className='box_shadow_1 bg_pastel_reward p-2 py-4 md:p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>1</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>On following 20 creators</p>
                </div>
                <div className='box_shadow_1 bg_pastel_reward p-2 py-4 md:p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4 md:mx-8'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>2</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>On following 40 creators</p>
                </div>
                <div className='box_shadow_1 bg_pastel_reward p-2 py-4 md:p-4 w-1/2 md:w-40 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>3</p>
                     <p className=' text-gray-500 text-xs md:text-sm font-medium'>On following 60 creators</p>
                </div>
                </div>

                
                <p className='text-left w-full md:w-4/12 text-xs px-6'>
                <ul className='list-disc'>
                <li>Only one follow for a creator will be considered even if you follow and unfollow the creator multiple times.</li>
                <li>Your daily progress will reset at 11:59 PM every day. You should spin the wheel and unlock your coins for the levels achieved daily before 11:59 PM.</li>
                </ul>
                </p>
            </div> */}
            <div className='flex  flex-col items-center w-full py-8 px-4 md:py-14 bg_1 text-center'>
                <h3 className='mt-4 font-medium text-2xl pb-1 reward_font'>Video बनाओ, Share करो और Rewards कमाओ</h3>
                <p className='text-center w-full md:w-1/2'>आप video बना कर और उसे अपने दोस्तों के साथ share कर के, rewards हासिल कर  सकते हैं। इसके लिए आप Hipi app पर video post करने के बाद उसकी video link को अपने दोस्तों के साथ share कर दें। जब आपके मित्र आपके द्वारा share किए गए video link का उपयोग करके video देखते हैं तो आप निम्न levels को unlock कर देंगे:</p>
            
                <div className='flex w-full justify-center items-center py-4'>
                <div className='box_shadow_1 bg-white p-2 py-4 md:p-4 w-1/2 md:w-48 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>1</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>Video पर 5 views मिलने पर</p>
                </div>
                <div className='box_shadow_1 bg-white p-2 py-4 md:p-4 w-1/2 md:w-48 flex flex-col m-1 md:m-4 md:mx-8'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>2</p>
                     <p className='text-gray-500 text-xs md:text-sm font-medium'>Video पर 10 views मिलने पर</p>
                </div>
                <div className='box_shadow_1 bg-white p-2 py-4 md:p-4 w-1/2 md:w-48 flex flex-col m-1 md:m-4'>
                <p className=' pl-2 font-medium text-sm reward_font'>Level</p>
                    <p className='mb-2 pl-2 font-bold text-4xl reward_font'>3</p>
                     <p className=' text-gray-500 text-xs md:text-sm font-medium'>Video पर 15 views मिलने पर</p>
                </div>
                </div>                 
                <p className='text-left w-full md:w-4/12 text-xs px-6'>
                <ul className='list-disc'>
                <li> एक नया और original video ही post और share किया जाना चाहिए। आपके द्वारा पूर्व में post या share किए गए video पर विचार नहीं किया जाएगा।</li>
                <li>आपके द्वारा share किए गए video link के माध्यम से, जब आपके मित्र video को देखेंगे, तभी वह reward के लिए मान्य होगा। App पर अन्य users द्वारा देखे जाने वाले views, reward के लिए मान्य नहीं होंगे।</li>
                <li>आपकी दैनिक प्रगति रोज़ रात 11:59 बजे reset हो जाएगी। हर रोज़ रात 11:59 बजे से पहले, आप Spin The Wheel के ज़रिये coins इकठ्ठा कर के नए levels को unlock कर पाएंगे। हरेक नया level आपको ज़्यादा से ज़्यादा rewards हासिल करने का मौका देगा।</li>
                </ul>
                     </p>
            </div>
            <div className='flex  flex-col items-center justify-center w-full py-8 px-4 md:py-14 relative z-0 '>
                <div className='absolute left-0 bottom-0 flex w-1/2 items-center z-10'>
                    <img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/rewards/hipi_rewards_bg_2.webp')} />
                </div>
                <div className='hidden md:flex absolute right-0 top-0 w-1/2  items-center z-10'>
                    <img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/rewards/hipi_rewards_bg_1.webp')} />
                </div>
				<div className='z-20 w-full md:w-3/4 flex flex-col items-center'>
                <h3 className='mt-4 font-medium reward_font text-lg pb-4 text-center'>Wheel घुमाओ, Coins कमाओ </h3>
                <p>जब भी आप किसी एक level को unlock कर लेते हैं तो app पर उस level को 'unlocked' के रूप में देख पाएंगे। Level unlocked होते ही, आपको एक wheel को spin करने की अनुमति मिल जाती है जिससे आप coins जीत सकते हैं।</p>
                <p>Level 1 में आप निम्न में से किसी एक मूल्यवर्ग के coins अर्जित करेंगे:</p>
                <p className='mb-2 py-4 font-bold text-2xl reward_font'>10, 8, 6, 4, 2, 0</p>
                <p>Level 2 में जीतने पर ये coins 1.5 से गुणा हो जाते हैं और level 3 में जीतने पर 2 से गुणा हो जाते हैं।</p>


                {/* <h3 className='mt-4 font-medium reward_font text-lg pb-1'>Details & Conditions</h3>
                <p>Your daily progress will reset at 11:59 PM daily during the Hipi Reward Program period.</p>
                <p className=''>You should spin the wheel and unlock your coins for the levels achieved daily before 11:59 PM during the Hipi Reward Program.</p>
                
                 */}
                 <div className='text-left md:w-3/4 text-sm'>
                <h3 className='mt-6 font-medium reward_font text-lg pb-4 w-full text-center'>नियम एवं शर्तें</h3>

                <div className='flex items-start'>1<p className='mb-2 pl-2 text-left'> Hipi Reward Program की अवधि के दौरान आपकी दैनिक प्रगति हर रात 11:59 बजे reset हो जाएगी।</p></div>
                <div className='flex items-start'>2<p className='mb-2 pl-2 text-left'> जब Hipi Reward Program चल रहा हो तो आपको wheel को spin करना चाहिए और रोज़ रात 11:59 बजे से पहले, unlock किए गए levels से coins इकट्ठे कर लेने चाहिए।</p></div>
                <div className='flex items-start'>3<p className='mb-2 pl-2 text-left'> एक user केवल एक account का ही उपयोग करके Hipi Reward Program में भाग ले सकता है। यदि एक user कई accounts का उपयोग करके Hipi Reward Program में भाग लेता है तो cash out किए गए coins, Hipi द्वारा लिंक किए गए Paytm wallet में स्थानांतरित नहीं किए जाएंगे।</p></div>
                <div className='flex items-start'>4<p className='mb-2 pl-2 text-left'>  Hipi Reward Program में आपकी भागीदारी आगे के नियमों और शर्तों के अधीन है, जैसा कि नीचे बताया गया है:</p></div>

                <div className='flex items-start'>•<p className='mb-2 pl-2 text-left'> एक user Hipi Reward Program के लिए तभी योग्य होगा जब उसने Hipi mobile app में log-in किसी Android फोन से किया हो।</p></div>
                <div className='flex items-start'>•<p className='mb-2 pl-2 text-left'> User द्वारा post किए गए video, Hipi समुदाय दिशानिर्देशों और Hipi उपयोग की शर्तों के अनुरूप होने चाहिए। कोई भी सामग्री जो उपर्युक्त नीतियों के अनुरूप नहीं है, उसे platform से हटा दिया जाएगा। कॉपीराइट दावे या तृतीय-पक्ष बौद्धिक संपदा अधिकारों के किसी अनधिकृत उपयोग की सूचना मिलने की स्थिति में, हम ऐसी सामग्री को platform से हटा देंगे, और इनाम अंक वापस ले लिए जाएंगे।</p></div>
                <div className='flex items-start'>•<p className='mb-2 pl-2 mb-6 text-left'> User के लिए प्राप्त levels की गणना Hipi Reward Program की शुरुआत में प्रकाशित मापदंडों के आधार पर की जाएगी। गणना मानदंड समय-समय पर परिवर्तन के अधीन हैं।</p></div>
				</div>
                </div>
            </div>
        </div>
    </div>
)
export default Hindi;