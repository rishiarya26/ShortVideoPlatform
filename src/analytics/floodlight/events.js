const GDPR = 1;
const GDPR_CONSENT_755 = 1;
export const toTrackFloodlight = ({eventName, type="script"}) => {
    const eventsObj = {
        "play": {
            script: `
            gtag('event', 'conversion', {
                'allow_custom_scripts': true,
                'send_to': 'DC-11937136/ugc_p0/ugc_p0+unique'
              });`,
            noscript: `
            <img src="https://ad.doubleclick.net/ddm/activity/src=11937136;type=ugc_p0;cat=ugc_p0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" alt=""/>
            `
        },
        "replay": {
            script: `
            gtag('event', 'conversion', {
                'allow_custom_scripts': true,
                'send_to': 'DC-11937136/ugc_r0/ugc_r0+unique'
              });`,
            noscript: `
            <img src="https://ad.doubleclick.net/ddm/activity/src=11937136;type=ugc_r0;cat=ugc_r0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" alt=""/>
            `
        },
        "view_5": {
            script: `
            gtag('event', 'conversion', {
                'allow_custom_scripts': true,
                'send_to': 'DC-11937136/ugc_v0/ugc_v0+unique'
              });`,
            noscript: `
            <img src="https://ad.doubleclick.net/ddm/activity/src=11937136;type=ugc_v0;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" alt=""/>
            `
        },
        "view_10": {
            script: `
            gtag('event', 'conversion', {
                'allow_custom_scripts': true,
                'send_to': 'DC-11937136/ugc_v00/ugc_v0+unique'
              });`,
            noscript: `
            <img src="https://ad.doubleclick.net/ddm/activity/src=11937136;type=ugc_v00;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" alt=""/>
            `
        },
        "view_15": {
            script: `
            gtag('event', 'conversion', {
                'allow_custom_scripts': true,
                'send_to': 'DC-11937136/ugc_v000/ugc_v0+unique'
              });`,
            noscript: `
            <img src="https://ad.doubleclick.net/ddm/activity/src=11937136;type=ugc_v000;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" alt=""/>
            `
        },
    }
    if(type === "script" && eventName) {
        const scriptTag = document.createElement('script');
        scriptTag.type="text/javascript";
        scriptTag.textContent = eventsObj[eventName]['script'];
        console.log(`FLOODLIGHT--- ${eventName}`)
        return eventsObj[eventName]['script'];
    } else if(type === "noscript" && eventName) {
        const noScriptTag = document.createElement('noscript');
        noScriptTag.textContent = eventsObj[eventName]['noscript'];
        return eventsObj[eventName]['script'];
    }
}