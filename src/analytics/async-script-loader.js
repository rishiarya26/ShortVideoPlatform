
const createElement = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  return script;
};

const injectScripUrl = (scriptUrl = '', cb) => {
  if (!scriptUrl) {
    console.warn('you need to pass the script url!!!');
    return false;
  }
  console.log('sURL',scriptUrl);
  const elem = createElement();
  elem.async = true;
  elem.src = scriptUrl;
  document.body.appendChild(elem);
  const promise = new Promise(resolve => {
    elem.onload = () => {
      cb && cb();
      resolve({
        loaded: true
      });
    };
  });
  return promise;
};

const injectScriptSrc = (scriptSrc = '', cb) => {
  if (!scriptSrc) {
    console.warn('you need to pass the script source!!!');
    return false;
  }
  const elem = createElement();
  elem.text = scriptSrc;
  elem.async = true;
  document.body.appendChild(elem);
  cb && cb();
  return Promise.resolve({ loaded: true });
};

export function inject(scriptUrl, scriptSrc, cb) {
  if (!scriptUrl && !scriptSrc) {
    console.warn('please pass a script url or src');
  }
  return (scriptUrl ? injectScripUrl(scriptUrl, cb) : injectScriptSrc(scriptSrc, cb));
}
