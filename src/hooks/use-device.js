import { useState, useEffect } from 'react';

export const devices = ['mobile', 'desktop'];

function useDevice(types = devices, values, defaultValue) {
  const getDeviceType = () => {
    let device = 'desktop';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) device = 'mobile';
    const index = types.indexOf(device);
    return values[index] ? values[index] : defaultValue;
  };
  const [value, setValue] = useState(getDeviceType);

  useEffect(
    () => {
      setValue(getDeviceType);
    },
    []
  );
  return value;
}
export default useDevice;
