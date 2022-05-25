import { useRouter } from "next/router";
import { trimHash } from "../../utils/string";

const Description = ({description}) =>{
    const router = useRouter();
    const redirect = (item) =>{
        try{  
          if(item?.indexOf('#')!==-1){
            const trimmedHashtag = trimHash(item);
            console.log("item",trimmedHashtag);
            window.location.href = `/hashtag/${trimmedHashtag}`;
          }else
          if(item?.indexOf('@')!==-1){
            const userHandle = (item);
            // console.log("item",trimmedHashtag);
            router?.push(`/${userHandle}`);
          }
        }catch(e){
            console.log("error in hashtag redirect",e)
          }
        }

    return (
        <>
        {description?.replaceAll('\n',' ')?.split(' ')?.map((item,id)=>(
              <p key={id} className='inline-block'>
                <span 
                 className={`pl-1 cursor-pointer ${(item?.indexOf('#')!==-1 || item?.indexOf('@')!==-1)?'font-semibold':''} `} 
                 onClick={ (item?.indexOf('#')!==-1 || item?.indexOf('@')!==-1) ? ()=>redirect(item) : item?.includes('https') && window?.open(item)}>
                {item}
              </span>
              </p>
            ))}
        </>
    )
}

export default Description;