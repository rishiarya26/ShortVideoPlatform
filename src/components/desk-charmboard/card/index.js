import CardRibbon from "../../card-ribbon";
import Img from "../../commons/image"
import Arrow from "../../commons/svgicons/arrow-red";
const CharmCard = ({thumbnail, title, shopName, shopLink, category,shopNameImg,ribbonData,actualPrice, salePrice}) =>{
return(
<>
{/* Card div */}
<div className="flex flex-col my-4 shadow-md ">
      <div onClick={()=> window?.open(shopLink)} className="w-full overflow-hidden cursor-pointer relative">
      <CardRibbon ribbonData={ribbonData}/>
      <Img data={thumbnail}/> 
      {/* <img src="https://assets.charmboard.com/images/w_375,ar_0.75,c_fill,c_pad,q_auto:eco,e_sharpen/im/lk/3857657/3857657.jpg"/> */}
   </div>
   <div className="flex w-full justify-between p-4 items-center">
      <div className="flex flex-col w-full">
         <p className="text-xs text-gray-600 ">{title}</p>
         <div className="flex justify-between ites-center w-full pt-2">
            <div className="flex items-center">
            {shopNameImg ? <div className="max-h-12 ad_logo"><Img data={shopNameImg}/></div> :
                <p className="text-sm font-semibold capitalize line-clamp-1 max-w-50v">{shopName}</p>
               } 
                  
                          </div>
         <div className="flex items-center">
                          {actualPrice > 0  && <p className='text-gray-400 pl-2 pr-2 text-sm'>{`${' '}`}<del>{` ${' '} ₹${actualPrice || ''}`}</del></p>}
                          {salePrice > 0 && <p className='text-gray-700 text-sm'>{`${' '} ₹${salePrice || ''}`}</p>}
            <div onClick={()=>
               window?.open(shopLink)} className="flex pl-4 py-2 ">
               <div className="flex rounded w-20 max-h-8 justify-center py-2 px-2 bg-hipired text-xs font-semibold text-white cursor-pointer">BUY NOW</div>
            </div>
            </div>
         </div>
      </div>
   </div>
</div>
{/* Card div end*/}
</>    
)
}
export default CharmCard;