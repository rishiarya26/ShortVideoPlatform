import useDialog from '../../../hooks/use-dialog';


const CustomPopUp = ({ type, clearData, viewProfile }) => {

const {close:closePopUp} = useDialog();

const messages = {
  discard: {ctaText: {top:"Discard",bottom:"Continue editing"} ,head: "Discard this post?", body:"The video and all edits will be discarded."},
  replaceVideo: {ctaText: {top:"Replace",bottom:"Continue editing"}, head: "Replace this video?", body:"Caption and video settings will still be saved."},
  videoCompletion: {ctaText: {top:"Upload another video",bottom:"Visit profile"}, head: "Your video is uploaded successfully", body:""},
}

  return (
    <>
      <div className="flex justify-center items-center flex-col z-1">
        <p className="mt-4 text-center px-4 text-lg text-hipidblue font-semibold w-full">{messages?.[type]?.head}</p>
        <p className="mt-2 mb-4 text-center px-4 text-gray-400 text-sm w-full">{messages?.[type]?.body}</p>
        <div 
          onClick={() => {clearData();closePopUp();}}
          className="px-4 py-3 text-hipired font-semibold text-base cursor-pointer w-full text-center border-b border-t border-gray-200 mt-2">
            {messages?.[type]?.ctaText?.top}
        </div>
        <div 
          onClick={type === "videoCompletion" ? () => {viewProfile();closePopUp()} : ()=>{closePopUp()}}
          className="px-4 py-3 text-hipidblue font-semibold text-base cursor-pointer w-full text-center">
            {messages?.[type]?.ctaText?.bottom}
        </div>
      </div>
    </>
  );
};

export default CustomPopUp;