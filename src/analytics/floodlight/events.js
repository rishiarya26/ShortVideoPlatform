const GDPR = 1;
const GDPR_CONSENT_755 = 1;
export const toTrackFloodlight = ({eventName, type="script"}) => {
    const eventsObj = {
        "play": {
            script: `
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_p0;cat=ugc_p0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
            `,
            noscript: `
            <iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_p0;cat=ugc_p0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>
            `
        },
        "replay": {
            script: `
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_r0;cat=ugc_r0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
            `,
            noscript: `
            <iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_r0;cat=ugc_r0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>
            `
        },
        "view_5": {
            script: `
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_v0;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
            `,
            noscript: `
            <iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_v0;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>
            `
        },
        "view_10": {
            script: `
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_v00;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
            `,
            noscript: `
            <iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_v00;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>
            `
        },
        "view_15": {
            script: `
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_v000;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
            `,
            noscript: `
            <iframe src="https://11937136.fls.doubleclick.net/activityi;src=11937136;type=ugc_v000;cat=ugc_v0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>
            `
        },
    }
    if(type === "script" && eventName) {
        const scriptTag = document.createElement('script');
        scriptTag.type="text/javascript";
        scriptTag.textContent = eventsObj[eventName]['script'];
        console.log(`FLOODLIGHT--- ${type} ${eventName} ${scriptTag} ${eventsObj[eventName]['script']}`)
        return eventsObj[eventName]['script'];
    } else if(type === "noscript" && eventName) {
        const noScriptTag = document.createElement('noscript');
        noScriptTag.textContent = eventsObj[eventName]['noscript'];
        return eventsObj[eventName]['script'];
    }
}