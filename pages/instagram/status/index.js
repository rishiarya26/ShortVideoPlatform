import InstaDeLink from "../../../src/components/insta-de-link";
import { getUserProfile } from "../../../src/sources/users/profile";
import Error from 'next/error';
import Error409 from "../../../src/components/409";

export default function Hipi(data){
    console.log(data)
    if(data?.status === "fail"){
        if(data?.errorCode === 409){  
         return<><Error409/></>
        }else{
         return <Error message={data?.message} statusCode={data?.errorCode} />;
      }
    }
    return(
       <InstaDeLink socialHandles={data?.data?.socialHandles?.instagramUrl || null} name={`${data?.data?.firstName || ''} ${data?.data?.lastName || ''}`}/>
    )
}

export async function getServerSideProps(ctx) {
  // const contentId = ctx?.query?.id;
  const {
     query
  } = ctx;
  console.log('server ---',query)
  //const uri = new URL(req.url, `http://${req.headers.host}`).href;
  const { id = '' } = query;
//   const trimmedUserHandle = id && id.replace('@','');
  let data = {};
  try {
    data = await getUserProfile(id);
    // console.log(data)
  } catch (e) {
      console.log("error --- ",e)
    data = {
      status: e?.status || "fail",
      errorCode: e?.errorCode || 400,
      'http-status': e['http-status'],
      message: e?.message || 'something went wrong'
    };
  }

  return {
    props: {
      ...data
    }
  };
}