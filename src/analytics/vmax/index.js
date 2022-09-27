
let adView;
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
    window.VMAXSDK.App.setSource("hipi.co.in");
  }
}

export const initAdView = (id=0) => {
  if (
    typeof window !== 'undefined' &&
    window.VMAXSDK &&
    window.VMAXSDK.Events
  ) {
    adView = VMAXSDK.CreateVmaxAdView();
    adView.setAdspotKey('ffb8745f');
    const eventTypes = VMAXSDK.Event.Type;
    for (const event in eventTypes) {
      const eventType = eventTypes[event];
      adView.setAdListener(eventType, eventListener.bind(eventType));
    }
  }
}

export const cacheAd = async (id=0) => {
  let cacheAdResponse = "";
  try {
    debugger;
    cacheAdResponse = await adView.cacheAd();
    let adId = adView?.getVmaxAd()?.getPostId();
    //let adData = adView?.getVmaxAd();
    vmaxTracker = adView?.getVmaxAd()?.getEventTracker();
    return adId;
  } catch (err) {
    initVmax()
    cacheAd(id);
    console.error(err)
  }
};

export const showAd = async () => {
  try {
    const showAdResponse = await adView.showAd({
      container: '#hello',
    });
    debugger;
    console.log(showAdResponse);
    // setShowAdResponse(showAdResponse);
  } catch (err) {
    console.error(err)
  }
};

export const destroyAd = async () => {
  try {
    const adDestroy = await adView.destroy();
  } catch (err) {
    console.erroer(err);
  }
};

