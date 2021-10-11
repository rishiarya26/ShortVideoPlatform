import { Back } from '../commons/svgicons/back';
import { withRouter } from 'next/router';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Error from './error';
import Loading from './loader';
import { useState } from 'react';
import Img from '../commons/image';
import dynamic from 'next/dynamic';
import fallbackUsers from '../../../public/images/users.png';

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loading />);

function UserList({router}) {
  const [items, setItems] = useState({})
  const {ref} =  router?.query

  const transformResponse = (data) =>{  
    const feedData = data.filter((content) => (content.widgetName === `${ref}`));
    const [tData = {}] = feedData;
    return tData;
  }

  const dataFetcher = () => JSON.parse(window?.sessionStorage.getItem('searchList'));
  const onDataFetched = data => {
    const tData = transformResponse(data)
    data && setItems(tData);
  };

  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;

  return (
    <ComponentStateHandler
    state={fetchState}
    Loader={LoadComp}
    ErrorComp={ErrorComp}
  >
    <div>
      <div className="headbar w-full flex h-16 shadow-md bg-white items-center p-4 justify-center">
        <div onClick={()=>router.back()} className="absolute left-2 h-16 top-0 flex items-center">
          <Back />
        </div>
        <div className="font-bold">{items?.widgetName}</div>
      </div>
     
     <div className="w-full flex flex-col p-4">
     {items?.widgetList?.map((data,id)=>(
        <div key={id} className="user_card flex justify-between py-2 "> 
          <div onClick={()=>router.push(`/profile/${data?.user?.id}`)} className="flex">
            <div className=" w-15v flex h-15v bg-gray-300 relative rounded-full overflow-hidden">
              <Img data={data?.user?.profilePicImgUrl}  alt='image' fallback={fallbackUsers?.src}/>
              </div>
            <div className="flex flex-col justify-between pl-4 pb-2">
              <p className="font-medium text-base text-gray-700">{data?.user?.userName} </p>
              <p className="text-sm text-gray-400">{data?.user?.firstName}{' '}{data?.user?.firstName}</p>
              <p className="text-sm text-gray-400">{data?.user?.followers} Followers</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-5 mr-1 bg-hipired text-white">
              Follow
            </button>
          </div>
        </div>))}
      </div>    
    </div>
    </ComponentStateHandler>
  );
}
export default withRouter(UserList);
