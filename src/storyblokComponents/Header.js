import { storyblokEditable } from "@storyblok/react";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 
const Header = ({ blok }) => {
  const { heading, type, subheading } = blok;
  const newDate = `${monthNames[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()} `
  return (
    <div className="flex flex-col max-full" {...storyblokEditable(blok)}>
      <div className="flex items-center mb-3">
        <div className="border-solid border-2 p-2 border-red-500 text-red-500 mr-2">
          {type}
        </div>
        <div className=" text-gray-400">
          {newDate}
        </div>
      </div>
      <div className=" font-bold text-lg mb-3">{heading}</div>
      <div><i>{subheading}</i></div>
    </div>
);
};
 
export default Header;