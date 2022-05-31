import Privacy from '../src/components/privacy';
import ChooseComp from "../src/components/choose-comp";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Hipi() {
  // useEffect(()=>{
  //   router.push('https://protect-eu.mimecast.com/s/qxxcCPz2qUmlnPLSrOvgJ?domain=hipihelpcenter.zee5.com');
  // },[])
  return (
    <><Privacy/></>
  );
}