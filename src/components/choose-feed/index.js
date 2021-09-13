import { getItem } from "../../utils/cookie"
import Feed from "../feed"
import FeedIphone from "../feed-iphone"

export default function ChooseFeed() {
  let device 
try{  
device = getItem('device-info')
console.log(getItem('device-type'))
}
catch(e){
  console.log('cookie error')
}
  console.log("device",device)
  return (
    <>
    {device && device === 'ios' ? <FeedIphone/> : <Feed/> }
    </>
  );
}
