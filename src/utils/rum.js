import { appVersion } from '../../app-version';

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  // eslint-disable-next-line arrow-body-style
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    // eslint-disable-next-line prefer-template
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export function trackUser(token) {
  if (token) {
    const { user_id: userId, userName = null, user_email: userEmail } = parseJwt(token);
    window.ineum && window.ineum('user', userId, userName, userEmail);
  }
}

export function trackAppVersion() {
  window.ineum && window.ineum('meta', 'version', appVersion);
}

export function doNotTrack() {
  window.ineum && window.ineum('ignoreUrls', [
    /\/.safeframe.googlesyndication.com+/i,
    /\/chrome-extension+/i,
    /\/.googlevideo.com+/i,
    /\/ws.+/i,
    /.*(&|\?)secret=.*/i
  ]);
}

export function trackErrors(error, info) {
  window.ineum && window.ineum('reportError', error, {
    componentStack: info.componentStack
  });
}

export function ctrackErrors(error, meta = {}) {
  window.ineum && window.ineum('reportError', error, {
    meta
  });
}

