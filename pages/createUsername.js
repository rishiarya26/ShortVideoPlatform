import { useRouter } from "next/router";
import { useEffect } from "react";
import UserHandle from "../src/components/access/userHandle";
import { getItem } from "../src/utils/cookie";

export default function CreateUsername(){
    const device = getItem("device-type");
    const router = useRouter();
    useEffect(() => {
        if(device === "desktop") {
            router.replace("/feed/for-you");
        }
    }, [])
    return <UserHandle />
}