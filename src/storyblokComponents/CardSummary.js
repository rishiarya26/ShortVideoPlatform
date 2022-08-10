import Card from "../../src/storyblokComponents/Card";
import MainPage from "./MainPage";
 
export default function CardSummary({stories, heading}) {

  return (
    <MainPage heading={heading} cards={true} featureCard={stories[0]}>
      <div className="flex flex-row flex-wrap justify-around">
        {stories.length > 0 ? 
          (
            stories?.map((post)=><Card key={post.uuid} post={post}/>)
            ) : (
            <div className="flex items-center justify-center text-4xl h-full">No Post available</div>
          )}
      </div>
    </MainPage>
  )
}