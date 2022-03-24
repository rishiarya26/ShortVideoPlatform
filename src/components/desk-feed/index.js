/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/display-name */
import { useCallback, useEffect, useRef, useState } from 'react';
import DeskVideo from '../desk-video';
import Error from './error';
import Loading from './loader';
import { getHomeFeed, getHomeFeedWLogin } from '../../sources/feed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import CloseSolid from "../commons/svgicons/close-solid";
import Search from "../commons/svgicons/search";
import { withBasePath } from '../../config';
import useAuth from '../../hooks/use-auth';
import {FixedSizeList} from "react-window"
import { withRouter } from 'next/router';
import Card from '../desktop/card'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Video from '../desk-video';
import Mute from "../commons/svgicons/mute";
import MusicBlack from "../commons/svgicons/music-black";
import Comment from "../commons/svgicons/comment-black"
import Like from "../commons/svgicons/like-black";
import Share from "../commons/svgicons/share-black";
import dynamic from 'next/dynamic';
import useDrawer from '../../hooks/use-drawer';
import { localStorage } from '../../utils/storage';

SwiperCore?.use([Mousewheel]);

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

 function DeskFeed({ router }) {
  const [items, setItems] = useState([]);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [muted, setMuted] = useState(true)
  const [fetchState, setFetchState] = useState('pending');

  const { id = 'for-you' } = router?.query;

  const {show} = useDrawer();

  const login = dynamic(
    () => import('../auth-options'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

  // const showLoginOptions = () => {
  //   show('', login, 'medium');
  // };

//   const onDataFetched = (data) => {
//     setLoadingMoreItems(true);
//     // console.log("isreloaded value", JSON.parse(sessionStorage.getItem("is_reloaded")))
//     // if (JSON.parse(sessionStorage.getItem("is_reloaded"))) {
//     //     console.log('reloaded present');
//     // }
//     // sessionStorage.setItem(JSON.stringify("is_reloaded"), id || 0)
//     // let initalData = [];
//         if (data?.data?.length > 0) {
//             console.log("fresh data",data.data);
//             setItems(data?.data);
//             setLoadingMoreItems(false);
//             // initalData = data?.data;
//             // localStorage.set('desk-feed', data?.data);
//         } else {
//           setLoadingMoreItems(false);
//             // initalData = [];
//         }
// }

// useEffect(()=>{
//   console.log(items);
// },[items])

  // selecting home feed api based on before/after login
  const dataFetcher = () => getHomeFeed({ type: id});
  const dataFetcherWLogin = () => getHomeFeedWLogin({ type: id});

  const fetchData =  useAuth(dataFetcher,dataFetcherWLogin);

  useEffect(()=>{console.log("items changed to - ",items)},[items])

  useEffect(()=>{
    getInitialData();
  },[])

  const getInitialData = async() =>{
    setLoadingMoreItems(true);
    let updateItems = [...items];
    console.log('present items',updateItems);
     try{
       const data = await fetchData({ type: id });
       console.log('GOT MORE ITEMS *****', data?.data)
       if(data?.data?.length > 0){
        updateItems = updateItems.concat(data?.data);
        //  setOffset(offset+1)
         console.log('appended',updateItems);
         setItems(updateItems);
         setFetchState('success')
       }
       setLoadingMoreItems(false);
      }
     catch(err){
      setFetchState('fail')
      setLoadingMoreItems(false);
     }
    // }
  } 
  const getFeedData = async() =>{
    setLoadingMoreItems(true);
    let updateItems = [...items];
    console.log('present items',updateItems);
     try{
       const data = await fetchData({ type: id });
       console.log('GOT MORE ITEMS *****', data?.data)
       if(data?.data?.length > 0){
        updateItems = updateItems.concat(data?.data);
        //  setOffset(offset+1)
         console.log('appended',updateItems);
         setItems(updateItems);
       }
       setLoadingMoreItems(false);
      }
     catch(err){
      setLoadingMoreItems(false);
     }
    // }
  } 

  useEffect(()=>{console.log("id changed",id)},[id]);

  // let [fetchState, retry, data] = useFetcher(dataFetcher, onDataFetched, id);

  // useEffect(()=>{
  //   if(fetchState === 'success'){
  //     const feedData = data && data?.data;
  //     setItems(feedData);
  //   }
  // },[fetchState])
  // const Item = useCallback(({data : items, index, style})=>{
  //   console.log('index',index, items, items?.[index])
  //   const {userName, likesCount, music_title,userProfilePicUrl, video_url,firstFrame} = items?.[index] || {}

  //   return(
  //   <div style={style}>
  //      <Video
  //      userName={userName}
  //      likesCount={likesCount} 
  //      music_title={music_title}
  //      userProfilePicUrl={userProfilePicUrl}
  //      url={video_url}
  //      firstFrame={firstFrame}
  //      />
  //     </div>
  //   )
  // },[])

  const observer = useRef();

const lastItemInView = useCallback((node)=>{
  if(loadingMoreItems) return;
  observer.current = new IntersectionObserver(enteries =>{
       if(enteries[0]?.isIntersecting){
        getFeedData();
       }
  });
  if(node) observer?.current?.observe(node);
},[loadingMoreItems])

const unMute = (value)=>{
  setMuted(false);
}

  return (
  <>

<div className="flex flex-col w-screen h-screen items-center">
   <div className="w-full flex bg-white drop-shadow-lg border-b-2 border-gray-200 items-center justify-center">
   <div className="w-3/4  h-20 flex bg-white items-center px-6 justify-between">
      <div className="w-20">
      <img  src={withBasePath('icons/Logo_hipi.png')} />
      </div>

      <div>
         <div className="flex bg-gray-100 rounded-full py-2 px-6 items-center relative">
            <div>
            {/* <input className="w-56 bg-gray-100" type="search" value="" placeholder="Search accounts and videos " /> */}
            </div>
            <div className="ml-4">
               <CloseSolid/>
            </div>

            <div className=" ml-4 w-px h-8 bg-gray-300">

            </div>
            <div className="pl-4">
               <Search/>
            </div>
         </div>
      </div>
      <div>
      <img alt="profile-pic" className="usrimg w-8 h-8 rounded-full  mr-4" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />
      </div>
      </div> 
   </div>


   <div className="flex h-screen  bg-white justify-center relative overflow-hidden  w-3/4">
      <div className="w-4/12 flex flex-col p-4">
         <div className="flex flex-col pb-6 border-b-2 border-gray-200">
               <p className="font-semibold text-lg py-2 pl-4">For You </p>
               <p className="font-semibold text-lg py-2 pl-4">Following </p>
               <p className="font-semibold text-lg py-2 pl-4">Explore </p>
         </div>
         <div className="flex flex-col pb-6 border-b-2 border-gray-200">
               <p className="font-semibold text-lg py-2 pl-4">Log in to follow creators, like videos, and view comments.</p>
               <button 
                 onClick={() =>show('', login, 'big')} 
                 className="font-semibold text-lg py-2 pl-4">
                   Log in
               </button>
         </div>
      </div>
        {/* <ComponentStateHandler
            state={fetchState}
            Loader={LoadComp}
            ErrorComp={ErrorComp}
          > */}
      { fetchState === 'success' ? 
      <div className="w-8/12 flex flex-col overflow-scroll no_bar">
        {/* {items && items?.length > 0 && <FixedSizeList
        height={700}
        width={500}
        position= 'relative'
        itemSize={600}
        itemCount={items.length}
        itemData={items}
        >
           {Item}
        </FixedSizeList>} */}
        {items && items?.length > 0  && items.map((item,id)=>
       ( id !== items?.length-1 ? 
          <Video
          key={id}
          userName={item?.userName}
          likesCount={item?.likesCount} 
          music_title={item?.music_title}
          userProfilePicUrl={item?.userProfilePicUrl}
          url={item?.video_url}
          firstFrame={item?.firstFrame}
          muted={muted}
          unMute={unMute}
          firstName={item?.firstName}
          lastName={item?.lastName}
          description={item?.content_description}
          />
        
      :
         <span key={id} ref={lastItemInView}>
          <Video
          userName={item?.userName}
          likesCount={item?.likesCount} 
          music_title={item?.music_title}
          userProfilePicUrl={item?.userProfilePicUrl}
          url={item?.video_url}
          firstFrame={item?.firstFrame}
          muted={muted} 
          unMute={unMute}
          firstName={item?.firstName}
          lastName={item?.lastName}
          description={item?.content_description}
      />
      </span>
            ))}

      {loadingMoreItems && <div className='m-5'>Loading....</div>}         
      </div> 
      :
      fetchState === 'pending' ? 
      <LoadComp/> : 
      fetchState === 'fail' && <ErrorComp/> 
      }
      {/* </ComponentStateHandler> */}
   </div>
</div>
          </>
          
  );
}

export default withRouter(DeskFeed);