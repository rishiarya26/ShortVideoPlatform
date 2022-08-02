import React from 'react'
import styles from "./newsletter-tabs.module.css";
import { generateUUID } from '../../../utils/app';

export default function newsletterTab({tabs , currentPage, onChange}) {
  return (
    <div className='w-full flex p-1 items-center justify-evenly border-solid border-b border-gray-400 bg-white'>
      {tabs && Object?.keys(tabs)?.map((item)=>{
        const uuid = generateUUID(false);
        return(
        <div
          key={uuid}
          onClick={()=>onChange(tabs[item])}
          className={` cursor-pointer relative ${styles.tabs} ${tabs[item] === currentPage && styles.tabs_active} mx-1`}
        >
          {item}
        </div>)})}
    </div>
  )
}
