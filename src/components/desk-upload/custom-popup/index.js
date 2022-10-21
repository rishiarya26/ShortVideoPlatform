import useDialog from '../../../hooks/use-dialog';


const CustomPopUp = ({ type, clearData, viewProfile }) => {

const {close:closePopUp} = useDialog();

const messages = {
  discard: {ctaText: {top:"Discard",bottom:"Continue editing"} ,head: "Discard this post?", body:"The video and all edits will be discarded."},
  replaceVideo: {ctaText: {top:"Replace",bottom:"Continue editing"}, head: "Replace this video?", body:"Caption and video settings will still be saved."},
  videoCompletion: {ctaText: {top:"Upload another video",bottom:"View profile"}, head: "Your video is being uploaded to Hipi!", body:""},
}

  return (
    <>
      <div className="flex justify-center items-center flex-col z-1">
        <p className="mt-4 text-center px-4 text-lg text-hipidblue font-semibold w-full">{messages?.[type]?.head}</p>
        <p className="mt-2 mb-4 text-center px-4 text-gray-400 text-sm w-3/4">{messages?.[type]?.body}</p>
        <hr  className='h-1 w-full text-gray-300'/>
        <div 
          onClick={() => {clearData();closePopUp();}}
          className="p-4 text-hipired font-semibold text-base cursor-pointer w-full text-center">
            {messages?.[type]?.ctaText?.top}
        </div>
        <hr className='h-1 w-full text-gray-300' />
        <div 
          onClick={type === "videoCompletion" ? () => {viewProfile();closePopUp()} : ()=>{closePopUp()}}
          className="p-4 text-hipidblue font-semibold text-base cursor-pointer w-full text-center">
            {messages?.[type]?.ctaText?.bottom}
        </div>
      </div>
    </>
  );
};

export default CustomPopUp;