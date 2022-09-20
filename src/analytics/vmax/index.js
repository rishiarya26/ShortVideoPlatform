
let adView = '';
let vmaxTracker = '';

function eventListener(response){
  console.log(`Event name: ${this}`, response);
}

export const initVmax = () => {
  if (
    typeof window !== 'undefined' &&
    window.VMAXSDK &&
    window.VMAXSDK.Events
  ) {
    debugger;
    window.VMAXSDK.App.setSource("hipi.co.in");
    adView = VMAXSDK.CreateVmaxAdView();
    adView.setAdspotKey('d86c7d32');
    // adView.source('hipi.co.in');
    const eventTypes = VMAXSDK.Event.Type;
    for (const event in eventTypes) {
      const eventType = eventTypes[event];
      adView.setAdListener(eventType, eventListener.bind(eventType));
    }
  }
}

export const cacheAd = async () => {
  let cacheAdResponse = "";
  try {
    debugger;
    cacheAdResponse = await adView.cacheAd();
    let adId = adView?.getVmaxAd()?.getPostId();
    vmaxTracker = adView?.getVmaxAd()?.getEventTracker();
    return adId;
  } catch (err) {
    console.error(err)
  }
};

export const showAd = async () => {
  try {
    const showAdResponse = await adView.showAd({
      container: '.ad-container',
    });
    // setShowAdResponse(showAdResponse);
  } catch (err) {
    console.error(err)
  }
};

export const destroyAd = async () => {
  try {
    adView.current.destroy();
    const adDestroy = await adView.destroy();
  } catch (err) {
    setError(err);
  }
};

