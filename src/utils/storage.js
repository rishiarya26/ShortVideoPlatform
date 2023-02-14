// idea is to keep adding other browser storage mechanisms here having the same api as get, set remove.

export const localStorage = {
  set(key, val) {
    if (!key || !val) return false;
    const value = typeof window !== "undefined" ? window?.localStorage?.setItem(key, JSON.stringify(val)) : null;
    return value
  },
  remove(key = '') {
    const value = typeof window !== "undefined" ? window?.localStorage?.removeItem(key) : null;
    return value;
  },
  get(key) {
    if (!key) return false;
    let data = typeof window !== "undefined" && window?.localStorage?.getItem(key);
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

export const objectEntriesPoly = (entries) => {
  if (!entries || !entries[Symbol.iterator]) { throw new Error('Object.fromEntries() requires a single iterable argument'); }
  let obj = {};
  for (let [key, value] of entries) {
    obj[key] = value;
  }
  return obj;
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
  },
  clear(){
    return window.sessionStorage.clear();
  }
};

