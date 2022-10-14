import useDialog from '../../../hooks/use-dialog';


const ClearDataPopup = ({ clearData, videoPopup = false }) => {

const {close:closePopUp} = useDialog();

  return (
    <>
      <div className="flex justify-center items-center flex-col z-1">
        <p className="  my-4 text-center px-4 pt-10">{videoPopup ? `Are you sure you want to remove video ?` : `Are you sure you want to clear Data ?`}</p>
        <div className="flex justify-between px-6 w-1/2 py-4">
            <div onClick={() => {clearData();closePopUp();}} className="flex font-medium cursor-pointer text-gray-600 border shadow-md border-gray-200 px-6 py-1">Yes</div>
            <div onClick={()=>{closePopUp()}} className='cursor-pointer text-gray-600 border shadow-md border-gray-200 px-6 py-1'>No</div>
        </div>
        
      </div>
    </>
  );
};

export default ClearDataPopup;