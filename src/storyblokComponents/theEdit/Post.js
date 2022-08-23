import { StoryblokComponent } from "@storyblok/react";
import { generateUUID } from "../../utils/app";
import MainPage from "../newsroom/MainPage";
import styles from "./post.module.css";

export default function Post({ story }) {
  return (
    <MainPage blogType="theedit">
      <div className={styles.parentContainer}>
        {story && story.length > 0 ? (
          story.map((item) => {
            const uuid = generateUUID(false);
            return (
              <div key={uuid}>
                <div id={item.name}>
                  <StoryblokComponent
                    blok={item.content}
                    date={item?.created_at}
                    slug={item?.slug}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div>Data not available</div>
        )}
      </div>
    </MainPage>
  );
}
