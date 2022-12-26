
/* eslint-disable @next/next/no-img-element*/
import { useEffect, useState } from "react";
import useSnackbar from "../../hooks/use-snackbar";
import { updateUserProfile } from "../../sources/users";
import { getItem } from "../../utils/cookie";
import {contentLang} from "../../../public/content-lang.json"
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import CircularLoaderButtonSmall from "../commons/circular-loader-button-small";
import { withBasePath } from "../../config";
import { localStorage } from "../../utils/storage";
import Check from "../commons/svgicons/check";
import { Back } from "../commons/svgicons/back";
import { useRouter } from 'next/router';

const ContentLangProfile = () =>{
    const router = useRouter()
    const [selectedLang, setSelectedLang] = useState([]);
    const [loading, setLoading] = useState(false);
    const device = getItem('device-info');

    const {showSnackbar} = useSnackbar();
   
    const autoSelectLang = (region) => {
      switch(region){
        case 'KA' : return ['en','hi','ka']
        case 'KL' : return ['en','hi','ml']
        case 'TN' : return ['en','hi','ta']
        case 'TG' : return ['en','hi','te']
        case 'AD' : return ['en','hi','te']
        case 'MH' : return ['en','hi','mr']
        case 'GJ' : return ['en','hi','gu']
        case 'OR' : return ['en','hi','or']
        case 'BR' : return ['en','hi','hr']
        case 'WB' : return ['en','hi','bn']
        case 'PB' : return ['en','hi','pa']
        default : return ['en','hi']
       }
     } 

    const langSelectionInOwnProfile = () =>{
        console.log('LLL',localStorage.get('lang-codes-selected')?.lang);
        const selectedCodes = localStorage.get('lang-codes-selected')?.lang ? localStorage.get('lang-codes-selected')?.lang : null;
        const region = autoSelectLang(localStorage?.get('geo-info')?.state_code || null);
        const codesToShow = selectedCodes || region || ['en','hi'];
        setSelectedLang(codesToShow);
    }

    useEffect(()=>{
       langSelectionInOwnProfile();
    },[])

    const updateLanguageWLogin = async() =>{
        console.log('inside  - lang update w login')
        setLoading(true);
        try {
        const data = localStorage?.get(['user-details']);
        console.log('user-details',data)
        // if(data?.languages === null){
        let response;
        const payload = {
          id: data?.id,
          profilePic: data?.profilePic,
          firstName: data?.firstName,
          lastName: data?.lastName,
          dateOfBirth: data?.dateOfBirth,
          userHandle: data?.userHandle,
          onboarding: null,
          profileType: null,
          bio: data?.bio,
          languages:selectedLang
        };
          response = await updateUserProfile(payload);
          console.log('Resp',response)
          if (response.status === 'success') {
            localStorage.set('lang-codes-selected',{lang:selectedLang, type:'profile'});
            console.log('inside  - lang update w login + ',response)
            console.log('insidie - languages updated successfully');
            setLoading(false);
            showSnackbar({type: "info", message: "language successfully changed"})
          }
        // }
        } catch(e) {
          console.error('inside - languages updation failed',e);
          setLoading(false);
          showSnackbar({type: "info", message: "unexpected error occured"})
        }
      }

    const onSubmit = updateLanguageWLogin;

    const onLangSelect = (lang) =>{
        console.log('lang',lang)
        const copySelectedLang = [...selectedLang];
        const langIndex = selectedLang.findIndex((item)=>item === lang);
        if(langIndex === -1){
            copySelectedLang.push(lang);
            setSelectedLang(copySelectedLang);
        }else{
            copySelectedLang.splice(langIndex,1);
            setSelectedLang(copySelectedLang);
        }
    }
   
    return(
      <div className='flex flex-col h-screen justify-center box-border relative'>
        <div className="absolute top-0 left-0 headbar w-full flex h-16 shadow-md bg-white items-center justify-center">
            <div onClick={()=>
              router.back()}  className="p-4 h-full flex items-center absolute left-0 top-0 justify-center">
              <Back/>
            </div>
        </div>
        <div className="flex w-full justify-center items-end pb-4 px-4 lang-sm-title">
            <div className="text-gray-600 text-xl font-semibold">Select your language</div>
        </div>
        <div className='flex flex-wrap justify-center w-full'>
            {contentLang?.map((item,id)=>(
            <div key={id} className="w-5/12  bg-gray-400 rounded-md lang-sm flex justify-center items-center my-2 relative max-w-20h min-h-9.5v overflow-hidden" onClick={()=>
              onLangSelect(item?.code)}>
              <p className="text-white text-sm font-semibold absolute top-1 left-2 z-10">{item?.lang}</p>
              <img className="z-20" src={withBasePath(item?.img)}/>
              {selectedLang?.includes(item?.code) && 
              <div className="absolute z-30 w-full h-full bg-black opacity-40 text-white top-0 left-0 flex justify-center items-center"  onClick={()=>
                  onLangSelect(item?.code)}>
                  <Check/>
              </div>
              }
            </div>
            ))
            }
        </div>
        <div className="flex w-full justify-center pt-4">
            <div
              className={`relative done_btn flex justify-center items-center font-semibold text-sm border border-hipired rounded py-2 px-6  bg-hipired text-white`}
              onClick={()=>
              {
                if(loading) return;
                if(selectedLang?.length > 0){
                localStorage.set('lang-flush','true');
                toTrackMixpanel('contentLanguagesSubmitted',{method:'Profile'},{lang:selectedLang?.length>0 ? selectedLang?.reduce((acc,item,id)=>`${acc}${id === 0 ? '':','}${item}`,'') : 'NA'});
                onSubmit();
                }else{
                showSnackbar({message: 'Please select atleast 1 language'});
                }
              }}
              > Done{loading ? 
              <CircularLoaderButtonSmall/>
              : ''}
            </div>
        </div>
      </div>
    )
}

export default ContentLangProfile;