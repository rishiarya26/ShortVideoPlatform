import { getItem } from "../../utils/cookie"
import Feed from "../feed"
import FeedIphone from "../feed-iphone"

export default function ChooseFeed() {
  let device 
try{  
device = getItem('device-info')
}
catch(e){
  console.log('cookie error ')
}
  return (
    <>
    {device && device === 'ios' ? <FeedIphone/> : <Feed/> }
    </>
  );
}
