/*eslint-disable @next/next/no-img-element */
import Sidebar from "../../src/storyblokComponents/SideBar";
import Card from "../../src/storyblokComponents/Card";
import Tab from "../../src/components/commons/tabs/newsletterTab";
import { useRouter } from "next/router";
import { withBasePath } from "../../src/config";
 
const categoriesObj = {"All": "/", "News": "news", "Product": "product", "Creator": "creator", "Business": "business"};
export default function CardSummary({stories, heading}) {
  console.log("suvansh", stories);
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
        router.push(`/newsletter/${page}`)
    }
  return (
      <div className="flex flex-col">
        <div className="w-full px-6 h-16 head-shadow flex items-center sticky top-0 bg-white z-20">
          <div className="w-14">
            <img alt="hipi logo"  src={withBasePath('icons/Logo_hipi.png')} />
          </div>
        </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="w-1/5 block">
            <Sidebar
              sideBarArray={categoriesObj}
              currentPage={currentPage}
              onChange={onChange}
            />
          </div>
          <div className="w-full block md:hidden sticky top-16 z-10">
            <Tab
              tabs={categoriesObj}
              currentPage={currentPage}
              onChange={onChange}
            />
          </div>
          <div className="w-full md:w-3/5 px-4">
            <div className="text-center font-bold text-3xl my-5"><h1>{heading}</h1></div>
              {stories?.map((post)=><Card key={post.uuid} post={post}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}