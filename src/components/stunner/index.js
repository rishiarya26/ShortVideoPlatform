/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-no-duplicate-props */
import { useRouter } from 'next/router';
import { useState } from 'react';
import faq from '../../../public/stunner-FAQ.json'
import { withBasePath } from '../../config';
import CloseFaq from '../commons/svgicons/close-faq';
import OpenFaq from '../commons/svgicons/open-faq';
import Header from '../desk-header';
import StaticFooter from '../static-footer';

function Stunner() {
 const [items, setItems] = useState(faq?.faq);
 const router = useRouter()

 const links={
  facebook : 'https://www.facebook.com/HiPiOfficialApp',
  twitter : 'https://twitter.com/HiPiOfficialApp',
  instagram : 'https://www.instagram.com/hipiofficialapp/?hl=en'
}

const stores = {
  android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
  ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
};

const onStoreRedirect =(device)=>{
  device && (window.location.href = `${stores[device]}`);
}

 const handleClick = (id) =>{
   let updateItem = [...items];
   updateItem[id].show = !(updateItem[id]?.show);
   setItems(updateItem);
 }
  return (
    <div className="w-full h-full">
       {/* <div className=" headerbar w-full h-18 flex items-center fixed top-0 lg:px-10 px-4 py-2 justify-between">
        <img className="w-16" src={withBasePath('images/stunner/stunner-logo.png')} alt="" /> 
        <div className='flex text-white font-medium'>
          <a className='px-4'>Challangers</a>
          <a className='px-4'>Winners</a>
          <a className='px-4'>Contact</a>
        </div>
      </div> */}
  <Header/>
<div className="flex items-center flex-col section_1 bg_1 h-screen relative md:pt-16">
  <div className='w-full'>
  <img alt="" src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/b656a7f4-4688-4997-bb7c-54b78793981e1658752386588-Western-Wear_Desk.jpg" />
  </div>
  <div className='py-16 w-full flex flex-col items-center'>
    <h1 className='text-2xl font-bold font-gray-500 mt-4 mb-2'>Own the red carpet!</h1>
    <p className='w-1/2 font-gray-400 pt-4 text-center'>
Hipi Stunner is designed for you to celebrate your uniqueness both body and in style. It holds no boundaries, no types, no skin tones and no ethnicity. Showcase how you carry your fashion up your sleeve and walk the big stage in style. Be a tenner, a Hipi Stunner.
</p>
  </div>
</div>




<div className='w-full flex flex-col md:flex-row py-4 md:pb-8 items-center justify-center bg_pastel_blue'>
        <div className='w-full flex-col flex py-8 md:p-8 px-8  max_800'>        
            <div className='w-full justify-center flex'><h3 className='text-3xl font-bold text-gray-800'>Who is a Hipi Stunner?</h3></div>
            <p className='text-gray-600 font-light text-lg py-4'>You’ve always been a Hipi Stunner! How? See for yourself:</p>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You enjoy dressing up, have a knack for style and bond with clothes like no one you know does.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You are a content creator or not, a serious fashion follower or not, a trendsetter in your family or college, a home entrepreneur, a known fashionista at work or just someone who likes to keep it stylish and fashionable on a daily basis.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You may not have fashionable clothes, but you are always ready to consume anything even remotely related to fashion.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You aspire to be recognized for your talent and celebrated in a way that not only reinstates your belief in yourself but also wins the confidence of people around you.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You’re looking for validation of your skills from the industry’s best of the best and want to be mentored and guided by a top fashion maestro.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You love the spotlight and it’s about time you turn your love for fashion into something bigger.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You want to leverage a platform to be seen and for exposure into the world of fashion.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You want the world to see you as someone who has made a mark, an achiever, as someone who has rightfully earned a place amongst the best and one whose evolution journey is nothing short of remarkable.</p></div>
            <p className='text-gray-600 font-light text-lg pt-4' >If your answer to any of the above or most of the above is a Yes, then you could be a Hipi Stunner and we are looking for you.</p>
        </div>
    </div>

    <div className='w-full flex flex-col-reverse md:flex-row  py-4 md:pb-8 bg_1'>
        <div className='md:w-1/2 w-full  md:pl-32 md:p-8 px-8 '>
            <img alt="Get cash rewards with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Cash Rewards.png')} /> 
        </div>
        <div className='md:w-1/2 w-full  flex-col flex py-8 md:p-8 px-8 md:pr-32 justify-center'>
            <h3 className='text-3xl font-bold text-gray-800'>How does Hipi Stunner unfold:</h3>
            <p className='text-gray-500 font-light text-lg pt-4'>It’s a 6-month contest for everyone and anyone who loves fashion irrespective of gender, age, height, weight or marital status. It’s a platform for all entertainment-loving people to come together to:</p>
            <div className='flex pt-4'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-500 font-light'>Create and consume great fashion-based content,</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-500 font-light'>Share and showcase their talent with individuality</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-500 font-light'>Grow into the business of fashion</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-500 font-light'>Feel validated and by being seen, heard, loved and followed.</p></div>
         <p className='text-gray-500 font-light text-lg pt-4'>Each month the participants enter two fashion-based challenges presented by Nikita Anand, Miss India Universe leading to content that is unique, fresh and entertaining.</p>
         <p className='text-gray-500 font-light text-lg pt-4'>The best performing videos get visibility in the Discover section of Hipi App.</p>
         <p className='text-gray-500 font-light text-lg pt-4'>At the end of each month, the very best content creator from amongst the best performing videos is chosen by Nikita Anand for the title of the Hipi Stunner in a memorable and a very special coronation ceremony.</p>
         <p className='text-gray-500 font-light text-lg pt-4'>Hipi Stunner gets a cash prize of Rs 1,00,000, and a blue ticked verified account on Hipi App.</p>
         <p className='text-gray-500 font-light text-lg pt-4'>At the end of six months, the six Hipi stunners get a taste of life in the limelight that many only dream of as they walk the red carpet styled by the leading fashion designer Ada Malik at the Zee Cine Awards, telecasted worldwide on TV.</p>
         
        </div>
    </div>


    <div className='w-full flex flex-col md:flex-row py-4 md:pb-8 items-center justify-center bg_pastel_blue'>
        <div className='w-full flex py-8 md:p-8 px-8  max_800'>  
          
          <div className='w-64 h-80 flex flex-col bg-white rounded-xl overflow-hidden mx-4'>
              <div className='overflow-hidden'>
                  <img src="https://akamaividz2.zee5.com/image/upload/w_380,c_scale,f_auto,q_auto/v1657942550/hipi/assets/music/lavretovideo/discover_lavretovideo.webp"/>
              </div>
              <div className='w-full flex flex-col justify-center items-center'>
                    <h4 className="text-lg font-semibold text-gray-500 pt-6">Challange</h4>
                    <p>challenge description</p>
              </div>
          </div>

          <div className='w-64 h-80 flex flex-col bg-white rounded-xl overflow-hidden mx-4'>
              <div className='overflow-hidden'>
                  <img src="https://akamaividz2.zee5.com/image/upload/w_380,c_scale,f_auto,q_auto/v1657942550/hipi/assets/music/lavretovideo/discover_lavretovideo.webp"/>
              </div>
              <div className='w-full flex flex-col justify-center items-center'>
                    <h4 className="text-lg font-semibold text-gray-500 pt-6">Challange</h4>
                    <p>challenge description</p>
              </div>
          </div>

        </div>
    </div>

    <div className='w-full flex flex-col-reverse md:flex-row  py-4 md:pb-8 bg_1'>
        <div className='md:w-1/2 w-full  md:pl-32 md:p-8 px-8 '>
            <img alt="Get cash rewards with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Cash Rewards.png')} /> 
        </div>
        <div className='md:w-1/2 w-full  flex-col flex py-8 md:p-8 px-8 md:pr-32 justify-center'>
            <h3 className='text-3xl font-bold text-gray-800'>How To Participate</h3>
            <p className='text-gray-500 font-light text-lg pt-4'>Step 1: Download Hipi</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Step 2: Login to Hipi/ Create an Account</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Step 3: Create your fashion videos based on the challenges of the month</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Step 4: Upload your videos on Hipi using the hashtag #HipiStunner</p>
        </div>
    </div>



    <div className='w-full flex flex-col md:flex-row  py-4 md:pb-8 bg_pastel_blue'>
        <div className='md:w-1/2 w-full flex-col flex py-8 md:pl-32 md:p-8 px-8 justify-center'>
            <p>The Host</p>
            <h4 className='text-3xl font-bold text-gray-800'>Nikita Anand</h4>
            <p>Miss India Universe 2003</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Nikita won the title of Miss India Universe in 2003. Since then, she has been seen on numerous magazine covers, fashion weeks, designer shoots, ad campaigns, and Bollywood films. She rubs shoulders with the top industry experts in the fashion and lifestyle circuit and has been a muse for top fashion designers like Ritu Kumar, JJ Vallaya, and Mona Pali.</p>
        </div>
        <div className='md:w-1/2 w-full flex justify-center px-8 md:pr-32 '>
            <img alt="Get assured gifts with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Assured Gifts.png')} /> 
        </div>
    </div>





<div className="flex w-full justify-center bg_1">
  <div className='flex flex-col p-8 px-4 max_800'>
  <div className='w-full flex justify-center text-3xl font-semibold pb-6'>Frequently Asked Questions</div>
{items?.map((data, id)=>(
  <div key={id} className="mt-6">
  <div id={id} className="cursor-pointer transition duration-500 ease-in-out flex items-center font-medium" onClick={()=>handleClick(id)}>
    <span className="pr-2 flex" >{data.show ? <CloseFaq/> : <OpenFaq/>}</span>
     {data.ques}
     </div>
  {data.show && <div id={id} className="pt-2 pl-6 text-gray-700 transition duration-500 ease-in-out"> {data.ans}</div>}
  </div>
))}
</div>
</div>
    
      <StaticFooter/>
    </div>
  );
}

export default Stunner;

