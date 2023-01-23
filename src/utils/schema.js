 const websiteSchema = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "Hipi",
    "url": "https://www.hipi.co.in/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const organisationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Hipi",
      "url": "https://www.hipi.co.in/",
      "logo": "https://www.hipi.co.in/icons/Logo_hipi.png",
      "sameAs": [
        "https://www.hipi.co.in/",
        "https://www.facebook.com/HipiOfficialApp",
        "https://twitter.com/HipiOfficialApp",
        "https://www.instagram.com/hipiofficialapp/",
        "https://www.youtube.com/channel/UCXEcEOyCcXzEU4UCLtBL6SQ",
        "https://www.linkedin.com/company/hipiofficialapp/"
      ]
  }

  const personSchema = ({name, desc, userHandle}) => {
    const payload ={
      "@context":"https://schema.org/",
      "@type":"Person",
      "name":name,
      "description":desc,
      "alternateName":name,
      "mainEntityOfPage":{"@type":"ProfilePage",
      "@id":`https://www.hipi.co.in/${userHandle}`
  }}
    return payload;
  }
  
  const breadcrumbSchema = ({name, userHandle, videoId}) => {
     const payload = {  
      "@context":"https://schema.org/",
      "@type":"BreadcrumbList",
      "itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"Thing","@id":"https://www.hipi.co.in/","name":"Hipi"}},
      {"@type":"ListItem",
      "position":2,
      "item":{"@type":"Thing",
      "@id":`https://www.hipi.co.in/${userHandle}`,
      "name":`${name} (${userHandle}) | Hipi`}},
      {"@type":"ListItem","position":3,"item":
        {"@type":"Thing","@id":`https://www.hipi.co.in/single-video/${videoId}`,"name":"Behind the scenes of Zee Rishtey Awards 2022❤️ #hipikaromorekaro #zee"}
      }]}
    return payload;
    }
    const singleVideoSchema = ({name='video',userThumnail='video',desc='video', videoId='video',view, createdOn='video'})=>{
         const payload = {
           "@context": "https://schema.org",
           "@type": "VideoObject",
           "name": `${name} on Hipi | ${name} Short Videos on Hipi`,
           "description": desc,
           "thumbnailUrl": userThumnail,
           "uploadDate": createdOn,  
           "contentUrl": `https://www.hipi.co.in/single-video/${videoId}`,
           "potentialAction": {
             "@type": "SeekToAction",
             "target": `https://www.hipi.co.in/single-video/${videoId}`,
             "startOffset-input": "required name"
           }
         }
         return payload;
       }

 const videoSchema = (videoItems=[])=>{
   console.log('video',videoItems)
   const videosList = videoItems?.length > 0 && videoItems.map((item,id)=>{
     return {"@type": "VideoObject",
     "position": id+1,
     "name": `${item?.content_description || ''} | ${item?.videoOwnersDetail?.firstName || ''} ${item?.videoOwnersDetail?.lastName || ''}’s Video on Hipi`,
     "url": `https://www.hipi.co.in/single-video/${item?.id}`,
     "description": item?.content_description || 'Hipi is a short video app that brings you the latest trending videos that you can enjoy and share with your friends or get inspired to make awesome videos. Hipi karo. More karo.',
     "thumbnailUrl": [
       item?.thumbnailUrl
     ],
     "uploadDate":  item?.createdOn ? new Date(item?.createdOn)?.toISOString() : '',
     "duration": item?.duration,
     "contentUrl": `https://www.hipi.co.in/single-video/${item?.id}`,
     "embedUrl": `https://www.hipi.co.in/@${item?.userName}`,
     "interactionStatistic": {
       "@type": "InteractionCounter",
       "interactionType": { "@type": "WatchAction" },
       "userInteractionCount": 19600
     }
   }
   })
      const payload = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": videosList
      }
      console.log(payload)
      return payload;
    }

    const pageSchema = ({userName})=>{ 
      return {"@context":"https://schema.org/",
    "@type":"ItemPage",
    "@id":`https://www.hipi.co.in/${userName}`}
  }
    

    export const faqStunner = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Who can participate?\n","acceptedAnswer":{"@type":"Answer","text":"Anyone and everyone who is even remotely interested in fashion can participate. If you have the dream to \nbe in the limelight for your style, but you have held yourself back because of your own constraints, worry \nnot. You could be of any age or gender and still be crowned as a Hipi Stunner. \nIf you are under 18 then parental/guardian approval is needed."}},{"@type":"Question","name":"Do I need to be a trained fashion professional to participate?","acceptedAnswer":{"@type":"Answer","text":"No, not all. You could be a teacher or a bartender, a homemaker or a working professional, a college \nstudent or retired! If you enjoy fashion, you can participate."}},{"@type":"Question","name":"I am married. Am I still eligible to participate?","acceptedAnswer":{"@type":"Answer","text":"Yes, you are! We have no restrictions based on relationship status."}},{"@type":"Question","name":"Do I need to buy a lot of new clothes to win?","acceptedAnswer":{"@type":"Answer","text":"No! All the challenges designed for Hipi Stunners can be successfully done with the existing clothes in \nyour wardrobe. It depends on your creativity, on how you utilize the pieces to express yourself."}},{"@type":"Question","name":"Can I make DIY outfits for the challenges?","acceptedAnswer":{"@type":"Answer","text":"Definitely yes! Anything that you feel amplifies your style and celebrates your uniqueness is very \nwelcome."}},{"@type":"Question","name":"If I have many looks for a challenge, what can I do?","acceptedAnswer":{"@type":"Answer","text":"You can make separate videos and upload them on the Hipi app. You’ll be selected based on the \nengagement of your videos, so, the more, the merrier!"}},{"@type":"Question","name":"Are there any restrictions in the way we style ourselves?","acceptedAnswer":{"@type":"Answer","text":"No restrictions! Whatever sails in your boat, sails in ours. You can be true to yourself and express your \nstyle however you want to – in fact, it’s one of the things that we’re looking for in the winner, a Hipi \nStunner."}},{"@type":"Question","name":"Can I mix different styles, like western with ethic?","acceptedAnswer":{"@type":"Answer","text":"Yes! Our challenges will expect you to experiment with various styles and tastes. This will in return help \nyou find your personal fashion sense while having a lot of fun!"}},{"@type":"Question","name":"Are Haul fashion videos accepted?","acceptedAnswer":{"@type":"Answer","text":"No. We don’t have a ‘Haul Challenge’ either. This pageant is strictly challenge based and any entry that \ndoesn’t fit in the criteria of the challenge will not be accepted for the contest."}},{"@type":"Question","name":"How to open an Account on Hipi App?","acceptedAnswer":{"@type":"Answer","text":"Download Hipi app from Play Store or App Store. Sign up and you are good to go."}},{"@type":"Question","name":"How long is the contest?","acceptedAnswer":{"@type":"Answer","text":"The contest is for 6 months, starting from 1st of August and ending on 31st Jan 2023"}},{"@type":"Question","name":"How many winners are there every month? ","acceptedAnswer":{"@type":"Answer","text":"There will be one winner every month. Hence, a total of six winners in the duration of six months."}},{"@type":"Question","name":"How many videos can I upload in one day?","acceptedAnswer":{"@type":"Answer","text":"As many as you want. But only the top video with the maximum engagement will be counted."}},{"@type":"Question","name":"How are the winners chosen?","acceptedAnswer":{"@type":"Answer","text":"The decision throughout the 6 months will be taken by giving equal consideration to the engagement rate \nand judges' choice."}},{"@type":"Question","name":"What is engagement Rate?","acceptedAnswer":{"@type":"Answer","text":"The addition of likes, views, follows, shares, downloads give us the engagement rate of the participant."}},{"@type":"Question","name":"How many videos do I need to upload to be eligible for the contest?","acceptedAnswer":{"@type":"Answer","text":"Each month has two Hipi Stunner challenges. You need to upload at least one video for each challenge \nusing #HipiStunner to be eligible for that month."}},{"@type":"Question","name":"How will I get my cash prize?","acceptedAnswer":{"@type":"Answer","text":"Once the winner’s name is announced, our team will get in touch with you and will take all your details & \nstart the process. Once the process starts it may take about a month for the cash prize to reach you."}},{"@type":"Question","name":"Can I submit more than 1 entry?","acceptedAnswer":{"@type":"Answer","text":"We always welcome overachievers. While you can submit more than one entry for each challenge, only \nthe video with the highest engagement rate will be counted."}},{"@type":"Question","name":"Who can I reach out to if I have a query?","acceptedAnswer":{"@type":"Answer","text":"You can drop in your questions at contact@hipi.co.in , send a WhatsApp message to +91 9966044412 or \nscroll down to the contact form below.\nContact form:\nTell us your queries\nWe’ll get back to you in 24 hours\nName*:\nYour question:\nEmail*:\nPhone No.*:\nSubmit"}}]}
    // const viewAction = {
    //     "@context": "https://schema.org",
    //     "@type":"InteractionCounter",
    //     "interactionType":{"@type":"http://schema.org/LikeAction"},
    //     "userInteractionCount":''},
    //     {"@type":"InteractionCounter",
    //     "interactionType":{"@type":"http://schema.org/FollowAction"},
    //     "userInteractionCount":}]},"width":,"height":,"interactionStatistic":[{"@type":"InteractionCounter","interactionType":{"@type":"http://schema.org/WatchAction"},"userInteractionCount":},{"@type":"InteractionCounter","interactionType":{"@type":"http://schema.org/LikeAction"},"userInteractionCount":},{"@type":"InteractionCounter","interactionType":{"@type":"http://schema.org/ShareAction"},"userInteractionCount":}],"comment":{"@type":"Comment","comment":[]}}
    
    const newsroomArticleSchemma = ({url, headline, datePublished, description}) => {
      return {
        "@context": "https://schema.org/",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        },
        "headline": headline,
        "description": description,
        "author": {
          "@type": "Organization",
          "name": "Hipi"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Hipi",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.hipi.co.in/icons/Logo_hipi.png",
            
          }
        },
        "datePublished": datePublished
      }
    }

    const theEditArticleSchema = ({url, headline, description, author, datePublished, type="NewsArticle"}) =>  ({
      "@context": "https://schema.org/",
      "@type": type,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "headline": headline,
      "description": description,
      "image": {
        "@type": "ImageObject",
        "url": "https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1659024507/hipi/videos/244c5c18-f508-4abc-9fa2-74a437623051/244c5c18-f508-4abc-9fa2-74a437623051_00.webp",
        "width": "",
        "height": ""
      },
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hipi",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.hipi.co.in/icons/Logo_hipi.png",
          "width": "",
          "height": ""
        }
      },
      "datePublished": datePublished
    });

    const theEditVideoSchema = ({name, description, uploadDate, contentUrl, embedUrl, thumbnailUrl}) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": name,
      "description": description,
      "thumbnailUrl": thumbnailUrl,
      "uploadDate": uploadDate,
      "contentUrl": contentUrl,
      "embedUrl": embedUrl,
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": { "@type": "WatchAction" },
        "userInteractionCount": 2000
      }
      
    })

    const theEditOrganizationalSchema = {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      name: "Hipi",
      url: "https://www.hipi.co.in/",
      logo: "https://www.hipi.co.in/icons/Logo_hipi.png",
      sameAs: [
        "https://en.m.wikipedia.org/wiki/HiPi_(App)",
        "https://www.instagram.com/hipiofficialapp/?hl=en",
        "https://www.facebook.com/HiPiOfficialApp",
        "https://www.hipi.co.in/",
        "https://twitter.com/HiPiOfficialApp",
        "https://www.youtube.com/channel/UCXEcEOyCcXzEU4UCLtBL6SQ",
      ],
    };
    
    const faqRewards = {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity":[
         {
            "@type":"Question",
            "name":"How can I participate in Hipi Rewards Program?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"You will need to install Hipi android app on your phone and sign-up. If you already have an account with Hipi, you can directly login using your account on Hipi app. Once signed up or logged in, you would be eligible to earn rewards."
            }
         },
         {
            "@type":"Question",
            "name":"When will Hipi Rewards Program be live?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"Hipi Rewards Program will be live from 26th Sep to 28th Sep 2022. It would be opened again in the future from time to time."
            }
         },
         {
            "@type":"Question",
            "name":"Can I participate in Hipi Rewards Program on Hipi website or iPhone app?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"Hipi Rewards Program is currently available only on Hipi android app."
            }
         },
         {
            "@type":"Question",
            "name":"How do I earn reward coins when I achieve a level?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"Once you achieve a level, you will see the level as ‘Unlocked’ on the ‘Jackpot’ screen on the app. You will see an option to spin a wheel and win reward coins."
            }
         },
         {
            "@type":"Question",
            "name":"How many reward coins would I earn when I spin a wheel?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"You will earn reward coins from one of the following denominations:\n50, 25, 15, 10, 5, 0 (Better Luck Next Time)\n"
            }
         },
         {
            "@type":"Question",
            "name":"Where can I check my balance for reward coins?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"You can view your reward coins balance in the ‘Reward Coins’ screen on the app."
            }
         },
         {
            "@type":"Question",
            "name":"How can I keep track of reward coins I have earned?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"You can check the history of reward coins earned and redeemed on the ‘Reward Coins History’ section of the ‘Reward Coins’ screen on the app."
            }
         },
         {
            "@type":"Question",
            "name":"How can I redeem my reward coins?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"You can cash out reward coins by clicking on ‘Redeem Coins’ button on the ‘Reward Coins’ screen on the app."
            }
         },
         {
            "@type":"Question",
            "name":"Where will I receive the money from redeeming my reward coins?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"You will need to add and verify your mobile number linked to your PayTM account for withdrawal. In case you don’t have a PayTM account, please create one before redeeming your reward coins."
            }
         },
         {
            "@type":"Question",
            "name":"What is the conversion rate from reward coins to INR?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"Currently, 1 reward coin = Rs 1"
            }
         },
         {
            "@type":"Question",
            "name":"Is there a minimum balance required to redeem reward coins?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"You need a minimum balance of 50 reward coins to redeem."
            }
         },
         {
            "@type":"Question",
            "name":"Can I redeem reward coins to my bank account?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"Currently, reward coins can only be cashed out to PayTM wallet. "
            }
         },
         {
            "@type":"Question",
            "name":"How much time does it take to receive the amount into PayTM wallet?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"Cashed out rewards coins will reflect in your PayTM wallet in the next 5-7 business days."
            }
         },
         {
            "@type":"Question",
            "name":"Is there an expiry period for reward coins?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"Rewards coins will expire automatically 30 days after they have been earned. Thus, reward coins should be redeemed within 30 days."
            }
         },
         {
            "@type":"Question",
            "name":"How can I reach out for any other queries or issues?",
            "acceptedAnswer":{
               "@type":"Answer",
               "text":"For any queries, you can email us at contact@hipi.co.in"
            }
         }
      ]
   }

  export  {
      websiteSchema,
      organisationSchema,
      videoSchema,
      breadcrumbSchema,
      personSchema,
      newsroomArticleSchemma,
      theEditArticleSchema,
      theEditVideoSchema,
      theEditOrganizationalSchema,
      singleVideoSchema,
      pageSchema,
      faqRewards
  }