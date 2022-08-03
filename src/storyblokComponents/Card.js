/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react'
import styles from "./card.module.css";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export default function Card({post={}}) {
    const { full_slug=null, content: {body = {}} = {} } = post;
    const [{ heading=null, subheading=null, type=""}] = body;
    const image = body?.[0]?.cardImage?.filename || null;
    const newDate = new Date(post?.created_at)
    const router = useRouter();
    const created_at = `${monthNames[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
  return (
    <div className={styles.card} onClick={()=>router.push(`/newsroom/${full_slug}`)}>
        <div className={styles.card_desc}>
            <div className="flex items-center mb-3">
                <div className={`flex items-center px-4 h-8 border mr-2 ${styles[type.toLowerCase()]}`}>
                    {type}
                </div>
                <div className=" text-gray-400">
                    {created_at}
                </div>
            </div>
            <div className={styles.heading}>{heading}</div>
            <div><i>{subheading}</i></div>
        </div>
        <div className={styles.imageContainer}>
           {image && <img className='h-full w-full object-cover' src={image}/>}
        </div>
    </div>
  )
}
