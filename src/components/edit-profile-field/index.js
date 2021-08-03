import {  withRouter } from "next/router";
import { useEffect, useState } from "react";
import { updateUserProfile } from "../../sources/users";
import useSnackbar from "../../hooks/use-snackbar"
import Error from "./error";
import Loader from "./loader";
import ComponentStateHandler, { useFetcher } from "../commons/component-state-handler";
import { getUserProfile } from "../../sources/users/profile";

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loader />);

const EditProfileField =({router})=>{
    const [data,setData] = useState({});

const info = {
    userHandle : "Username",
    bio:"Bio",
    name:"Name"
}

    const type = router?.query?.field;
    const userId = router?.query?.id;

    const {showSnackbar} = useSnackbar();

    const handleBackClick = () => {
        router.back();
      };

 const onValueChange =(e)=>{
    let updateData = {...data}
    const { id } = e?.currentTarget;
    const { value } = e?.currentTarget;
    updateData[id] = value;
     if(e.currentTarget.id === "name"){
       const [firstName, lastName] = e.currentTarget.value.split(' ');
       updateData.firstName = firstName;
       updateData.lastName = lastName;
     }
    setData(updateData);
}

const onDataFetched =(data)=>{
    setData(data.data);
}

const dataFetcher = () => getUserProfile(userId);
let [fetchState] = useFetcher(dataFetcher,onDataFetched);

const toUpdateValue =async()=>{
    let response;
    const payload = {
        "id":userId, 
        "profilePic":data?.profilePic, 
        "firstName":data?.firstName, 
        "lastName":data?.lastName, 
        "dateOfBirth":data?.dateOfBirth, 
        "userHandle":data?.userHandle, 
        "onboarding":null, 
        "profileType":null, 
        "bio":data?.bio
     }
    try{
        console.log(payload)
       response = await updateUserProfile(payload);
       console.log("edit-profile-comp", response)
       if(response.status === "success"){
        //    router.back();
              router.push(`/edit-profile/${response?.data?.id}`)
       }
    }
    catch(e){
        showSnackbar({message: "Something went wrong"})
    }
}
return(
    <ComponentStateHandler
    state={fetchState}
    Loader={LoadComp}
    ErrorComp={ErrorComp}
    >
    <div>
    <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-between">
    <div onClick={handleBackClick} className="p-4 h-full flex items-center justify-center">
    Cancel
    </div>
    <div className="font-bold">{info[type]}</div>
    <div onClick={toUpdateValue} className="font-bold">SAVE</div>
    </div>
    <div>Name</div>
    <div><input id={type} type="text" onChange={onValueChange}/></div>
    {/* <div className="relative">
        <div className="flex relative m-20 ">
            <div className="">Name</div>
            <div className="">{`${firstName} ${lastName}re`}</div>
        </div>
        <div className="flex relative m-20">
            <div className="">Username</div>
            <div className=" ">{userName}</div>
        </div>
        <div className="flex relative m-20 ">
            <div className="">Bio</div>
            <div className="">{bio}</div>
        </div>
    </div> */}
 </div>
 </ComponentStateHandler>
)
}

export default withRouter(EditProfileField);