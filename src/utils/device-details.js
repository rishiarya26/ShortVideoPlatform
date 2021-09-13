export function getOS() {
  const userAgent = window?.navigator.userAgent || window?.navigator.vendor || window?.opera;

  if (/android/i.test(userAgent)) {
    return 'android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window?.MSStream) {
    return 'ios';
  }

  return 'unknown';
}

export function getNetworkConnection() {
  const networkInformation = window?.navigator?.connection;
  const effectiveType = networkInformation?.effectiveType;
  let networkStrength = 'low';
  if (effectiveType === '4g') {
    networkStrength = 'fast';
  } else if (effectiveType === '3g') {
    networkStrength = 'medium';
  }
  return networkStrength;
}
