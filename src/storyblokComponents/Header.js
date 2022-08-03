import { storyblokEditable } from "@storyblok/react";
import { useRouter } from "next/router";
import styles from "./card.module.css";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 
const Header = ({ blok }) => {
  const router = useRouter();
  const { heading, type, subheading } = blok;
  const newDate = `${monthNames[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()} `
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
      <div className="font-semibold text-lg mb-3 md:text-5xl">{heading}</div>
      <div><p className="text-gray-600 text-base"><i>{subheading}</i></p></div>
    </div>
);
};
 
export default Header;