import { FACEBOOK_PIXEL_ID } from "../../constants"

export const FB_PIXEL_ID = FACEBOOK_PIXEL_ID

export const pageview = () => {
  if(window?.fbq){
    window && window?.fbq('track', 'PageView')
  }
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  console.log('FB',name, options);
  if(window?.fbq){
    window && window?.fbq('trackCustom', name, options)
  }
}

export const defEvent = (name, options = {}) => {
    if(window?.fbq){
      window && window?.fbq('track', name, options)
    }
  }
