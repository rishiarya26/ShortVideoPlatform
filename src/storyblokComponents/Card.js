/*eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react'
import styles from "./card.module.css";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export default function Card({post}) {
    const { full_slug, content: {body} } = post;
    const [{ heading, subheading}, {content}] = body;
    const image = content?.[1];
    const newDate = new Date(post.created_at)
    const router = useRouter();
    const created_at = `${monthNames[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
    const extractType = () => {
        const slugArray = full_slug.split("/");
        return slugArray[0];
    }
    const type = extractType();
  return (
    <div className={`w-full flex flex-col-reverse md:flex-row cursor-pointer rounded-lg overflow-hidden ${styles.card}`} onClick={()=>router.push(`/newsletter/${full_slug}`)}>
        <div className={`w-full md-w-3/5 ${styles.card_desc}`}>
            <div className="flex items-center mb-3">
                <div className={`p-2 mr-2 ${styles[type]}`}>
                    {type}
                </div>
                <div className=" text-gray-400">
                    {created_at}
                </div>
            </div>
            <div className=" font-bold text-xl mb-3">{heading}</div>
            <div><i>{subheading}</i></div>
        </div>
        <div className={`md:w-2/5 overflow-hidden ${styles.image}`}>
           {image && <img className='h-full w-full object-cover' src={image.content.filename}/>}
        </div>
    </div>
  )
}
