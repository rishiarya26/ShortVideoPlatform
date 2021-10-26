
import debounce from "lodash.debounce";
import { useState } from "react";
import { getUserFollowing, toFollow } from "../../sources/users/profile";
import ComponentStateHandler, { useFetcher } from "../commons/component-state-handler";
import SearchFollowers from "../search-followers";
import Error from "./error";
import Loader from "./loader";
import fallbackUser from "../../../public/images/users.png"
import Img from "../commons/image";
import { useRouter } from "next/router";


const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loader />);

async function search(userId, searchTerm, setItems) {
    /* eslint-disable no-param-reassign */
        try{
          const response = await getUserFollowing({ id: userId, type: 'Follower', keyword: searchTerm }); 
          if(response.status === 'success'){
              setItems(response?.data?.followers)
          }
          }
        catch(e){
           console.log("filter error",e)
          }
  }
  
  const optimisedSearch = debounce(search, 400);

  function FollowersDetail({userId, refreshUserProfile}){
    const [searchTerm, setSearchTerm] = useState('');
    const [items,setItems] = useState([]);
    const [refreshList, setrefreshList] = useState(0);

    const router = useRouter();

    const onTermChange=(term)=>{
        optimisedSearch(userId,term, setItems);
        setSearchTerm(term);
     }
     const onDataFetched = data => {
      const followingList = data?.data?.followers;
      setItems(followingList);
      }

     const dataFetcher = () => getUserFollowing({ id: userId, type: 'Follower' });
     let [fetchState, retry, data] = useFetcher(dataFetcher, onDataFetched, refreshList);

     const followUser = async(followerId, follow) =>{
      const response = await toFollow({ userId:followerId,followerId:userId,follow:follow});
      if(response){
        setTimeout(async function(){ 
            // await refreshUserProfile();
            setrefreshList(refreshList+1)
        }, 500);
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
        <div key={id} className="user_card flex justify-between py-2 px-4 "> 
          <div onClick={()=>router?.push(`/profile/${data?.id}`)} className="flex">
            <div className=" w-15v flex h-15v bg-gray-300 relative rounded-full overflow-hidden">
              <Img data={data?.profilePic}  alt='image' fallback={fallbackUser?.src}/>
              </div>
            <div className="flex flex-col justify-between pl-4 pb-2">
              <p className="text-sm text-gray-400">{data?.firstName}{' '}{data?.lastName}</p>
              <p className="font-medium text-base text-gray-700">{`@${data?.userHandle}`} </p>
            </div>
          </div>
          <div className="flex items-center">
         {data?.follow === true ? 
           <button onClick={()=>followUser(data?.id, false)} className="font-semibold text-sm border border-gray rounded-sm py-1 px-5 mr-1  text-black">
              Following
            </button> :
            <button onClick={()=>followUser(data?.id, true)}  className="font-semibold text-sm border border-hipired rounded-sm py-1 px-5 mr-1 bg-hipired text-white">
              Follow
          </button>}
          </div>
        </div>))}
        </div>
        </ComponentStateHandler>
    )
}

export default FollowersDetail;