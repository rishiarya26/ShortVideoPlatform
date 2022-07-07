let logoutTimeout = [];
 export function logout({sessionTChange}) {
       console.error("reset - session end - from logout")
       logoutTimeout = null;
       clearTimeouts();
    //    setSessionTimer(undefined);
       sessionTChange(undefined);
       window.sessionStorage.setItem("sessionT",undefined);
       window.sessionStorage.setItem("sessionEventTrack",null);
       clearTimeouts();
  }
  

  export const setTimeouts = (timer) => {
    logoutTimeout = logoutTimeout ===  (undefined || null) ? [] : logoutTimeout;
    logoutTimeout.push(setTimeout(()=>{timer < 6 && logout()}, 10000));
  };

  export const clearTimeouts = () => {
      if (logoutTimeout?.length >0){ 
        logoutTimeout.map((data)=>{
          clearTimeout(data)
        })
  };
}

  export const resetTimeout = ({sessionTChange}) => {
   let timer =  window.sessionStorage.getItem("sessionT");
      if(window.sessionStorage.getItem("sessionEventTrack") === 'null'){
        console.error("reset - session start R");
        // setSessionTimer(0);
        sessionTChange(0)
        window.sessionStorage.setItem("sessionEventTrack",undefined);
        window.sessionStorage.setItem("sessionT",0);
        timer = 0;
      }
      clearTimeouts();
      setTimeouts(timer);
  };