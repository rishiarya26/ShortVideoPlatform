import { storyblokEditable } from "@storyblok/react";
import { useRouter } from "next/router";
import styles from "./card.module.css";
import headerStyles from "./header.module.css";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 
const Header = ({ blok={}, date}) => {
  const router = useRouter();
  const { heading = null, type = router.pathname.split("/")[2], subheading = null } = blok;
  const created_at_date = new Date(date);
  const newDate = `${monthNames[created_at_date.getMonth()]} ${created_at_date.getDate()}, ${created_at_date.getFullYear()}`
  return (
    <div className="flex flex-col max-full" {...storyblokEditable(blok)}>
      <div className="flex items-center mb-3">
        <div onClick={()=>router.push(`/newsroom/${type.toLowerCase()}`)} className={`flex items-center px-4 h-8 border mr-2 cursor-pointer ${styles[type.toLowerCase()]}`}>
          {type}
        </div>
        <div className=" text-gray-400 font-light text-sm">
          {newDate}
        </div>
      </div>
      <div className={headerStyles.heading}>{heading}</div>
      <div><p className="text-gray-600 text-base"><i>{subheading}</i></p></div>
    </div>
);
};
 
export default Header;