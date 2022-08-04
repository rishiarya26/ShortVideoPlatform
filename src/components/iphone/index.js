import React, { useEffect, useRef } from 'react';

const IphoneComp = ({rootRef ,ref, onContextMenu, url, videoPress, onTimeUpdate}) => {

  const videoParentRef = useRef();

  useEffect(()=>{
    // ref.current
    // console.log(url,"innerUrl");
    let t = document.querySelectorAll("video")
    // t.forEach((item,index)=>{
    //   item.addEventListener('click', videoPress);
    //   //item.addEventListener('timeupdate', onTimeUpdate);
    //   item.addEventListener('contextmenu', (e)=>{e.preventDefault();return false});
    // })
    console.log("refg",t)
  },[])

  useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0];

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false;
        player.playsinline = true;
        player.muted = true;
        player.setAttribute("muted", ""); // leave no stones unturned :)
        player.autoplay = true;

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play();
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                videoParentRef.current.style.display = "none";
                //setShouldUseImage(true);
              });
          }
        }, 0);
      }
    }
  }, []);


  return(<div
    ref={videoParentRef}
    onClick={videoPress}
    className="vdo_player"
    dangerouslySetInnerHTML={{
      __html: `
           <video
      controlsList="nodownload"
      playsInline
      muted
      autoPlay
      preload="auto"
      webkit-playsinline = "true"
      loop
      className="vdo_player"
      objectfit="cover"
      key=${url}
      >
      <source
         src=${url}
         type="video/mp4"
      /> 
      </video>`
    }}
  />)
}

export default IphoneComp;