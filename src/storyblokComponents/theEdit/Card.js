/*eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import styles from "./card.module.css";

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

export default function Card({ post = {} }) {
  const { full_slug = null, content: { body = {} } = {} } = post;
  const [{ heading = null, cardImageAlt = "Hipi edit" }] = body;
  const image = body?.[0]?.cardImage?.filename || null;
  const newDate = new Date(post?.created_at);
  const router = useRouter();
  const created_at = `${
    monthNames[newDate.getMonth()]
  } ${newDate.getDate()}, ${newDate.getFullYear()}`;
  return (
    <div className={styles.card} onClick={() => router.push(`/${full_slug}`)}>
      <div className={styles.cardWrapper}>
        <div className={styles.imageContainer}>
          {image && (
            <img
              className="h-full w-full object-cover"
              src={image}
              alt={cardImageAlt}
            />
          )}
        </div>
        <div className={styles.descWrapper}>
          <div className={styles.headingWrapper}>{heading}</div>
          <div className={styles.dateWrapper}>{created_at}</div>
        </div>
      </div>
    </div>
  );
}
