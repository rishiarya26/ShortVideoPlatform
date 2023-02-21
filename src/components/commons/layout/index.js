import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { inject } from "../../../analytics/async-script-loader";
import { GOOGLE_ONE_TAP } from "../../../constants";
import useDrawer from "../../../hooks/use-drawer";
import { oneTapGoogle } from "../../../utils/social/one-tap-google";
const Layout = props => {
  const [loading, setLoading] = useState(true);
  const loaded = () => {
    setLoading(false);
  }
  const { show, close, visible } = useDrawer();
  const router = useRouter();
  useEffect(() => {
    const tokens = localStorage.getItem('tokens') || null;
    if(loading) {
      setTimeout(() => {
          inject(GOOGLE_ONE_TAP , null, loaded);
        }, 7000);
      } else if(!tokens && !tokens?.shortsAuthToken && !tokens?.accessToken && !loading) {
        oneTapGoogle({open: show, close, router});
    }
  }, [loading]);
  return (
    <div>
      {/* <div className="flex justify-end">
        <div className="flex justify-evenly">
          <div
            role="presentation"
            onClick={() => Router.pushState('repos')}
          >
            Git Hub
          </div>
          <span className="px-2">|</span>
          <div
            role="presentation"
            onClick={() => Router.pushState('feed')}
          >
            Feed
          </div>
          <span className="px-2">|</span>
          <div
            role="presentation"
            onClick={() => Router.pushState('error-boundary')}
          >
            Error Boundary
          </div>
        </div>
      </div> */}
      {props.children}
    </div>
)};

export default Layout;
