/*eslint-disable @next/next/no-img-element*/
import Close from '../commons/svgicons/close-black'
import CharmPreview from './preview';
import { useEffect, useState } from 'react';
import { canShop } from '../../sources/can-shop';
import Tabs from '../commons/tabs/charmboard-maintab';
import { localStorage } from '../../utils/storage';
import { getItem } from '../../utils/cookie';
import useDrawer from '../../hooks/use-drawer';

function Charmboard({videoId, setClose }) {
const [charms, setCharms] = useState(null)   
const [selectedIndex, setSelectedIndex] = useState(0);
const [savedItems, setSavedItems] = useState([])
const [filteredItem, setFilteredItem] = useState(null);
const [filteredSavedItem, setFilteredSavedItem] = useState(null);

const {close} = useDrawer();
const getTopCharms = async() =>{
   if(!charms){
      try{
         if(videoId){
            const resp = await canShop({videoId});
            setCharms(resp);
            resp.charmData[0].id = 0;
            setFilteredItem(resp.charmData[0])
         }
      }catch(e){
         console.log(e)
      }
   }
}

useEffect(()=>{getSavedMoments()},[])

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

const onExpandToggle = (index)=>{
   const tempCharms = {...charms};
   tempCharms?.charmData?.forEach((item,id)=>{
      if(id === index){
         item.expand = !(item?.expand);
      }
  })
  const itemToPush = tempCharms?.charmData?.filter((item,id)=>{ 
   if(item.expand === true){
      item.id = id
   }  
   return (item.expand === true)
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

const compToShow = {
   0 :  <>
   {filteredItem ?
    <CharmPreview key={filteredItem.id} id={filteredItem.id}  onExpandToggle ={ onExpandToggle}charmId = {filteredItem?.charm_id} charms={filteredItem} initalExpand={false} loader={false} comp='normal'/>
    :
    charms?.charmData?.map((item,id)=>(
      <CharmPreview key={id} id={id}  onExpandToggle ={ onExpandToggle}charmId = {item?.charm_id} charms={item} initalExpand={false} loader={false} comp='normal'/>
     ))
}     
     </>,
   
   1 : <>
    {filteredSavedItem ?
    <CharmPreview key={filteredSavedItem.id} id={filteredSavedItem.id}  onExpandToggle ={ onSavedExpandToggle}charmId = {filteredSavedItem?.charm_id} charms={filteredSavedItem} initalExpand={false} loader={false} comp='saved'
    deleteFilteredSavedItem={deleteFilteredSavedItem}/>
    :
    savedItems && savedItems?.map((item,id)=>(
       <CharmPreview key={item?.charm_id} id={item?.charm_id} charmId = {item?.charm_id} charms={item} initalExpand={false} loader={false} onExpandToggle={onSavedExpandToggle} comp='saved' videoId={videoId}
       getSavedMoments={getSavedMoments}/> 
    ))}
    </>
}

const onClose =()=>{
   close();
   setClose && setClose('close');
}

return (
<div className='flex flex-col w-25v thin_bar overflow-scroll'>
   {/* <div onClick={onClose} className='flex justify-end p-2'>
      <Close/>
   </div> */}
   <Tabs items={tabItems} onTabChange={onTabChange} selectedIndex={selectedIndex}/>
   <div className='flex w-full flex-col pb-6'>
   {compToShow?.[selectedIndex]}
   </div>

</div>
);
}
export default Charmboard;