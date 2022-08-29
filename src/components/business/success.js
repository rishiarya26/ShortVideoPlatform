/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/no-unescaped-entities */

import { withBasePath } from "../../config";
import { useRouter } from "next/router";
import StaticFooter from "../static-footer";
import HeaderBusiness from "./header";
  

function SuccessStories() {

   const router = useRouter();

return (
   <>
  <div className=" flex flex-col justify-center items-center">
   <HeaderBusiness/>
   <div className="bg-gray-200 w-full">
   <div className="flex justify-center mt-16 py-32 min-h-70v  md:h-auto md:py-48 ">
      <div className="w-feed flex flex-col justify-center items-center md:flex-row md:justify-between ">
         <div className="text-4xl md:text-6xl md:w-2/3 mb-4 font-bold text-gray-600 px-4 flex md:px-6"><h3>Success Stories</h3></div>
         <p className="w-full md:w-1/3 text-gray-800 px-4 text-lg font-medium">Boost your brand presence by being where users are on Hipi. Be discoverable right on the home page. Be the first
thing users see when they open the app</p>
</div>
</div>
</div>
   <div className="w-full justify-center flex flex-col w-feed items-center pt-6 mt-6 md:py-12 md:my-12">
      <div className="flex flex-col md:flex-row justify-between">
         <div className="md:w-1/2 font-bold text-gray-600 p-4 flex justify-center items-center">
         <div className="rounded-2xl overflow-hidden box_shadow_1">
            <video width="320" height="240" autoPlay="true" muted loop src={withBasePath('videos/advertisement/Sahi_Pakde_hai.mp4')} type="video/mp4"/> 
            </div>
         </div>
         <div className="w-full md:w-1/2 text-base font-medium text-gray-600 px-8 md:px-0 flex justify-center flex-col items-start">
            <h3 className="text-gray-800 py-4 text-2xlCfont-bold md:text-4xl font-bold "># SahiPakdeHain </h3>
            <p className="text-base font-normal pb-2">The Hipi Hashtag Challenge is a digital marketing approach that exponentially increases brand visibility and engagement for businesses. It maximizes the audience's inclination to produce content by encouraging users to create videos while performing specific tasks or adhering to a set of instructions as part of the "challenge". This user-generated-content which has high potential for baked-in virality features increases brand awareness. Over 35% of users participate in challenges and over 16% of videos on Hipi are tied to some challenge. </p>
            <p className="text-base font-normal pb-2">A great example of the success of Hipi’s Hashtag Challenge is the #SahiPakdeHain contest. This Hashtag Challenge was created to promote a major TV show on Zee by encouraging users to “duet” with its star Shubhani Atre. By recognizing the popularity of the Duet feature among the Hipi audience, the client integrated it into the challenge. They further tapped into leading Hipi influencers to take it forward as they have a wider reach. The additional impetus provided to maximize user engagement in the challenge was the appeal of a reward for a winning video, which in this case was an opportunity to meet with the star herself. The ripple effect generated resulted in a massive 20K+ video creations within the first 36 hours and to date the challenge has garnered total of 100k+ video creations and 100M+ video views. </p>
            <p className="text-base font-normal pb-2">#This clearly underlines the visibility provided by the Hashtag Challenge feature of Hipi that leverages the virality of challenges and the power of its influencers in promoting the client’s brand. </p></div>
      </div>
   </div>
   <div className="w-full justify-center flex flex-col items-center pb-6 mb-6 md:pb-12 md:mb-12">
      <div className="flex flex-col-reverse md:flex-row justify-between w-feed">
         
         <div className="w-full md:w-1/2 text-base font-medium text-gray-600 px-8 md:px-12 flex justify-center flex-col items-start">
         <h3 className="text-gray-600 py-4 text-3xl font-semibold">#RRR</h3> 
            <p className="text-base font-normal pb-2">The Hipi Hashtag Challenge is a digital marketing strategy that exponentially increases brand reach and customer engagement. It encourages viewers to create content by filming themselves while abiding by a set of instructions as part of a specific "challenge".  The virality potential of such challenges increases brand awareness as evident from Hipi's 35% user participation rate. More than 16% of Hipi videos are tied to some challenge. </p>
            <p className="text-base font-normal pb-2">The #RRR challenge is another fantastic illustration of Hipi's Hashtag Challenge's success. The challenge was created to promote the RRR movie in multiple languages as it was a pan-India movie release. The user was given complete creative control to produce an RRR video of any genre to gain maximum traction. Around 50+ prominent Hipi influencers who have a broader audience were used to create official videos and help advance the cause. The promise of a prize for a winning entry, in this case cash prizes up to Rs.5000 and amazon gift vouchers, provided an extra incentive to fuel user participation in the challenge. The influencer RRR challenge videos received millions of video views and the snow-balling impact led to over 20K+ video submissions. This challenge drastically outperformed Hipi's existing 5000 pieces of UGC. </p>
            <p className="text-base font-normal pb-2">This amplifies the exposure offered by Hipi's Hashtag Challenge feature, which capitalizes on the challenges' virality and the influence of its influencers to market the client's brand.</p>
            </div>
            <div className="md:w-1/2 font-bold text-gray-600 p-4 flex justify-center items-center">
         <div className="rounded-2xl overflow-hidden box_shadow_1">
            <video width="320" height="240" autoPlay="true" muted loop src={withBasePath('videos/advertisement/Sahi_Pakde_hai.mp4')} type="video/mp4"/> 
            </div>
         </div>
      </div>
   </div>
</div>
<StaticFooter/>
   </>
);
}
export default SuccessStories;