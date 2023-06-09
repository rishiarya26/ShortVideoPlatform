import { useEffect, useState } from "react";
import { toTrackClevertap } from "../../../analytics/clevertap/events";
import { toTrackMixpanel } from "../../../analytics/mixpanel/events";
import useIntersect from "../../../hooks/use-intersect";
import { appsflyerPixelClick, appsflyerPixelImp } from "../../../sources/appsflyer-pixel";
import CardRibbon from "../../card-ribbon";
import Img from "../../commons/image";
import Arrow from "../../commons/svgicons/arrow-red";

const CharmCardRecipe = ({thumbnail, title, shopName, shopLink, category, heading, subTitle, thumbnailProduct, index, ribbonData, actualPrice, salePrice,
    productIdChange,onProductChange,pageName,tabName,id,productName,videoId, shopNameImg, campaignId,appsflyerId, iosAppsflyerId, mainCategory, subCategory, subSubCategory, lingerieCard}) =>{
    useEffect(()=>{
        // console.log('uuu')
        // console.log('A******',productIdChange, id, appsflyerId)
        let productUrl = shopLink?.includes("utm_source") ? `${shopLink}&utm_platform=web` : shopLink;
        productIdChange && productIdChange === id && toTrackMixpanel('shoppingProductImp',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId:appsflyerId,productUrl})
        // productIdChange && productIdChange === id && appsflyerId && appsflyerPixelImp({ advertiser:shopName, appId:appsflyerId, productId:id, comp:'Shop'})
        if(productIdChange === id && appsflyerId){
            try{
             const response = appsflyerPixelImp({ advertiser:shopName, appId:appsflyerId, productId:id, comp:'Shop', mixpanelProperties:{pageName:pageName, tabName:tabName, id:id,shopName:shopName,productName:productName,videoId:videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId:appsflyerId}})
            }catch(e){
            }
            }
        productIdChange === id && toTrackClevertap('shoppingProductImp',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId,productUrl})
     },[productIdChange])

     const onProductInView =(entry)=>{
        if(entry?.isIntersecting){
           id !== productIdChange && onProductChange(id);
        }
      }
        const [recipeRef] = useIntersect({
          callback: onProductInView,
          rootMargin: '100px',
          threshold: [0.85, 0.85]
          });  

       const onProductClick= ()=>{
        let productUrl = shopLink?.includes("utm_source") ? `${shopLink}&utm_platform=web` : shopLink;
        toTrackMixpanel('shoppableProductClicked',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, category, subCategory, subSubCategory, mainCategory,appsflyerId:appsflyerId,productUrl})  
        toTrackClevertap('shoppableProductClicked',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId,productUrl})  
        const appsflyerLink = appsflyerId ? appsflyerPixelClick({ advertiser:shopName, appId:appsflyerId, iosAppId: iosAppsflyerId, uri:shopLink, productId:id, comp:'Shop'}) : null;
        console.log("finalLink",appsflyerLink)
        const shopLinkUpdate = shopLink?.includes("utm_source") ? `${shopLink}&utm_platform=web` : shopLink;
        window?.open(appsflyerLink || shopLinkUpdate);
       }   

       const lingerieComp = <div ref={recipeRef} id={id} className="flex flex-col my-4 shadow-md">
       <div className="w-full overflow-hidden relative">
         <CardRibbon ribbonData={ribbonData}/>
         <Img data={thumbnail}/>
               <div className="absolute bottom-4 min-h-28 w-full left-0">
               <p className="font-medium text-center protip_font px-8">{title}</p>
               
      </div>
</div>
      </div> 
   
    return(
    <>{/* Card div */}
    {lingerieCard ? lingerieComp :
    <div ref={recipeRef} className="flex flex-col w-full my-4 shadow-md">
        <div className="flex head_bg bg_hair w-full h-14 ">
            <div className="heading w-1/2 flex justify-center items-center">
                <p className="text-md text-white font-semibold px-2"><span className="numb-hair mr-2">{index}</span></p>
            </div>
        </div>
        <div className="flex relative w-full">
            <CardRibbon ribbonData={ribbonData}/>
            <div className="flex w-1/2 h-64">
                <Img data={thumbnailProduct}/>
            </div>
            <div onClick={()=>
                {onProductClick()}} className="py-2 product absolute -top-10 max-h-72 h-72 right-0 w-1/2 flex items-center bg-white pt-10 p-6">
                <Img data={thumbnail}/> 
            </div>
            {/* <img src="https://assets.charmboard.com/images/w_375,ar_0.75,c_fill,c_pad,q_auto:eco,e_sharpen/im/lk/3857657/3857657.jpg"/> */}
        </div>
        <div className="flex w-full justify-between p-4 items-center">
           <div className="flex flex-col w-full">
                <p className="text-xs text-gray-600">{subTitle}</p>
                 {campaignId?.length > 0 &&<div className="flex justify-between ites-center w-full pt-2">
                    <div className="flex items-center">
                        {shopNameImg  ? 
                        <div className="max-h-12 ad_logo"> <Img data={shopNameImg}/> </div>
                        :
                        <p className="text-sm font-semibold capitalize line-clamp-1 max-w-50v">{shopName}</p>
                        }  
                    </div>
                        <div className="flex items-center">
                            {actualPrice > 0 && 
                            <p className='text-gray-400 pl-2 pr-2  text-sm'>{`${' '}`}<del>{` ${' '} ₹${actualPrice || ''}`}</del></p>
                            }
                            {salePrice > 0 && 
                            <p className='text-gray-700 text-sm'>{`${' '} ₹${salePrice || ''}`}</p>
                            }                                             
                        </div>
                        <div onClick={onProductClick} className="flex px-4 py-2 pr-0">
                            <div className="flex rounded w-20 max-h-8 justify-center py-2 px-2 bg-hipired text-xs font-semibold text-white">BUY NOW</div>
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

export default CharmCardRecipe;