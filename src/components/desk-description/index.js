import { useRouter } from "next/router";
import { trimHash } from "../../utils/string";
import { replaceNbsps } from "../../utils/web";

const Description = ({description}) =>{
    const router = useRouter();
    const redirect = (item) =>{
        try{  
          if(item?.indexOf('#')!==-1){
            const trimmedHashtag = trimHash(item);
            window.location.href = `/hashtag/${trimmedHashtag}`;
          }else if(item?.indexOf('@')!==-1){
            const userHandle = (item);
            window.location.href = `/${userHandle}`
          }else if(item?.indexOf('https')!==-1){
            window?.open(item)
          }
        }catch(e){
            console.log("error in hashtag redirect",e)
          }
        }

    return (
        <>
        {replaceNbsps(description)?.replaceAll('\n',' ')?.split(' ')?.map((item,id)=>(
              <p key={id} className='inline-block'>
                <span 
                 className={`pl-1 cursor-pointer ${(item?.indexOf('#')!==-1 || item?.indexOf('@')!==-1)?'font-semibold':''} `} 
                 onClick={ (item?.indexOf('#')!==-1 || item?.indexOf('@')!==-1 || item?.includes('https')) ? ()=>redirect(item) : undefined}>
                {item}
              </span>
              </p>
            ))}
        </>
    )
}

export default Description;