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
  
  const breadcrumbSchema = ({name, userHandle}) => {
     const payload = {  
      "@context":"https://schema.org/",
      "@type":"BreadcrumbList",
      "itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"Thing","@id":"https://www.hipi.co.in/","name":"Hipi"}},
      {"@type":"ListItem",
      "position":2,
      "item":{"@type":"Thing",
      "@id":`https://www.hipi.co.in/${userHandle}`,
      "name":`${name} (${userHandle}) | Hipi`}}]}
    return payload;
    }
 
 const videoSchema = ({name='video',userThumnail='video',desc='video', videoId='video',view, createdOn='video'})=>{
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