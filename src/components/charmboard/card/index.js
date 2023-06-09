import { useEffect, useState } from "react";
import { toTrackClevertap } from "../../../analytics/clevertap/events";
import { toTrackMixpanel } from "../../../analytics/mixpanel/events";
import useIntersect from "../../../hooks/use-intersect";
import { appsflyerPixelClick, appsflyerPixelImp } from "../../../sources/appsflyer-pixel";
import CardRibbon from "../../card-ribbon";
import Img from "../../commons/image"
import Info from "../../commons/svgicons/info";

const CharmCard = ({thumbnail, title, shopName, shopLink, category,
   shopNameImg,ribbonData,id, actualPrice, salePrice, productName,pageName, tabName,videoId,
   productIdChange, dominantColor,
   onProductChange, campaignId,appsflyerId, iosAppsflyerId, mainCategory, subCategory, subSubCategory, lingerieCard, sponsored=null}) =>{

  
      useEffect(()=>{
               // console.log('uuu')
               let productUrl = shopLink?.includes("utm_source") ? `${shopLink}&utm_platform=web` : shopLink;
               productIdChange === id && console.log('A******',campaignId, appsflyerId)
         productIdChange === id && toTrackMixpanel('shoppingProductImp',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId:appsflyerId, productUrl})
         // productIdChange === id && appsflyerId && appsflyerPixelImp({advertiser:shopName, appId:appsflyerId,productId:id, comp:'Shop'})
         if(productIdChange === id && appsflyerId){
            try{
             const response = appsflyerPixelImp({ advertiser:shopName, appId:appsflyerId, productId:id, comp:'Shop', mixpanelProperties:{pageName:pageName, tabName:tabName, id:id,shopName:shopName,productName:productName,videoId:videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId:appsflyerId}})
            }catch(e){
            }
            }
         productIdChange === id && toTrackClevertap('shoppingProductImp',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, productUrl})
      },[productIdChange])


      const onProductInView =(entry)=>{
         if(entry?.isIntersecting){
            id !== productIdChange && onProductChange(id);
         }
       }
         const [outfitProductRef] = useIntersect({
           callback: onProductInView,
           rootMargin: '50px',
           threshold: [0.65, 0.65]
           });  

        const onProductClick= ()=>{
         let productUrl = shopLink?.includes("utm_source") ? `${shopLink}&utm_platform=web` : shopLink;
         toTrackMixpanel('shoppableProductClicked',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId:appsflyerId,productUrl})  
         toTrackClevertap('shoppableProductClicked',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId,productUrl})  
         const appsflyerLink = appsflyerId ? appsflyerPixelClick({ advertiser:shopName, appId:appsflyerId, iosAppId: iosAppsflyerId, uri:shopLink,productId:id,comp:'Shop'}) : null;
         console.log("finalLink",appsflyerLink)
         const shopLinkUpdate = shopLink?.includes("utm_source") ? `${shopLink}&utm_platform=web` : shopLink;
         window?.open(appsflyerLink || shopLinkUpdate)
        }  

const lingerieComp = <div ref={outfitProductRef} id={id} className="flex flex-col my-4 shadow-md">
<div className="w-full overflow-hidden relative">
         <CardRibbon ribbonData={ribbonData}/>
         <Img data={thumbnail}/>
               <div className="absolute bottom-4 min-h-28 w-full left-0">
               <p className="font-medium text-center protip_font px-8">{title}</p>
               
      </div>
</div>
</div> 

return(
<>
{/* Card div */}
{lingerieCard ? lingerieComp :
   <div ref={outfitProductRef} id={id} className="flex flex-col my-4 shadow-md">
   <div onClick={onProductClick} style={{backgroundColor: `${dominantColor}7a` || "gray"}}  className="w-full overflow-hidden relative min-h-49v">
   <CardRibbon ribbonData={ribbonData}/>
   {sponsored === 1 && <div className="absolute flex items-center text-white font-medium text-sm bg-gray-600 opacity-70 rounded-sm p-1 top-4 left-4">
      <p className="pr-1">Promoted</p>
      <Info/>
   </div>}
      <Img data={thumbnail}/> 
      {/* <img src="https://assets.charmboard.com/images/w_375,ar_0.75,c_fill,c_pad,q_auto:eco,e_sharpen/im/lk/3857657/3857657.jpg"/> */}
   </div>
   <div className="flex w-full justify-between p-4 items-center">
      <div className="flex flex-col w-full">
         <p className="text-xs text-gray-600">{title}</p>
        {sponsored === 1 && <div className="flex justify-between ites-center w-full pt-2">
            <div className="flex items-center">
               {shopNameImg ? <div className="max-h-12 ad_logo"><Img data={shopNameImg}/></div> :
                <p className="text-sm font-semibold capitalize line-clamp-1 max-w-50v">{shopName}</p>
               }
            </div>
            <div className="flex items-center">
            {actualPrice >0 && <p className='text-gray-400 pl-2 pr-2  text-sm'>{`${' '}`}<del>{` ${' '} ₹${actualPrice || ''}`}</del></p>}
               {salePrice >0 && <p className='text-gray-700 text-sm'>{`${' '} ₹${salePrice || ''}`}</p>}
            <div onClick={onProductClick} className="flex px-4 py-2 pr-0">
               <div className="flex rounded w-20 max-h-8 justify-center py-2 px-2 bg-hipired text-xs font-semibold text-white">BUY NOW</div>
            </div>
            </div>
         </div>}
      </div>
   </div>
</div>
}

{/* Card div end*/}
</>    
)
}
export default CharmCard;