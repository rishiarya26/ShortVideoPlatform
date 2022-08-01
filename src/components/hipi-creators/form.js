import { useState } from "react";
import { ToTrackFbEvents } from "../../analytics/fb-pixel/events";
import { toTrackFirebase } from "../../analytics/firebase/events";
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import useSnackbar from "../../hooks/use-snackbar";
import { postCreatorData } from "../../sources/google-sheets";

const Form = ()=>{
    const [data, setData] = useState({name:'',genre:'',hipiHandle:'',instaHandle:'',mobile:'',email:''});
    const [loader, setLoader] = useState(false);
    const [genreList, setGenreList] = useState(['Fashion, Beauty & Lifestyle','Singing','Dance','Acting & Lip Sync','Comedy','Travel & Food','Other'])
    const [showMessage, setShowMessage] = useState(false);

    const {showSnackbar} = useSnackbar();

    const updateData = (e)=>{
        showMessage && setShowMessage(false);
        console.log("EEE",e.currentTarget.name, e.currentTarget.value)
        if(e?.currentTarget?.name !=='default'){
        const tempData = {...data};
        tempData[e?.currentTarget?.name] = e?.currentTarget?.value;
        setData(tempData);}
      }
   
    const onSubmit = async(e) =>{ 
        e.preventDefault();
        setLoader(true);
      try{
       const resp = await postCreatorData(data);
       if(resp?.['http-status'] === 200){
        console.log('CData',resp);
        try{
          toTrackMixpanel('creatorFormSubmitted');
          toTrackFirebase('creatorFormSubmitted');
          ToTrackFbEvents('creatorFormSubmitted');
        }catch(e){
          console.error('mixpanel issue - submit form')
        }
        showSnackbar({message : 'Submitted Successfully'});
        setData({name:'',genre:'',hipiHandle:'',mobile:'',email:''});
        setLoader(false);
        setShowMessage(true);
       }else{
        showSnackbar({message : 'Something went wrong.. please try again'});
        setLoader(false);
       }
      }catch(e){
        showSnackbar({message : 'Something went wrong.. please try again'});
        setLoader(false);
        console.error("issue",e);
      }
    }

    return(
        <div className='md:w-1/2 w-full text-gray-600 bg-white shadow-md md:p-8 p-8 border border-gray-100'>
       {/* {showMessage ? 
       <div className='flex justify-center items-center flex-col'>
         Thank you for showing interest in Hipi creator program, one of our support executive will get in touch with you in 24-48 hours
         <div className='flex justify-center items-center mt-1 border border-gray-400 p-1'><button onClick={()=>setShowMessage(false)}>OK</button></div>
       </div>
       :  <> */}
        <h1 className='text-3xl font-bold text-gray-800 text-center'>Join our journey</h1>
           <p className='text-gray-500 font-light text-lg pt-2 pb-2 text-center'>Fill in these details</p>
        <form onSubmit={onSubmit}>  
        <div className='py-2'>
          <input 
           className="w-full border-b border-gray-300 text-lg px-1 " 
           type="text" 
           name="name" 
           placeholder="Name *"
           onChange={updateData}
           value={data.name}
           required
           />
        </div>
        <div className='py-2'>
        <select onChange={updateData} value={data.genre} name="genre" className='text-gray-600 border-b border-gray-300 text-lg w-full p-2 pl-0'>
          <option className='bg-white' name='default' value='' disabled selected>Genre</option>
           {genreList?.map((item,id)=>(
             <option key={id} className="text-gray-600" name="genre" value={item}>{item}</option>
           ))}
        </select>
        {/* <input 
         className="w-full border-b border-gray-300 text-lg px-1" 
         type="text" 
         name="genre" 
         placeholder="Genre" 
         onChange={updateData}
         value={data.genre}
         required
        /> */}
        </div>
        <div className='py-2'>
        <input
         className="w-full border-b border-gray-300 text-lg px-1" 
         type="text" 
         name="hipiHandle" 
         placeholder="Hipi handle" 
         onChange={updateData}
         value={data.hipiHandle}
         
         />
        </div>
        <div className='py-2'>
        <input
         className="w-full border-b border-gray-300 text-lg px-1" 
         type="text" 
         name="instaHandle" 
         placeholder="Instagram handle *" 
         onChange={updateData}
         value={data.instaHandle}
         required
         />
        </div>
        <div className='py-2 flex'>
          <input className='pl-1 border-r border-gray-300 w-10 border-b text-gray-400' value='+91' readOnly/>
          <input 
          className="w-full border-b border-gray-300 text-lg px-1 pl-2" 
          type="number" 
          name="mobile" 
          placeholder="Mobile number *" 
          onChange={(e)=>e?.currentTarget?.value?.length <=10 && updateData(e)}
          value={data.mobile}
          required
          read
          />
          </div>
        <div className='py-2'>
          <input 
          className="w-full border-b border-gray-300 text-lg px-1" 
          type="email" 
          name="email" 
          placeholder="Email *" 
          onChange={updateData}
          value={data.email}
          required
          />
        </div>
        <div className='w-full flex justify-center'>
         <button 
         className="cursor-pointer bg-hipired w-1/2 md:w-1/4 rounded-sm shadow-md mt-4 px-4 py-2 text-white flex justify-center font-semibold"
          type="submit"
          disabled={loader ? true : false}
         >
           Submit{loader ? 'O' : '' }
         </button>
        </div>
        </form>
        {/* </>
        } */}
        {/* {showMessage && <div>
            Thank you for showing interest in Hipi creator program, one of our support executive will get in touch with you in 24-48 hours
        </div>}    */}
        </div>
    )
}

export default Form;