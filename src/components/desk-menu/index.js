import dynamic from "next/dynamic";
import useDrawer from "../../hooks/use-drawer";

const DeskMenu = ({handleUpClick, handleDownClick}) =>{
    const {show} = useDrawer();

    const login = dynamic(
        () => import('../auth-options'),
        {
          loading: () => <div />,
          ssr: false
        }
      );

    return(
        <div className="w-4/12 flex flex-col p-4 fixed top-10 left-0">
        <div className="flex flex-col pb-6 border-b border-gray-200">
              <p className="font-semibold text-lg py-2 pl-4">For You </p>
              <p className="font-semibold text-lg py-2 pl-4">Following </p>
              <button onClick={handleUpClick} className="font-semibold text-lg py-2 pl-4" >up </button>
              <button onClick={handleDownClick} className="font-semibold text-lg py-2 pl-4">down </button>
        </div>
        <div className="flex flex-col pb-6 pt- 4border-b border-gray-200">
              <p className="font-semibold text-sm text-gray-600 p-2">Log in to follow creators, like videos, and view comments.</p>
              <button 
                onClick={() =>show('', login, 'big')} 
                className="font-semibold border text-lg p-2 mt-4">
                  Log in
              </button>
        </div>
     </div>
    )
}

export default DeskMenu;