/*eslint-disable react/display-name */

import { Back } from '../commons/svgicons/back';
import { withRouter } from 'next/router';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Error from './error';
import Loading from './loader';
import { useState } from 'react';
import Img from '../commons/image';
import dynamic from 'next/dynamic';
//import fallbackUsers from '../../../public/images/users.png';
import useDrawer from '../../hooks/use-drawer';
import detectDownload from '../open-in-app'
import { numberFormatter } from '../../utils/convert-to-K';
import { getItem } from '../../utils/cookie';

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loading />);

const AppBanner = dynamic(
  () => import('../app-banner'),
  {
    loading: () => <div />,
    ssr: false
  }
);


function UserList({router}) {
  const [items, setItems] = useState({})
  const {ref} =  router?.query;
  const {show} = useDrawer();
  const device = getItem('device-info');

  const transformResponse = (data) =>{  
    const feedData = data?.filter((content) => (content.widgetName === `${ref}`));
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

  const[ShowAppBanner, setShowAppBanner]=useState(false);
  const notNowClick=()=>{
    setShowAppBanner(false)
  }

  return (
    <ComponentStateHandler
    state={fetchState}
    Loader={LoadComp}
    ErrorComp={ErrorComp}
  >
    <div>
      <div className="headbar w-full flex h-16 shadow-md bg-white items-center p-4 justify-center">
        <div onClick={()=>router?.back()} className="absolute left-2 h-16 top-0 flex items-center">
          <Back />
        </div>
        <div className="font-bold">{items?.widgetName}</div>
      </div>
     
     <div className="w-full flex flex-col p-4">
     {items?.widgetList?.map((data,id)=>(
        <div key={id} className="user_card flex justify-between py-2 "> 
          <div onClick={()=> router && router?.push(`/@${data?.user?.userName}`)} className="flex">
            <div className=" w-15v flex h-15v bg-gray-300 relative rounded-full overflow-hidden">
              <Img data={data?.user?.profilePicImgUrl}  alt='image' fallback={'/images/users.png'}/>
              </div>
            <div className="flex flex-col justify-between pl-4 pb-2 max-w-45v">
              <p className="font-medium text-base text-gray-700 w-full truncate">{data?.user?.userName} </p>
              <p className="text-sm text-gray-400 w-full truncate">{data?.user?.firstName}{' '}{data?.user?.lastName}</p>
              <p className="text-sm text-gray-400 w-full truncate">{numberFormatter(data?.user?.followers)} Followers</p>
            </div>
          </div>
          <div onClick={()=>{
            device === 'ios' &&  show('', detectDeviceModal, 'extraSmall');
            device==='android' && setShowAppBanner(true)}} className="flex items-center">
            <button  className="font-semibold text-sm border border-hipired rounded-sm py-1 px-5 mr-1 bg-hipired text-white">
              Follow
            </button>
          </div>
        </div>))}
      </div>    
    </div>
    {device === 'android' && ShowAppBanner ? <AppBanner notNowClick={notNowClick}/>:''}
    </ComponentStateHandler>
  );
}
export default withRouter(UserList);
