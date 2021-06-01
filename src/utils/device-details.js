export function getOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return 'android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }

  return 'unknown';
}

export function getNetworkConnection(){
  const networkInformation = navigator.connection
  const {effectiveType} = networkInformation;
  return effectiveType;
}