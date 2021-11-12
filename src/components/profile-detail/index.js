/*eslint-disable react/jsx-key */
import { withRouter } from "next/router";
import { useEffect, useState } from "react"
import { getUserProfile } from "../../sources/users/profile";
import { Back } from "../commons/svgicons/back";
import Tabs from "../commons/tabs/search-tabs"
import FollowersDetail from "../followers-detail";

import { FollowingDetail } from "../following-detail";


 function ProfileDetail ({router}){
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [profileDetails, setProfileDetails] = useState({})

    const { id } = router?.query;
    const {type} = router?.query;

    const toShow = {
        followers : 1,
        following : 0
    }

    const refreshUserProfile = async() =>{
        console.log("p",id)
        try{
         if(id)
         {    console.log("pp",id)
             const userDetails = await getUserProfile(id);
          setProfileDetails(userDetails?.data);
         }
        }catch(error){
            console.log("error",error)
        }}
      
    const components = [
        <FollowingDetail userId={id} refreshUserProfile={refreshUserProfile} />,
        <FollowersDetail userId={id} refreshUserProfile={refreshUserProfile}/>
    ]; 
  
   const items = {
     display : [`Following ${profileDetails?.following || ''}`,`Followers ${profileDetails?.followers || ''}`],
     defaultValue : selectedIndex
   }
  
   const onTabChange = (comp)=>{
     setSelectedIndex(comp)
   }

    useEffect(()=>{
        const selectedInd = selectedIndex;
        type && !((toShow[type]) === selectedInd ) && setSelectedIndex(toShow[type]);
        refreshUserProfile();
    },[])

   
    return(
        <div>
            <div className="sticky headbar w-full flex h-14 shadow-md bg-white items-center justify-center">
               <span className="flex absolute left-2 top-4" onClick={()=>router.back()}><Back/></span> 
                <div className="font-bold"> {profileDetails?.userHandle} </div>
            </div>
            <div className="-mt-16">
            <Tabs items={items} selectedIndex ={selectedIndex} onTabChange={onTabChange} />
            </div>
            {components[selectedIndex]}
        </div>
    )
}

export default withRouter(ProfileDetail);