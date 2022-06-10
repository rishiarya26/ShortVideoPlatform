import { useEffect, useRef, useState } from "react";
import { canShop } from "../../../sources/can-shop";
import { getCharms } from "../../../sources/charmboard";
import Img from "../../commons/image"
import Delete from "../../commons/svgicons/delete";
import Expand from "../../commons/svgicons/expand";
import Tabs from "../../commons/tabs/charmboard-tab";
import CharmCard from "../card";
import CharmCardBeauty from "../card/beauty";
import { useInView } from "react-intersection-observer";
import CharmCardRecipe from "../card/recipe";
import { getItem } from "../../../utils/cookie";
import { localStorage } from "../../../utils/storage";
import Less from "../../commons/svgicons/less";

const CharmPreview = ({charmId, initalExpand = true, charms, loader, savedItems = null, comp, videoId, getSavedMoments,onExpandToggle,id, expands,
   deleteFilteredSavedItem, idToScroll}) =>{
 const [items, setItems] = useState({});
 const [loading, setLoading] = useState(loader);
 const [topCharms, setTopCharms] = useState(null);
 const [expand, setExpand] = useState(false);
 const [selectedIndex, setSelectedIndex] = useState(null);
 const [firstScroll, setFirstScroll] = useState(true);

 const itemsPresent = items && (items?.outfit?.length > 0 || items?.accessories?.length > 0 ||
  items?.beauty?.length > 0 || items?.hair?.length > 0 || items?.recipe?.length > 0)

 const outfitRef = useRef(null);
 const accRef = useRef(null);
 const beautyRef = useRef(null);
 const hairRef = useRef(null);
 const recipeRef = useRef(null);

 let scrollRefs = useRef(null);

   const [outfit, inViewOutfit] = useInView({
     threshold: 0.1
   });
   const [acc, inViewAcc] = useInView({
     threshold: 0.1
   });
   const [beauty, inViewBeauty] = useInView({
      threshold: 0.1
    });
    const [hair, inViewHair] = useInView({
      threshold: 0.1
    });
    const [recipe, inViewRecipe] = useInView({
      threshold: 0.1
    });
    
 const executeScroll = (selected, index) =>{
   selected?.current?.scrollIntoView();
   setTimeout(()=>{
      console.log("clicked **",index)
      setSelectedIndex(index);
   },[100]) 
}   

 const getCharmsData = async() =>{
     try{
      const response =  await getCharms({charmId});
      if(response?.data){
         setItems(response.data);
         const initalTabIndex = response?.data &&
          response.data?.outfit?.length > 0 ? 0 :
          response.data?.accessories?.length > 0 ? 1 :
          response.data?.beauty?.length > 0 ? 2 :
          response.data?.hair?.length > 0 ? 3 : 
          response.data?.recipe?.length > 0 && 4;
          console.log("intial",initalTabIndex);
          setSelectedIndex(initalTabIndex);
      }
      setLoading(false); 
     }catch(e){
      console.log('error in charms data',e);
      setLoading(false);
     }
   }

    useEffect(()=>{
       savedItems ? setItems(savedItems) :  getCharmsData();
      setTopCharms(charms)
      console.log('ading-inside',charms, items,topCharms, charmId);

     comp === 'normal' &&  setExpand(charms?.expand);
  setTimeout(()=>{
        //  window.scrollTo(0, scrollRefs?.current?.offsetTop);
        scrollRefs && scrollRefs?.current?.scrollIntoView({behavior: "smooth" , block:'center'})
                  setFirstScroll(false);
        // scrollRefs?.current?.[idToScroll]?.current?.scrollIntoView({ behavior: "smooth" });
      },[1000])
    //  window.onload(()=>{
    //   // setTimeout(()=>{
    //     //  window.scrollTo(0, scrollRefs?.current?.offsetTop);
    //     scrollRefs && scrollRefs?.current?.scrollIntoView({behavior: "smooth" })
    //               // setFirstScroll(false);
    //     // scrollRefs?.current?.[idToScroll]?.current?.scrollIntoView({ behavior: "smooth" });
    //   // },[1000])
    //  },[1000])
    },[])

    // useEffect(()=>{
    //  scrollRefs.current && (scrollRefs = undefined)
    // },[scrollRefs])

    useEffect(()=>{
      expand && getCharmsData();
    },[expand])

    useEffect(()=>{
      console.log("expand changed",charms?.expand)
      comp === 'normal' &&  setExpand((charms?.expand));
     },[charms?.expand])

    // useEffect(()=>{
    //    console.log("expand changed",charms?.expand)
    //    comp === 'normal' &&  setExpand((charms?.expand));
    //   },[charms?.expand])

    useEffect(()=>{
      items &&  console.log("charms",items)
      },[items])

    const selectTab = () =>{
       let result = [];
       if(items?.outfit?.length > 0){
         result[0] = 'Outfit';
       }
       if(items?.accessories?.length > 0){
         result[1] = 'Accessories';
       }
       if(items?.beauty?.length > 0){
         result[2] = 'Beauty';
       }
       if(items?.hair?.length > 0){
         result[3] = 'Hair';
       }
       if(items?.recipe?.length > 0){
         result[4] = 'Recipe';
       }
      return result;
    }

    const tabItems = {
       display : selectTab()
   }
    const onTabChange=(selected)=>{
        const scrollToElemant = {
           0 : outfitRef,
           1 : accRef,
           2 : beautyRef,
           3 : hairRef,
           4 : recipeRef
        }
       executeScroll(scrollToElemant?.[selected],selected);
    }

    const onScroll = () => {
      console.log(inViewOutfit, inViewAcc, inViewBeauty, inViewHair, inViewRecipe)
       if(!inViewAcc && !inViewBeauty && !inViewHair && !inViewRecipe && inViewOutfit){
          setSelectedIndex(0);
       }
       else if( !inViewBeauty && !inViewHair && !inViewOutfit && !inViewRecipe && inViewAcc){
         setSelectedIndex(1);
       }
       else if(  !inViewHair && !inViewOutfit && !inViewAcc && !inViewRecipe && inViewBeauty){
         setSelectedIndex(2);
       }
       else if( !inViewBeauty  && !inViewOutfit && !inViewAcc && !inViewRecipe && inViewHair){
         setSelectedIndex(3);
       }
       else if( !inViewBeauty  && !inViewOutfit && !inViewAcc && !inViewHair && inViewRecipe){
         setSelectedIndex(4);
       }
    };

    const deleteSavedItems =()=>{
      const userId = localStorage.get('user-id') || getItem('guest-token'); 
      const savedData = localStorage?.get(`saved-items${userId}`) || {videoIds : [], savedItems:[]}
      const videoIds = savedData?.videoIds;
      let savedItems = savedData?.savedItems; 
     if(videoIds?.length > 0){  
      let originalVideoId;

      let filteredSavedItems = [...savedItems];
      //extract video Id 
         filteredSavedItems?.forEach(( item ) =>{
           if(item.charm_id === charms.charm_id){
              originalVideoId = item?.originalVideoId;
           }
         });
        console.log('original id ***',originalVideoId);
      //delete item object
          filteredSavedItems  = filteredSavedItems?.filter(( item ) =>{
            return item.charm_id !== charms.charm_id;
          });

      //check video id present for other charm object    
      let videoIdPresent = false;
      filteredSavedItems.map((item)=>{
          if(item.originalVideoId === originalVideoId){
            videoIdPresent = true;

          } 
      })
       
      //delete video Id
      if(!videoIdPresent){
         const index = videoIds.indexOf(originalVideoId);
         console.log('to delete index for video',originalVideoId,index, videoIds)
         if(index !== -1){
            videoIds?.splice(index,1);
         }
      }  
          console.log('after del',videoIds, filteredSavedItems)
          const savedMoments = {}
          savedMoments.videoIds = videoIds;
          savedMoments.savedItems = filteredSavedItems;
      
          localStorage.set(`saved-items${userId}`,savedMoments);
          deleteFilteredSavedItem && deleteFilteredSavedItem();
         getSavedMoments &&  getSavedMoments();
      
        }
    }

    const deleteButton = {
       'normal' : '',
       'saved' : <div onClick={deleteSavedItems} className='flex flex-col items-center ml-2'>
                   <Delete/>
                   {/* <p className='text-xs'>Delete</p> */}
                 </div>
    }

    const getOrigin =(url)=>{
      console.log("URL",url)
       if(!url){
         return ''
       }else{
        const origin = url.split('//')[1];
        let finalOrigin = ''
        if(origin?.includes('www')){
          finalOrigin = origin.split('.')[1]
        }else{
          finalOrigin = origin.split('.')[0]
        }
        console.log('origin **',finalOrigin)
        if(finalOrigin){
          return finalOrigin 
        }
       }
    }

    return(
    <>
  {!loading ? itemsPresent ?  <div onScroll={onScroll} className={expand ? `charmpre flex flex-col relative shadow-md w-full px-2 items-center justify-between my-3 py-2 overflow-y-auto` : `charmpre flex flex-col relative shadow-md w-full px-2 items-center justify-between my-3 py-2`}>
         {/* Head charm */}
         <div className="flex w-full items-center justify-between">
            <div className="flex pb-2">
               <div className='img w-15v h-15v rounded-md overflow-hidden'>
                   <Img data={topCharms?.imageUrl} />
               </div>
              <div className=' products w-70vr flex flex-col ml-2'>
                  <div className=' charm_title whitespace-nowrap capitalize  font-semibold text-xs mb-1'>{`${topCharms?.subtitle} | ${topCharms?.title}`}</div>
                  <div className="flex w-full justify-between items-center">
                  <div className='h-10v'>
                  {!expand && 
                     <Img data={topCharms?.content_image_url}/>
                   }
                   </div>
                   <div className='cta flex px-2'>
               <div onClick={()=>{
                 onExpandToggle(charmId);
                setExpand(!expand);
               }} className='flex flex-col items-center'>
                  
                 {expand ?  <Less/> :
                  <Expand/>}
               </div>
               {deleteButton?.[comp]}
            </div>
                   </div>
               </div>
            </div>
            
         </div>
         {expand && <div className='sticky  w-full -top-4 py-2 bg-gray-100 z-20 text-sm text-gray-200 border-gragit y-100 border-b-2'> <Tabs items={tabItems} onTabChange={onTabChange} selectedIndex={selectedIndex}/> </div>}
         {expand && 
         <div className="w-full" ref={outfitRef}>
         <div ref={outfit} id='outfit'>
        {(items?.outfit?.length > 0 || items?.accessories?.length > 0) && <div className="text-xs w-full text-gray-500 pt-2">STYLE INSPIRATION FROM THIS LOOK</div>} 
            {items && items?.outfit?.map((item,id) =>{
              console.log("ading-final",item?.card_id, idToScroll,3935255)
         return <div key={id} className={`${idToScroll}`} ref={idToScroll ?(firstScroll && (item?.card_id  === idToScroll) ? scrollRefs : undefined): undefined} id={item?.card_id}>
           <CharmCard 
             key = {id}
             id={item?.card_id}
             thumbnail = {item?.product_img_url}
             title = {item?.title}
             shopName = {item?.product_url ? getOrigin(item?.product_url): ''}
             shopLink = {item?.product_url}
             shopNameImg={item?.camp_img_url || null}
             ribbonData={item?.card_labels || []}
             category = {item?.category}
         />
         </div>
        })}
         </div>
         </div>
         }
         {expand &&
         <div className="w-full" ref={accRef}>
         <div ref={acc} id={'acc'} >
           {items && items?.accessories?.map((item, id) =>(
          <div key={id} className={`${idToScroll}`} ref={idToScroll ?(firstScroll && (item?.card_id  === idToScroll) ? scrollRefs : undefined): undefined} id={item?.card_id}>
         <CharmCard 
             key = {id}
             id={item?.card_id}
             thumbnail = {item?.product_img_url}
             title = {item?.title}
             shopName = {item?.product_url ? getOrigin(item?.product_url): ''}
             shopLink = {item?.product_url}
             shopNameImg={item?.camp_img_url || null}
             ribbonData={item?.card_labels || []}
             category = {item?.category}
         />
         </div>
         ))}
         </div>
         </div>
         }
      {expand &&  
       <div ref={beautyRef}>
       <div ref={beautyRef}>  
       <div ref={beauty}>
        {items && items?.beauty?.length > 0 && 
        <div className='flex flex-col w-full my-4' >
        <div className="text-xs  text-gray-500 py-2">HOW TO GUIDE TO GET THIS MAKEUP</div>
            <div className='flex bg_beauty beauty-header pt-2 relative w-full'>
               <div className="flex w-25v h-25v">
               <Img data={topCharms?.imageUrl} />
               </div>
               <div className="flex flex-col pl-4 justify-center">
                  <div className="text-md  uppercase font-bold text-white mb-2">
                     {items?.beauty?.[0]?.heading}
                  </div>
                  <div className="text-sm font-medium text-white ">
                     GET THE LOOK IN EASY STEPS
                  </div>
               </div>
         </div>
         </div>
          }
          {expand && items && items?.beauty?.map((item, id) =>(
            id>0 && 
            <div key={id} className={`${idToScroll}`} ref={idToScroll ?(firstScroll && (item?.card_id  === idToScroll) ? scrollRefs : undefined): undefined} id={item?.card_id}>
            <CharmCardBeauty 
             key={id}
             id={item?.card_id}
             thumbnail =  {item?.product_rounded_img_url || null}
             title = {item?.title}
             shopName = {(item?.product_url ?  getOrigin(item?.product_url): '')}
             shopNameImg={item?.camp_img_url || null}
             shopLink = {item?.product_url}
             ribbonData={item?.card_labels || []}
             category = {item?.category}
             subTitle = {item?.sub_title}
             heading = {item?.heading}
             thumbnailProduct ={item?.product_img_url}
             index={id}
         />
         </div>
          ))}
         </div>
         </div>
         </div>
           }

        {expand &&  
        <div ref={hairRef}>
        <div ref={hair}>
         {items && items?.hair?.length > 0 && <div  className='flex flex-col w-full my-4' >
         <div  className="text-xs text-gray-500 py-2">HOW TO GUIDE TO GET THIS HAIRDO</div>
         <div className='flex bg_hair hair-header relative w-full pt-2'>
            <div className="flex w-25v h-25v">
            <Img data={topCharms?.imageUrl} />
            </div>
            <div className="flex flex-col pl-4 justify-center">
               <div className="text-md uppercase font-semibold text-white mb-1">
                  {items?.hair?.[0]?.heading}
               </div>
               <div className="text-sm font-medium text-white ">
                  GET THE HAIRDO IN EASY STEPS
               </div>
            </div>
         </div>
         </div>
          } 
          
          {expand && items && items?.hair?.map((item, id) =>(
             id > 0 && 
             <div key={id} className={`${idToScroll}`} ref={idToScroll ?(firstScroll && (item?.card_id  === idToScroll) ? scrollRefs : undefined): undefined} id={item?.card_id}>
             <CharmCardBeauty 
             key={id}
             id={item?.card_id}
             thumbnail = {item?.product_rounded_img_url ? item?.product_rounded_img_url :  item?.product_img_url}
             title = {item?.title}
             shopName = {item?.product_url ? getOrigin(item.product_url): ''}
             shopLink = {item?.product_url}
             shopNameImg={item?.camp_img_url || null}
             ribbonData={item?.card_labels || []}
             category = {item?.category}
             subTitle = {item?.sub_title}
             heading = {item?.heading}
             thumbnailProduct = {item?.product_rounded_img_url ? item?.product_img_url : null}
             index={id}
           />
           </div>
          ))}
        </div>
        </div>
        }

      {expand &&  
        <div className="w-full" ref={recipeRef}>
        <div className="w-full" ref={recipe}>
          {expand && items && items?.recipe?.map((item, id) =>(
          <div key={id} className={`${idToScroll}`} ref={idToScroll ?(firstScroll && (item?.card_id  === idToScroll) ? scrollRefs : undefined): undefined} id={item?.card_id}>
          <CharmCardRecipe 
             key={id}
             id={item?.card_id}
             thumbnail = {item?.product_img_url}
             title = {item?.title}
             shopName = {item?.title}
             shopLink = {item?.product_url}
             category = {item?.category}
             subTitle = {item?.sub_title}
             heading = {item?.heading}
             thumbnailProduct = {item?.product_rounded_img_url}
             index={id+1}
             ribbonData={item?.card_labels || []}
           />
           </div>
          ))}
        </div>
        </div>
        }
         {/* Head charm end*/}
       
      </div>: 
      <></>
      // <div onClick={()=>{
      //    getCharmsData();
      //    setLoading(true);
      // }}>Error</div> 
      :
       <div className='justify-center items-center h-full'>loading...</div>}

    </>    
    )
}

export default CharmPreview;
  
  