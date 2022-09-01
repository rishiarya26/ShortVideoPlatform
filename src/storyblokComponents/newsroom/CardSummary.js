import Card from "./Card";
import MainPage from "./MainPage";
import styles from "./card.module.css";

export default function CardSummary({ stories, heading }) {
  return (
    <MainPage heading={heading} cards={true} featureCard={stories[0]}>
      <div className={styles.cardsContainer}>
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
