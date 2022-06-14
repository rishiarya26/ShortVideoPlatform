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
    "logo": "https://www.hipi.co.in/icons/Logo_hipi.png"
  }

  const personSchema = {
      "@context":"https://schema.org/",
      "@type":"Person",
      "name":"Palak Puswani",
      "description":"",
      "alternateName":" Palak Puswani ",
      "mainEntityOfPage":{"@type":"ProfilePage",
      "@id":" https://www.hipi.co.in/@Palakpurswani"
  }}
  
  const breadcrumbSchema = {
      "@context":"https://schema.org/",
      "@type":"BreadcrumbList",
      "itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"Thing","@id":"https://www.hipi.co.in/","name":"Hipi"}},
      {"@type":"ListItem",
      "position":2,
      "item":{"@type":"Thing",
      "@id":"https://www.hipi.co.in/@Palakpurswani",
      "name":"Palakpurswani (@Palakpurswani) | Hipi"}}]}
 
 const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Palak Purswani on Hipi | Palak Purswani Short Videos on Hipi",
        "description": "Palak Purswani on Hipi. Check out latest trending videos from Palak Purswani on Hipi. Download the App Now!",
        "thumbnailUrl": "",
        "uploadDate": "",  
        "publisher": {
          "@type": "Organization",
          "name": "Purswani",
          "logo": {
            "@type": "ImageObject",
            "url": "https://akamaividz2.zee5.com/image/upload/v1645511006/hipi/assets/user/5175653f-f480-4bed-955f-c841d7784ddd/5175653f-f480-4bed-955f-c841d7784ddd.jpg",
            "width": '',
            "height": ''
          }
        },
        "contentUrl": "https://www.hipi.co.in/video/18c3b535-2806-4e7b-b9e0-1bafb308397d",
        "potentialAction": {
          "@type": "SeekToAction",
          "target": "https://www.hipi.co.in/video/18c3b535-2806-4e7b-b9e0-1bafb308397d={seek_to_second_number}",
          "startOffset-input": "required name=seek_to_second_number"
        }
      }

    // const viewAction = {
    //     "@context": "https://schema.org",
    //     "@type":"InteractionCounter",
    //     "interactionType":{"@type":"http://schema.org/LikeAction"},
    //     "userInteractionCount":''},
    //     {"@type":"InteractionCounter",
    //     "interactionType":{"@type":"http://schema.org/FollowAction"},
    //     "userInteractionCount":}]},"width":,"height":,"interactionStatistic":[{"@type":"InteractionCounter","interactionType":{"@type":"http://schema.org/WatchAction"},"userInteractionCount":},{"@type":"InteractionCounter","interactionType":{"@type":"http://schema.org/LikeAction"},"userInteractionCount":},{"@type":"InteractionCounter","interactionType":{"@type":"http://schema.org/ShareAction"},"userInteractionCount":}],"comment":{"@type":"Comment","comment":[]}}
      
  export  {
      websiteSchema,
      organisationSchema,
      videoSchema,
      breadcrumbSchema,
      personSchema
  }