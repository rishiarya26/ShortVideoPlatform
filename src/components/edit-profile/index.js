import Link from "next/link";
import { withRouter } from "next/router";
import { getUserProfile } from "../../sources/users/profile";
import ComponentStateHandler, { useFetcher } from "../commons/component-state-handler";
import { Back } from "../commons/svgicons/back";
import Error from "./error";
import Loader from "./loader";

const ErrorComp = () => (<Error  />);
const LoadComp = () => (<Loader />);


const EditProfile =({router})=>{
console.log(router)
const userId = router?.query?.id;
console.log(userId)
const dataFetcher = () => getUserProfile(userId);
let [fetchState, retry, data] = useFetcher(dataFetcher);
let userData = data?.data;

const handleBackClick = () => {
    router.back();
  };
  
 
return(
    <ComponentStateHandler
    state={fetchState}
    Loader={LoadComp}
    ErrorComp={ErrorComp}
    >
    <div>
    <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-between">
    <div onClick={handleBackClick} className="p-4 h-full flex items-center justify-center">
    <Back/>
    </div>
    <div className="font-bold">Edit Profile</div>
    </div>
    <div className="header flex w-full flex-col items-center pt-7 pb-2">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img src={userData?.profilePic} alt="PP" className="object-cover" />
          </div>
          <p className="font-medium p-2 text-sm">Change photo</p>
        </div>
    </div>
    <div className="relative">
        <div className="flex relative m-20 ">
            <div className="mr-2">Name</div>
            <Link href={`/edit/${userId}?field=name`}>
            <div className="">{`${userData?.firstName} ${userData?.lastName}`}</div>
            </Link>
        </div>
        <div className="flex relative m-20">
            <div className="mr-2">Username</div>
            <Link href={`/edit/${userId}?field=userHandle`}>
            <div className=" ">{userData?.userName}</div> 
            </Link>
        </div>
        <div className="flex relative m-20 ">
            <div className="mr-2">Bio</div>
            <Link href={`/edit/${userId}?field=bio`}>
            <div className="">{userData?.bio}</div>
            </Link>
        </div>
    </div>
 </div>
 </ComponentStateHandler>
)
}

export default withRouter(EditProfile);