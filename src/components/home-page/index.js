import { useRouter } from "next/router";
import { getItem } from "../../utils/cookie";
import Home from "../home"

const HomePage =()=>{
const router = useRouter();
const device = getItem('device-type');

if(device === 'mobile'){
    router.push('feed/for-you')
    return null;
}

return(
    <Home/>
)
}

export default HomePage;