import { useEffect, useState } from "react";

const SnackCenter = ({showSnackbar=true}) => {
  const [show, setShow] = useState(false);

  useEffect(()=>{
  if(showSnackbar){
    setShow(true);
    setTimeout(()=>{setShow(false)},3000)
  }
  },[showSnackbar])

  return <>
  {show && <div className="absolute md:px-6 top-1/2 left-0 mt-16 w-full justify-center flex items-center ">
    <div className="px-6 py-3 rounded-md bg-black opacity-40 text-center w-max text-white md:text-xs"> This song is currently unaivalable</div>
  </div>}
  </>

};
export default SnackCenter;
