/*eslint-disable @next/next/no-img-element*/
import Close from '../commons/svgicons/close-black'
import CharmPreview from './preview';
import { useEffect, useState } from 'react';
import { canShop } from '../../sources/can-shop';
import Tabs from '../commons/tabs/charmboard-maintab';
import { localStorage } from '../../utils/storage';
import { getItem } from '../../utils/cookie';
import useDrawer from '../../hooks/use-drawer';
import Loader from './loader';

function Charmboard({videoId, setClose, idToScroll }) {
const [charms, setCharms] = useState(null)   
const [selectedIndex, setSelectedIndex] = useState(0);
const [savedItems, setSavedItems] = useState([])
const [filteredItem, setFilteredItem] = useState(null);
const [filteredSavedItem, setFilteredSavedItem] = useState(null);
const [loading, setLoading] = useState(false);

const {close} = useDrawer();
const getTopCharms = async() =>{
   if(!charms){
      try{
         setLoading(true);
         if(videoId){
            const resp = await canShop({videoId});
            setCharms(resp);
            setLoading(false);
            resp.charmData[0].id = resp?.charmData?.[0]?.charm_id;
            setFilteredItem(resp.charmData[0])
      
         }
      }catch(e){
         setLoading(false);
         console.log(e)
      }
   }
}

useEffect(()=>{getSavedMoments()
   console.log('ading',idToScroll)
},[])

const getSavedMoments = () =>{
    const userId = localStorage.get('user-id') || getItem('guest-token');
    if(userId){
       const savedCards = localStorage.get(`saved-items${userId}`);
       if(savedCards){
         savedCards?.savedItems?.forEach((item)=>{
            item.expand = false;
            item.id = item?.charm_id;
         }) 
         setSavedItems(savedCards?.savedItems);
       }
    }
}

// useEffect(()=>{
//    console.log("***&&&****",savedItems)
// },[savedItems])

useEffect(()=>{
   fetchData?.[selectedIndex]();
},[selectedIndex])

useEffect(()=>{ fetchData?.[selectedIndex]()},[]);

const tabItems = {
   display : [`IN THIS VIDEO`, `SAVED MOMENTS`],
   number : [` ${charms?.charmData?.length || 0}`, ` ${savedItems?.length || 0}`]
}

const fetchData = {
   0 : getTopCharms,
   1 : getSavedMoments
}
const onTabChange=(selected)=>{
   setSelectedIndex(selected);
}

const onSavedExpandToggle = (index)=>{
   const tempCharms = [...savedItems];
   tempCharms?.forEach((item,id)=>{
      if(item?.id === index){
         item.expand = !(item?.expand);
      }
  })
  const itemToPush = tempCharms?.filter((item,id)=>{ 
   if(item.expand === true){
      item.id = item?.charm_id;
   }  
   return (item.expand === true)
   });
   if(itemToPush.length > 0){
       setFilteredSavedItem(itemToPush[0]);
   }else{
       setFilteredSavedItem(null);
  }
  setSavedItems(tempCharms);
}

const onExpandToggle = (charmId)=>{
   const tempCharms = {...charms};
   tempCharms?.charmData?.forEach((item,id)=>{
      if(item?.id === charmId){
         item.expand = !(item?.expand);
      }
  })
  const itemToPush = tempCharms?.charmData?.filter((item,id)=>{ 
   if(item.expand === true){
      item.id = charmId
   }
   return (item.expand === true);
   });
   console.log('expand-true',itemToPush)
   if(itemToPush.length > 0){
       setFilteredItem(itemToPush[0]);
   }else{
       setFilteredItem(null);
  }
  setCharms(tempCharms);
}

const deleteFilteredSavedItem = ()=>{
   setFilteredSavedItem(null);
   getSavedMoments();
}

// useEffect(()=>{
//    console.log("***&&))",filteredItem);
// },[setFilteredSavedItem])

const compToShow = {
   0 :  <>
   {
   filteredItem ?
    <CharmPreview key={filteredItem.id} id={filteredItem.id}  onExpandToggle ={ onExpandToggle}charmId = {filteredItem?.charm_id} charms={filteredItem} initalExpand={false} loader={false} comp='normal' idToScroll={idToScroll}/>
    :
    charms?.charmData?.map((item,id)=>(
      <CharmPreview key={id} id={id}  onExpandToggle ={ onExpandToggle} charmId = {item?.charm_id} charms={item} initalExpand={false} loader={false} comp='normal' idToScroll={idToScroll}/>
     ))
}     
     </>,
   
   1 : <>
    {filteredSavedItem ?
    <CharmPreview key={filteredSavedItem.id} id={filteredSavedItem.id}  onExpandToggle ={ onSavedExpandToggle}charmId = {filteredSavedItem?.charm_id} charms={filteredSavedItem} initalExpand={false} loader={false} comp='saved'
    deleteFilteredSavedItem={deleteFilteredSavedItem} idToScroll={idToScroll}/>
    :
    savedItems && savedItems?.map((item,id)=>{
       item.expand = false;
       return <CharmPreview key={id} id={item?.charm_id} charmId = {item?.charm_id} charms={item} initalExpand={false} loader={false} onExpandToggle={onSavedExpandToggle} comp='saved' videoId={videoId}
       getSavedMoments={getSavedMoments} idToScroll={idToScroll}/> 
   })}
    </>
}

const onClose =()=>{
   close();
   setClose && setClose('close');
}

return (
<div className='flex flex-col w-full'>
   <div onClick={onClose} className='flex justify-end p-2'>
      <Close/>
   </div>
   <Tabs items={tabItems} onTabChange={onTabChange} selectedIndex={selectedIndex}/>
   <div className='flex w-full flex-col pb-6 overflow-y-auto'>
   {compToShow?.[selectedIndex] }
   {/* {!loading ? compToShow?.[selectedIndex] 
    : (selectedIndex === 0 ? <Loader/> : selectedIndex === 1 && <LoaderSavedItems/>) 
     } */}
   </div>
</div>
);
}
export default Charmboard;