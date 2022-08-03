import styles from './sideBar.module.css';
import { generateUUID } from '../utils/app';

export default function SideBar({sideBarArray, currentPage, onChange}){
    return(
        <div className="flex sticky top-16" style={{height: "max-content"}}>
            <div className="flex flex-col text-left">
             {sideBarArray && Object?.keys(sideBarArray)?.map((item,index)=>{
                const uuid = generateUUID(false);
                return(
                    <div
                        key={uuid}
                        onClick={()=>onChange(sideBarArray[item])}
                        className={`font-bold pt-2 cursor-pointer relative ${styles.tabs} ${sideBarArray[item] === currentPage ? styles.tabs_active:""}`}
                    >
                        {item}
                    </div>
                );}
            )}
            </div>
        </div>
    )
}