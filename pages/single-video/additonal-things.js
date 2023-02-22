import { useEffect, useState } from "react";
import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import { singleBreadcrumbSchema, singleVideoSchema } from "../../src/utils/schema"
import { getCanonicalUrl } from "../../src/utils/web";

const AdditonalThings = ({videoUrl,item})=>{
    const [url, setUrl] = useState('')
    useEffect(()=>{setUrl(document?.location?.href)},[])
    return(
        <>
        {url && <SeoMeta
            data={{
              title: `${item?.content_description || ''} | ${item?.videoOwnersDetail?.firstName || ''} ${item?.videoOwnersDetail?.lastName || ''}’s Video on Hipi`,
              description: `${item?.likesCount} likes Watch trending Hipi videos from ${item?.videoOwnersDetail?.firstName || ''} ${item?.videoOwnersDetail?.lastName || ''} (@${item?.userName || ''}). Download the App Now!`,        
              canonical : url && getCanonicalUrl(url),
            }}
         />}
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(singleBreadcrumbSchema({name:`${item?.videoOwnersDetail?.firstName || ''} ${item?.videoOwnersDetail?.lastName || ''}`, videoId:item?.content_id, userHandle:item?.userName,})) }}
            />
         <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(singleVideoSchema({videoUrl : videoUrl,name:`${item?.videoOwnersDetail?.firstName || ''} ${item?.videoOwnersDetail?.lastName || ''}`, videoId:item?.content_id, userThumnail:item?.firstFrame, desc:item?.content_description, createdOn:item?.createdOn}))}}
            />
        </>
    )
}

export default AdditonalThings;