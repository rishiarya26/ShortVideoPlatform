import { useEffect, useState } from "react";
import Img from "../../commons/image";
import Arrow from "../../commons/svgicons/arrow-red";
import fallbackImg from '../../../../public/images/fallback-charms.png'
import CardRibbon from "../../card-ribbon";
import { toTrackMixpanel } from "../../../analytics/mixpanel/events";
import useIntersect from "../../../hooks/use-intersect";
import { appsflyerPixelClick, appsflyerPixelImp } from "../../../sources/appsflyer-pixel";
import { toTrackClevertap } from "../../../analytics/clevertap/events";

const CharmCardBeauty = ({thumbnail, title, shopName,shopNameImg, shopLink, category, heading, subTitle, thumbnailProduct, index, ribbonData, actualPrice, salePrice,
    productIdChange,onProductChange,pageName,tabName,id,productName,videoId, campaignId,appsflyerId, iosAppsflyerId, mainCategory, subCategory, subSubCategory
}) =>{
 
       useEffect(()=>{
          productIdChange === id && toTrackMixpanel('shoppingProductImp',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, category, subCategory, subSubCategory, mainCategory})
          productIdChange === id && appsflyerId && appsflyerPixelImp({ advertiser:shopName, appId:appsflyerId, productId:id, comp:'Shop'})
          productIdChange === id && toTrackClevertap('shoppingProductImp',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId})
       },[productIdChange])
 
       const onProductInView =(entry)=>{
          if(entry?.isIntersecting){
             id !== productIdChange && onProductChange(id);
          }
        }
          const [beautyProductRef] = useIntersect({
            callback: onProductInView,
            rootMargin: '100px',
            threshold: [0.85, 0.85]
            });  
 
         const onProductClick= ()=>{
          toTrackMixpanel('shoppableProductClicked',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId, category, subCategory, subSubCategory, mainCategory})  
          toTrackClevertap('shoppableProductClicked',{pageName:pageName, tabName:tabName},{productId:id,brandName:shopName,productName:productName,content_id:videoId, campaignId})  
          const appsflyerLink = appsflyerId ? appsflyerPixelClick({ advertiser:shopName, appId:appsflyerId, iosAppId: iosAppsflyerId, uri:shopLink,productId:id,comp:'Shop'}) : null;
          window?.open(appsflyerLink || shopLink)
         }   
    const [show, setShow] = useState(false);

    return(
    <>
           {/* Card div */}
           <div ref={beautyProductRef} className="flex flex-col w-full my-4 shadow-md">
            <div className={category === 'beauty' ? "flex head_bg bg_beauty w-full h-14 ":
             "flex head_bg bg_hair w-full h-14 "
             }>
                <div className="heading w-1/2 flex items-center px-2">
                <span className={category === 'beauty' ? "numb-beauty mr-2 ":
             "numb-hair mr-2"
             }>{index}</span>   
                    <p className="text-md text-white pl-1 leading-5 line-clamp-2"> {heading}</p>
                </div>
            </div>
           
           <div className="flex relative w-full">
           <CardRibbon ribbonData={ribbonData}/>
               <div className="flex w-1/2">
               {thumbnail && <Img data={thumbnail}  fallback={fallbackImg?.src}/> }
               </div>
                {thumbnailProduct ? 
                <div onClick={()=> {
                    onProductClick()
                    window?.open(shopLink)}} 
                    className="py-2 product absolute -top-10 max-h-72 h-72 right-0 w-1/2 flex items-center bg-white pt-10 p-6">
                  <Img data={thumbnailProduct} fallback={fallbackImg?.src}/>
                </div> : 
                <div className="py-2 product absolute -top-10 max-h-72 h-72 right-0 w-1/2 flex items-center bg-white pt-10 p-6">
                  <p className="text-xs px-2 h-44 text-gray-600">{title && title}</p>
                </div>}
               {/* <img src="https://assets.charmboard.com/images/w_375,ar_0.75,c_fill,c_pad,q_auto:eco,e_sharpen/im/lk/3857657/3857657.jpg"/> */}
           </div>
           <div className="flex w-full justify-between p-4 items-center">
                <div className="flex flex-col w-full">
                    {(thumbnail && thumbnailProduct) &&
                    <p className="text-xs text-gray-600">{subTitle && subTitle}</p>
                  
                    }
                   {thumbnail && thumbnailProduct &&  <div className="flex flex-col items-start text-xs text-gray-600 p-2 bg-gray-100 w-fit  mt-1">
                   <button className=" text-black" onClick={()=>setShow(!show)}>{!show ? '▼ Show step' : '▲ Hide step'}
                    </button>
                            {show && <p className="pt-1">{title && title}</p>}
                            </div>}
  {(thumbnail && thumbnailProduct) && <div className="flex justify-between ites-center w-full pt-2">
                        <div className="flex items-center">
                        {shopNameImg  ?<div className="max-h-12 ad_logo"> <Img data={shopNameImg}/> </div>:
                        <p className="text-sm font-semibold capitalize line-clamp-1 max-w-50v">{shopName}</p>}
                         
                        </div>
                        <div className="flex items-center">
                        {actualPrice > 0 && <p className='text-gray-400 pl-2 pr-2  text-sm'>{`${' '}`}<del>{` ${' '} ₹${actualPrice || ''}`}</del></p>}
                          {salePrice > 0 && <p className='text-gray-700 text-sm'>{`${' '} ₹${salePrice || ''}`}</p>}
                        <div onClick={onProductClick} className="flex px-4 py-2 ">
                            <div className="flex rounded w-20 max-h-8 justify-center py-2 px-2 bg-hipired text-xs font-semibold text-white">BUY NOW</div>
                        </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
        {/* Card div end*/}
    </>    
    )
}

export default CharmCardBeauty;