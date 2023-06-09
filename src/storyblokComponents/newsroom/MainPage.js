/*eslint-disable @next/next/no-img-element */
import React from "react";
import SideBar from "./SideBar";
import Tab from "../../components/commons/tabs/newsletterTab";
import StaticFooter from "../../components/static-footer";
import { withBasePath } from "../../../src/config";
import { useRouter } from "next/router";
import styles from "./mainPage.module.css";
import NewsroomIcon from "../../components/commons/svgicons/newsroom";
// import Card from './Card';

const categoriesObj = {
  All: "/",
  News: "news",
  Product: "product",
  Creator: "creator",
  Business: "business",
};
export default function MainPage({
  cards = false,
  heading = "",
  children,
  featureCard = {},
  blogType = "newsroom",
}) {
  const router = useRouter();
  const pathnameExtract = (pathname) => {
    const pathNameArray = pathname.split("/");
    if (pathNameArray.length < 3) {
      return "/";
    }
    return pathNameArray[2];
  };
  const currentPage = pathnameExtract(router.pathname);
  const onChange = (page) => {
    router.push(`/newsroom/${page}`);
  };
  return (
    <div>
      <div className="w-full h-16 head-shadow flex items-center justify-center sticky top-0 bg-white z-20">
        <div className={styles.headerWrapper}>
          <div
            className="w-14 cursor-pointer"
            onClick={() => router.push("/feed/for-you")}
          >
            <img alt="hipi logo" src={withBasePath("icons/Logo_hipi.png")} />
          </div>
        </div>
      </div>
      {blogType === "newsroom" ? (
        <>
          <div className={styles.tabWrapper}>
            <Tab
              tabs={categoriesObj}
              currentPage={currentPage}
              onChange={onChange}
            />
          </div>
          <div className={styles.parentContainer}>
            {cards && (
              <span className={styles.headingWrapper}>
                <h1 className={styles.heading}>{heading}</h1>{" "}
                {heading === "Newsroom" && (
                  <span className={styles.iconWrapper}>
                    <NewsroomIcon
                      height="64px"
                      width="64px"
                      viewBox="0 0 64 64"
                    />
                  </span>
                )}
              </span>
            )}
            {/* <div className={styles.featureCardWrapper}><Card post={featureCard}/></div> */}
            <div className={`${styles.container}  ${cards && "mt-16"}`}>
              <div className={styles.sideBarWrapper}>
                <SideBar
                  sideBarArray={categoriesObj}
                  currentPage={currentPage}
                  onChange={onChange}
                />
              </div>
              <div className={styles.cardsWrapper}>{children}</div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.parentContainer}>{children}</div>
      )}
      <StaticFooter />
    </div>
  );
}
