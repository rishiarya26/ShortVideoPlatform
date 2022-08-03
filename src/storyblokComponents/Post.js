/*eslint-disable @next/next/no-img-element */
import { StoryblokComponent } from "@storyblok/react"
import Sidebar from "./SideBar";
import { withBasePath } from "../../src/config";
import { useRouter } from "next/router";
 
export default function Post({story}) {
  const router = useRouter();
  return (
    <div className="flex flex-col">
       <div className="w-full px-6 h-16 head-shadow flex items-center sticky top-0 bg-white z-20">
          <div className="w-14 cursor-pointer" onClick={()=>router.push('/feed/for-you')}>
            <img alt="hipi logo"  src={withBasePath('icons/Logo_hipi.png')} />
          </div>
        </div>
      <div className="flex mt-4">
        <div className="w-1/5"><Sidebar /></div>
        <div className=" w-3/5"><StoryblokComponent blok={story.content} /></div>
        <div className=" w-1/5"></div>
      </div>
    </div>
  )
}