/*eslint-disable @next/next/no-img-element */
import Sidebar from "../../src/storyblokComponents/SideBar";
import Card from "../../src/storyblokComponents/Card";
import Tab from "../../src/components/commons/tabs/newsletterTab";
import { useRouter } from "next/router";
import { withBasePath } from "../../src/config";
import styles from "./cardSummary.module.css";
 
const categoriesObj = {"All": "/", "News": "news", "Product": "product", "Creator": "creator", "Business": "business"};
export default function CardSummary({stories, heading}) {
  const router = useRouter();
    const pathnameExtract = (pathname) => {
        const pathNameArray = pathname.split("/");
        if(pathNameArray.length < 3) {
            return "/";
        }
        return pathNameArray[2];
    }
    const currentPage = pathnameExtract(router.pathname);
    const onChange = (page) => {
        router.push(`/newsroom/${page}`)
    }
  return (
      <div className="flex flex-col">
        <div className="w-full px-6 h-16 head-shadow flex items-center sticky top-0 bg-white z-20">
          <div onClick={()=>router.push("/feed/for-you")} className="w-14 cursor-pointer">
            <img alt="hipi logo"  src={withBasePath('icons/Logo_hipi.png')} />
          </div>
        </div>
      <div className="flex flex-col">
        <div className={styles.navigationContainer}>
          <div className={styles.sideBarWrapper}>
            <Sidebar
              sideBarArray={categoriesObj}
              currentPage={currentPage}
              onChange={onChange}
            />
          </div>
          <div className={styles.tabWrapper}>
            <Tab
              tabs={categoriesObj}
              currentPage={currentPage}
              onChange={onChange}
            />
          </div>
          <div className={styles.cardWrapper}>
            <div className={styles.headingWrapper}><h1>{heading}</h1></div>
              {stories.length > 0 ? 
                (
                  stories?.map((post)=><Card key={post.uuid} post={post}/>)
                  ) : (
                  <div className="flex items-center justify-center text-4xl h-full">No Post available</div>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}