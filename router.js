import Router from 'next/router';

Router.pushState = (asPath, data = {}, opt = { getInitialProps: true }) => {
  window.sessionStorage.setItem(asPath.replace(/\//g, ''), JSON.stringify(data));
  Router.push(asPath, asPath, opt);
};

export default Router;
