import { useState } from 'react';

export const devices = ['desktop', 'mobile'];

export const getDeviceType = userAgent => {
  let device = 'desktop';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) device = 'mobile';
  return device;
};

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
