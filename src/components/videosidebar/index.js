/*eslint-disable react/no-unescaped-entities*/
/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/display-name */
// /*eslint-disable react/display-name */
import { withBasePath } from '../../config';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Like from '../commons/svgicons/like';
import Liked from '../commons/svgicons/liked';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Shop from '../commons/svgicons/shop';
import EmbedIcon from '../commons/svgicons/embedicon';
// import { share } from '../../utils/app';
// import { CopyToClipBoard } from '../../utils/web';
// import { getCurrentUri } from '../../utils/location';
// import { getDeviceType } from '../../hooks/use-device';
import useDrawer from '../../hooks/use-drawer';
// import useSnackBar from '../../hooks/use-snackbar';
// import { postLike, deleteLike } from '../../sources/social';
import useAuth from '../../hooks/use-auth';
import { ShareComp } from '../commons/share';
import useDialog from '../../hooks/use-dialog';
import CopyEmbedCode from '../copy-embed-code.js';
import useSnackbar from '../../hooks/use-snackbar';
import { share } from '../../utils/app';
import useDevice, { devices } from '../../hooks/use-device';
import fallbackUser from "../../../public/images/users.png"
import Img from '../commons/image';
import { numberFormatter } from '../../utils/convert-to-K';
import { deleteReaction, getActivityDetails, postReaction } from '../../get-social';
import { localStorage } from '../../utils/storage';
import { commonEvents } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';

// const DummyComp = () => (<div />);
// const CommentTray = dynamic(() => import('../comment-tray'), {
//   loading: () => <div />,
//   ssr: false
// });

const login = dynamic(
  () => import('../auth-options'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function VideoSidebar({
  socialId,
  type, profilePic, likes, videoOwnersId, handleSaveLook, saveLook, canShop, saved,
  profileFeed, videoId, toTrackMixpanel, videoActiveIndex, userName,activeVideoId,comp, pageName
}) {
  const [isLiked, setIsLiked] = useState({like : false, reactionTime : 'past'});
  const [reactionCount, setReactionCount] = useState({likes : likes});
  const { show } = useDrawer();

  const info = { desktop: 'desktop', mobile: 'mobile' };

  const value = useDevice(devices, [info.desktop, info.mobile]);


  const { showSnackbar } = useSnackbar();
  const { show: showDialog } = useDialog();
  const router = useRouter();
  // const { showSnackbar } = useSnackBar();

  const showLoginOptions = () => {
    show('', login, 'medium');
  };

  const like = () => {
     postReaction('like',socialId);
     setIsLiked({like : true});
     getVideoReactions(socialId, 'now', 'add');
     const mixpanelEvents = commonEvents();
     mixpanelEvents['UGC Id'] = activeVideoId;
    //  mixpanelEvents['Creator Id'] = videoOwnersId;
     const compName = comp === 'feed' ? 'Feed' : comp === 'profile' ? 'Profile Feed' : pageName === 'hashtag' ? 'Hashtag Feed' : 'Feed';
     mixpanelEvents['Page Name'] = compName;
     track('UGC Liked',mixpanelEvents)
  } 
  // show('', detectDeviceModal, 'extraSmall', {videoId: videoId && videoId});
  const comment = () => show('', detectDeviceModal, 'extraSmall', {videoId: videoId && videoId});
  
  const selectedLike = useAuth(showLoginOptions, like);
  const selectedComment = useAuth(showLoginOptions, comment);

  const handleOperation = (e) => {
    const options = {
      like : selectedLike,
      comment : selectedComment
    }
    const operation = e.currentTarget.id;
    options?.[operation]();
  };

  const handleProfileClick = () => {
    router?.push(`/@${userName}`);
  };

  const onEmbedCopy = () => {
    showSnackbar({ message: 'Copied to Clipboard' });
  };

  const getVideoReactions = async(socialId,time,action)=>{
    let isLiked;
    const details = await getActivityDetails(socialId);
    // console.log('like count',details.reactionsCount.like)
    if(time === 'now') {
      if(action === 'add'){
        setReactionCount({likes: details?.reactionsCount?.like+1 || likes+1})
      }else if(action === 'delete'){
        setReactionCount({likes: details?.reactionsCount?.like-1 || likes-1})
      }
    }else{
      setReactionCount({likes: details?.reactionsCount?.like || likes})
    }
  //  console.log('mrReact',details.myReactions)
    if(details?.myReactions?.length > 0){
      // console.log('my reac',details?.myReactions)
      const liked = details.myReactions.findIndex((data)=>data === 'like');
      isLiked = (liked !== -1) ? {like: true, reactionTime: 'past'} : {like: false, reactionTime: 'past'}
    }
    return isLiked;
  }
//   useEffect(()=>{
//     // setIsLiked({like : false, reactionTime: 'past'});
//        let tokens = typeof window !== "undefined" && localStorage.get('tokens');
//          if (tokens?.shortsAuthToken && tokens?.accessToken 
//            // && tokens?.getSocialToken
//            ) {
//          const getLikeReaction = async()=>{  
//             const isLiked =  await getVideoReactions(socialId, 'past');
         
//             setIsLiked({like : isLiked, reactionTime: 'past'});
//            }
//            getLikeReaction();
//            }
// },[])
  useEffect(()=>{
             setIsLiked({like : false, reactionTime: 'past'});
                let tokens = typeof window !== "undefined" && localStorage.get('tokens');
                  if (tokens?.shortsAuthToken && tokens?.accessToken )
                {
                  const getLikeReaction = async()=>{  
                     const isLiked =  await getVideoReactions(socialId, 'past');
                     setIsLiked({like : isLiked, reactionTime: 'past'});
                    }
                    getLikeReaction();
                }
  },[activeVideoId])

    let optProfilePic = profilePic;
    if(optProfilePic?.match('upload/w_300')){
      optProfilePic = optProfilePic?.replaceAll('upload/w_300','upload/w_100');
    }else{
      optProfilePic = optProfilePic?.replaceAll('upload','upload/w_100');
    }

    const options = {
      profile: `${saveLook ? 'bottom-20 ' : 'bottom-48 '} videoFooter absolute right-0 flex-col  flex text-white ml-2`,
      feed: `${saveLook ? 'bottom-28 ' : 'bottom-56 '} videoFooter absolute right-0 flex-col  flex text-white ml-2`,
      embed: `${saveLook ? 'bottom-12 ' : 'bottom-40 '} videoFooter absolute right-0 flex-col  flex text-white ml-2`,
      single: `${saveLook ? 'bottom-12 ' : 'bottom-40 '} videoFooter absolute right-0 flex-col  flex text-white ml-2`,
    };

useEffect(()=>{
},[reactionCount])

  return (
    <div
    className={options[comp]}
    >
      <div onClick={handleProfileClick} className="relative py-2 px-3 text-center justify-end flex">
        <div className="flex flex-col items-center">
          <div className="usrimg w-10 h-10 overflow-hidden rounded-full">
          <Img
            title="Hipi"
            data={optProfilePic}
            fallback={fallbackUser?.src}
          />
          </div>
          {/* <div
          onClick={() => show('', detectDeviceModal, 'extraSmall', {text: "profile"})}
            className={`${
              type === 'feed' ? 'block' : 'hidden'
            } absolute -bottom-2 p-1`}
          > 
            <Follow />
          </div> */}
        </div>
      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-2  px-3 text-center justify-end`}
      >
        {isLiked?.like ? (
          <div>
            <div
              role="presentation"
              onClick={() => {
                deleteReaction('like', socialId );
                setIsLiked({like : false, reactionTime: 'now'});
                getVideoReactions(socialId, 'now', 'delete')
                const mixpanelEvents = commonEvents();
                mixpanelEvents['UGC Id'] = activeVideoId;
                // mixpanelEvents['Creator Id'] = videoOwnersId;
                const compName = comp === 'feed' ? 'Feed' : comp === 'profile' ? 'Profile Feed' : pageName === 'hashtag' ? 'Hashtag Feed' : 'Feed';
                mixpanelEvents['Page Name'] = compName;
                track('UGC Unliked',mixpanelEvents)
              }}
            >
              <Liked />
            </div>

            <p className="text-sm text-center">{isLiked?.reactionTime === 'past' ?  numberFormatter(reactionCount.likes)   : numberFormatter(reactionCount.likes)}</p>
          </div>
        ) : (
          <div>
            <div
              id="like"
              role="presentation"
              onClick={() => selectedLike()}
            >
              <Like />
            </div>
            <p className="text-sm text-center">{isLiked?.reactionTime === 'past' ? numberFormatter(reactionCount.likes)  : numberFormatter(reactionCount.likes)}</p>
          </div>
       )} 

      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-2  px-3 text-center items-end flex-col`}
      >
        <div 
           id="comment"
           role="presentation"
           onClick={() => show('', detectDeviceModal, 'extraSmall', {videoId: videoId && videoId})}
        >
          <Comment />
          {/* <p className="text-sm text-center">0</p> */}
        </div>
      </div>
      <div
        onClick={(value === 'desktop') ? () => show('Share', null, 'medium'): (value === 'mobile') && (
          toTrackMixpanel ? ()=>share(videoId, videoActiveIndex, toTrackMixpanel) : ()=>share(videoId, videoActiveIndex))}
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-2  px-3 text-center items-end flex-col `}
      >
      <ShareComp />
      </div>
      <div className={`${
        type === 'feed' ? 'flex' : 'hidden'
      } "relative py-2  px-3 text-center items-end flex-col mb-28`}
      >
        <div onClick={() => showDialog('Embed Code', CopyEmbedCode, { videoId, onEmbedCopy })}>
          <EmbedIcon />
          <p className="text-sm text-center">Embed</p>
        </div>
      </div>
      {/* <div
        role="presentation"
        className={`${
          props.type === 'feed' ? 'block' : 'hidden'
        } relative py-2  px-1 text-center flex flex-col items-center`}
        onClick={() => show(` ${props.comment} comments`, CommentTray, 'md', props)}
      >
        <Comment />
        <p className="text-sm">{props.comment}</p>
      </div> */}
      {/* <div className={`${props.type === 'feed' ? 'block' : 'hidden'}`}>
       <ShareComp
        show={showSnackbar}
        shareCount={props.share}
      />
      </div> */}

      {canShop === 'success' && (!profileFeed
        && saveLook
        && (
          <div
            className={`${
              type === 'feed' ? 'block' : 'hidden'
            } absolute bottom-0 right-0 py-2 px-0 text-center flex flex-col items-center`}
            onClick={handleSaveLook}
          >
            <Shop text={!saved ? 'DISCOVER THE LOOK' : 'DISCOVER THE LOOK '} />
          </div>
        )
      )}

    </div>
  );
}

export default VideoSidebar;
