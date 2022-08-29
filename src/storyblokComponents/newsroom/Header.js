import { storyblokEditable } from "@storyblok/react";
import { useRouter } from "next/router";
import styles from "./card.module.css";
import headerStyles from "./header.module.css";
import { getCanonicalUrl } from "../../utils/web";
import { useEffect, useState } from "react";
import { SeoMeta } from "../../components/commons/head-meta/seo-meta";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const applyEllipsis = (content = "") => {
  const newContent = "";
  if (content.length > 140) {
    content = content.slice(0, 140) + " ...";
  }
  console.log("debug", newContent);
};

const Header = ({ blok = {}, date, blogType = "newsroom" }) => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (document && document?.location) {
      setUrl(document.location.href);
    }
  }, []);
  const {
    heading = null,
    type = router.pathname.split("/")[2],
    subheading = null,
    cardImage = null,
  } = blok;
  const created_at_date = new Date(date);
  const newDate = `${
    monthNames[created_at_date.getMonth()]
  } ${created_at_date.getDate()}, ${created_at_date.getFullYear()}`;
  return (
    <>
      <SeoMeta
        data={{
          title: heading,
          description: subheading,
          canonical: url && getCanonicalUrl(url),
          openGraph: {
            title: heading,
            description: subheading,
            url: url && getCanonicalUrl(url),
            images: [
              {
                url: cardImage.filename,
                width: 512,
                height: 512,
                alt: `${blogType} image`,
              },
            ],
            type: "image/png",
            site_name: "Hipi",
          },
        }}
      />
      <div className="flex flex-col" {...storyblokEditable(blok)}>
        {blogType === "newsroom" ? (
          <>
            <div className="flex items-center mb-3">
              <div
                onClick={() => router.push(`/newsroom/${type.toLowerCase()}`)}
                className={`flex items-center px-4 h-8 border mr-2 cursor-pointer ${
                  styles[type.toLowerCase()]
                }`}
              >
                {type}
              </div>
              <div className=" text-gray-400 font-light text-sm">{newDate}</div>
            </div>
            <div className={headerStyles.heading}>
              <h1>{heading}</h1>
            </div>
            <div>
              <p className="text-gray-600 text-base">
                <i>{subheading}</i>
              </p>
            </div>{" "}
          </>
        ) : (
          <>
            <div className={headerStyles.heading}>
              <h1>{heading}</h1>
            </div>
            <div className="text-10">
              <span className={headerStyles.chips}>Entertainment</span>
              &nbsp;|&nbsp;
              <span className={headerStyles.chips}>{subheading}</span>
              &nbsp;|&nbsp;
              <span className={headerStyles.chips}>
                Created:&nbsp;
                {newDate}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
