/*eslint-disable @next/next/no-img-element */
import { withBasePath } from "../../config";
import { useEffect, useState } from "react";
import { localStorage } from "../../utils/storage";
import Check from "../commons/svgicons/check";
import useAuth from "../../hooks/use-auth";
import { updateUserProfile } from "../../sources/users";
import CircularLoader from "../commons/circular-loader-button-small";
import useSnackbar from "../../hooks/use-snackbar";
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import {contentLang} from "../../../public/content-lang.json"
import { INDEX_TO_SHOW_LANG } from "../../constants";

const LanguageSelection = ({activeVideoIndex})=>{
    const [selectedLang, setSelectedLang] = useState([]);
    const [loading, setLoading] = useState(false);
    const isShowed = localStorage.get('lang-24-hr');

    const {showSnackbar} = useSnackbar();

    useEffect(()=>{
        const region = localStorage?.get('geo-info')?.state_code;
        console.log('region**',region);
        region && (region === 'KA' || region === 'KL' || region === 'TN' || region === 'TG' || region === 'AD') ? setSelectedLang(['en']) : setSelectedLang(['en','hi'])
    },[])

    useEffect(()=>{
        console.log("PP",activeVideoIndex,isShowed);
        activeVideoIndex === INDEX_TO_SHOW_LANG && toTrackMixpanel('contentLanguagesImpression');
        activeVideoIndex === INDEX_TO_SHOW_LANG && isShowed === 'false' && localStorage.set('lang-24-hr','true');
    },[activeVideoIndex])

    const updateLanguageWLogin = async() =>{
        console.log('inside  - lang update w login')
        setLoading(true);
        try {
        const data = localStorage?.get(['user-details']);
        // const languagesSelectedInfo = localStorage.get('lang-codes-selected');
        // const langSelected = languagesSelectedInfo;
        console.log('user-details',data)
        localStorage.set('lang-24-hr','true');
        if(data?.languages === null){
        // const languageCodes = localStorage.get('lang-codes-selected')?.lang || null;
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
            window.location.href = '/feed/for-you'
            //    router.back();
            //  router && router?.push(`/edit-profile/${response?.data?.id}`);
          }
        }else{
            localStorage.set('lang-codes-selected',{lang:selectedLang, type:'profile'});
            console.log('inside  - lang update w login without profile + ')
            setLoading(false);
            window.location.href = '/feed/for-you'
        }
        } catch (e) {
          console.error('inside - languages updation failed',e);
          setLoading(false);
          window.location.href = '/feed/for-you'
          // showSnackbar({ message: 'Something went wrong' });
        }
      }

    const updateSelectedLang = ()=>{
        setLoading(true);
        console.error('inside - languages updation Without login');
        localStorage.set('lang-codes-selected',{lang:selectedLang,type:'guest'});
        localStorage.set('lang-24-hr','true');
        setLoading(false);
        window.location.href = '/feed/for-you'
    }  

    const onSubmit = useAuth(updateSelectedLang,updateLanguageWLogin)

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
      <div className='flex flex-col bg-black h-full justify-center pb-16 box-border'>
        <div className="flex w-full justify-center items-end pb-4 px-4 lang-sm-title">
            <div className="text-white text-xl font-semibold">Select your language</div>
        </div>
          <div className='flex flex-wrap justify-center w-full'>
              {contentLang?.map((item,id)=>(
              <div key={id} className="w-5/12  bg-gray-400 rounded-md lang-sm flex justify-center items-center my-2 relative max-w-20h min-h-9.5v overflow-hidden" onClick={()=>onLangSelect(item?.code)}>
                <p className="text-white text-sm font-semibold absolute top-1 left-2 z-10">{item?.lang}</p>
                <img className="z-20" src={withBasePath(item?.img)}/>
                {selectedLang.includes(item?.code) && <div className="absolute z-30 w-full h-full bg-black opacity-60 text-white top-0 left-0 flex justify-center items-center"  onClick={()=>onLangSelect(item?.code)}><Check/></div>}
              </div>))
              }
          </div>  
          <div className="flex w-full justify-center pt-4">
          <div 
           className="done_btn flex justify-center items-center font-semibold text-sm border border-hipired rounded py-2 px-6  bg-hipired text-white" 
           onClick={()=>{
            if(selectedLang.length > 0){
               localStorage.set('lang-flush','true');
               toTrackMixpanel('contentLanguagesSubmitted',{method:'Feed'},{lang:selectedLang?.length>0 ? selectedLang?.reduce((acc,item,id)=>`${acc}${id === 0 ? '':','}${item}`,'') : 'NA'});
               onSubmit();
            }else{
               showSnackbar({message: 'Please select atleast 1 language'});
            }
            }}
           >Done {loading ? <CircularLoader/> : ''}
          </div>
          </div>    
      </div>
    )
}

export default LanguageSelection;