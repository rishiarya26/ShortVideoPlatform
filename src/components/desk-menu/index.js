/*eslint-disable react/display-name */
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import Following from "../commons/svgicons/following";
import Home from '../commons/svgicons/home';

const DeskMenu = ({handleUpClick, handleDownClick}) =>{
    const {show} = useDrawer();
    const {showSnackbar} = useSnackbar();

    const login = dynamic(
        () => import('../auth-options'),
        {
          loading: () => <div />,
          ssr: false
        }
      );

      const showMessage = ({message})=>{
        showSnackbar({message: message});
      }

    return(
        <div className="w-feed-menu flex flex-col p-4 relative">
          <div className="flex flex-col fixed overscroll-y-auto top-28 bottom-0 w-feed-menu">
        <div className="flex flex-col pb-6 border-b border-gray-200">
        <div className='flex items-center'> <Home/> <p className="font-semibold text-lg py-2 pl-4">For You </p></div>
        <div className='flex items-center'><Following/><p className="font-semibold text-lg py-2 pl-3">Following </p></div>
        </div>
        <div className="flex flex-col pb-6 pt- 4border-b border-gray-200">
              <p className="font-semibold text-sm text-gray-600 p-2">Log in to follow creators, like videos, and view comments.</p>
              <button 
                onClick={() =>show('', login, 'big',{showMessage:showMessage})} 
                className="font-semibold border text-lg p-2 mt-4">
                  Log in
              </button>
        </div>
        </div>
     </div>
    )
}

export default DeskMenu;