import { FACEBOOK_PIXEL_ID } from "../../constants"

export const FB_PIXEL_ID = FACEBOOK_PIXEL_ID

export const pageview = () => {
  // window && window?.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  // window && window?.fbq('trackCustom', name, options)
}

export const defEvent = (name, options = {}) => {
  // window && window?.fbq('track', name, options)
  }
