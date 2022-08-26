import Card from "./Card";
import styles from "./card.module.css";
import MainPage from "../newsroom/MainPage";

export default function CardSummary({ stories, heading }) {
  return (
    <MainPage blogType="theEdit">
      <div className={styles.cardContainer}>
        {stories.length > 0 ? (
          stories?.map((post) => <Card key={post.uuid} post={post} />)
        ) : (
          <div className="flex items-center justify-center text-4xl h-full">
            No Post available
          </div>
        )}
      </div>
    </MainPage>
  );
}
