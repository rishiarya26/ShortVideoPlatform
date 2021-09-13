/* eslint-disable max-len */
import { useState } from 'react';

export const devices = ['desktop', 'mobile'];

export const getDeviceType = userAgent => ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) ? 'mobile' : 'desktop');

export const getDeviceInfo = userAgent => ((/Android|android/i.test(userAgent)) ? 'android' : (/iphone|iPhone|iPad/i.test(userAgent)) ? 'ios' : 'android')

function useDevice(types = devices, values, defaultValue) {
  const getVariant = () => {
    const device = getDeviceType(navigator?.userAgent);
    const index = types.indexOf(device);
    return values[index] ? values[index] : defaultValue;
  };
  const [varient] = useState(getVariant);

  return varient;
}
export default useDevice;
