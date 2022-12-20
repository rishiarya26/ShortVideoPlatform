/*eslint-disable react/display-name */

import debounce from "lodash.debounce";
import { useState, useEffect } from "react";
import { getUserFollowing, getUserProfile, toFollow } from "../../sources/users/profile";
import ComponentStateHandler, { useFetcher } from "../commons/component-state-handler";
import SearchFollowers from "../search-followers";
import Error from "./error";
import Loader from "./loader";
import fallbackUser from "../../../public/images/users.png"
import Img from "../commons/image";
import { useRouter } from "next/router";
import detectDeviceModal from "../open-in-app"
import useDrawer from "../../hooks/use-drawer";
import dynamic from 'next/dynamic';
import { getItem } from "../../utils/cookie";

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loader />);

const AppBanner = dynamic(
  () => import('../app-banner'),
  {
    loading: () => <div />,
    ssr: false
  }
);

async function search(userId,searchTerm,setItems) {
    /* eslint-disable no-param-reassign */
        try{
          const response = await getUserFollowing({ id: userId, type:'Following' , keyword: searchTerm}); 
          if(response.status === 'success'){
            setItems(response?.data?.following)
          }
          }
        catch(e){
           console.log("filter error",e)
          }
  }
  
  const optimisedSearch = debounce(search, 400);

  export const FollowingDetail = ({userId, refreshUserProfile}) =>{
    const [searchTerm, setSearchTerm] = useState('');
    const [items,setItems] = useState([]);
    const [refreshList, setrefreshList] = useState(0);
    const [showAppBanner, setShowAppBanner] = useState(false)
    
    const {show} = useDrawer();
    const device = getItem('device-info');
  
    async function showPopUp() {
      device === 'ios' && show('', detectDeviceModal, 'extraSmall');
      device === 'android' && setShowAppBanner(true)
  }

  useEffect(() => {
    if(window?.outerHeight > document?.body?.clientHeight) return;
    const lastItem = document?.querySelector(".lastItem");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.map((entry) =>{
        if(entry.isIntersecting) {
          showPopUp();
        }
      })
    })
    if(lastItem){
      observer.observe(lastItem);
    }
    return () => lastItem && observer.observe(lastItem);
  }, [items])

    const router = useRouter();
    
    const notNowClick = ()=>{
      setShowAppBanner(false);
    }

    const onTermChange=(term)=>{
        optimisedSearch(userId,term,setItems);
        setSearchTerm(term)
     }
     const onDataFetched = data => {
      const followingList = data?.data?.following;
      setItems(followingList);
      }

     const dataFetcher = () => getUserFollowing({ id: userId, type:'Following' });
     let [fetchState, retry, data] = useFetcher(dataFetcher, onDataFetched, refreshList);

     const unFollowUser = async(followerId) =>{
      try{
         const response = await toFollow({ userId:followerId,followerId:userId,follow:false});
         console.log("success",response)
         if(response){
            setTimeout(async function(){ 
                await refreshUserProfile();
                setrefreshList(refreshList+1)
            }, 500);
        } 
        }catch(error){
          console.log('follow api error',error)
        }
      }

    return(
        <ComponentStateHandler
        state={fetchState}
        Loader={LoadComp}
        ErrorComp={ErrorComp}
      >
        <div>
        <SearchFollowers searchTerm={searchTerm} onTermChange={onTermChange}/>
        {items?.map((data,id)=>(
        <div key={id} className={`user_card flex justify-between py-2 px-4 ${id === items.length -1 ? "lastItem" : ""}`}> 
          <div onClick={()=> router && router?.push(`/@${data?.userHandle}`)} className="flex">
            <div className=" w-15v flex h-15v bg-gray-300 relative rounded-full overflow-hidden">
              <Img data={data?.profilePic}  alt='image' fallback={fallbackUser?.src}/>
              </div>
            <div className="flex flex-col justify-between pl-4 pb-2 max-w-45v">
              <p className="text-sm text-gray-400 w-full truncate">{data?.firstName}{' '}{data?.lastName}</p>
              <p className="font-medium text-base text-gray-700 w-full truncate">{`@${data?.userHandle}`} </p>
            </div>
          </div>
          {/* <div className="flex items-center">
            <button onClick={()=>unFollowUser(data?.id)}  className="font-semibold text-sm border border-gray rounded-sm py-1 px-5 mr-1  text-black">
              Following
            </button>
          </div> */}
        </div>))}
        </div>
        {device==='android' && showAppBanner ? <AppBanner notNowClick={notNowClick}/>:''}
        </ComponentStateHandler>
    )
}