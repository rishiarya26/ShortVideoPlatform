// idea is to keep adding other browser storage mechanisms here having the same api as get, set remove.

export const localStorage = {
  set(key, val) {
    if (!key || !val) return false;
    return window.localStorage.setItem(key, JSON.stringify(val));
  },
  remove(key = '') {
    return window.localStorage.removeItem(key);
  },
  get(key) {
    if (!key) return false;
    let data = window.localStorage.getItem(key);
    if (!data) {
      return null;
    }
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = null;
    }
    return data;
  }
};

export const sessionStorage = {
  set(key, val) {
    if (!key || !val) return false;
    return window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  remove(key = '') {
    return window.sessionStorage.removeItem(key);
  },
  get(key) {
    if (!key) return false;
    let data = window.sessionStorage.getItem(key);
    if (!data) {
      return null;
    }
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = null;
    }
    return data;
  }
};

