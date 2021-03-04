# hipi pwa
Web application for hipi content.

## About
hipi PWA is based on [next.js](https://nextjs.org/) at its core which is minimalistic framework to build modern universal webapps.

## Features
- uses only functional react.
- has ability to [SSR / SSG / ISR](https://www.jackherrington.com/csr-ssr-and-ssg-on-nextjs/).
- no custom solution for state management.
- works on [nodejs](https://nodejs.org/en/) 10 and above.
- stay update with latest nextjs releases and hence latest versions of [react](https://reactjs.org/) / [webpack](https://webpack.js.org/).
- uses [airbnb eslint rules](https://github.com/airbnb/javascript) for react developement.
- has env setup for [jest](https://jestjs.io/) and [react testing library](https://testing-library.com/docs/react-testing-library/intro/) for unit testing.
- a next.config with some basic setup which helps ship the browser specific bundles. (module / nomodule approach)
- scripts for dev / precommits / coverage etc. uses [husky](https://www.npmjs.com/package/husky)
- generates source maps.
- uses [source map explorer](https://www.npmjs.com/package/source-map-explorer) to generate bundle size reports.
- takes care of all necessary meta tags for web / fb / twitter.
- a basic manifest.json file.
- a fetch based isomorphic network lib.
- an HOC which can be used to handle component loading and error states quite neatly.
- generates unit test reports and code coverage reports.
- uses css modules and [tailwind](https://tailwindcss.com/) as a styling solution.
- uses [lhci](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/getting-started.md) for page  perf analysis. (WIP)
- has [budget.json](https://github.com/GoogleChrome/budget.json) and lighthouse config to run performance checks locally.
- has ability to push state via routes while using the router.pushState - refer Notes for more
- [error boundaries](https://github.com/bvaughn/react-error-boundary) for functional components
- vscode suggested extensions.

## A lot more is on the way!!!!

## Getting started

```
git clone https://anky-agarwal@bitbucket.org/anky-agarwal/pwa.git
cd pwa
npm i
npm run dev
```

This will start a local webserver with http2 and gzip to mimic real web server
```
  npm run serve
```

## Example

The example in this repo lists few github repos and there details in 2 different routes. We are following the nextjs routing way of defining files / folders in pages folder. This example shows a static route and a dynamic route.
The example setup enables us to pre render stuff and create a static bundle with npm run export (a route like repos) where the page structure is already known and probably even data is available before time.


## Localisation Goals
- URLs should be parameterized with a language code (i.e. locale subpaths).
- The app needs to be able to read the locale from the URL (during SSR and client-side navigation).
- The URL language parameter must be kept in sync with the app’s internal state.
- It must be possible to change the language.
- The app should be able to set a language when it is accessed for the first time at a root (url-agnostic) URL (preferably by performing some sort of auto-detection with a fallback to the default setting).
- The language selected by a user should be saved as their preference for future sessions.
- The contents of the website/app should be translated/localized based on the current language setting.
- The app’s metadata should respect the selected language setting (for SEO purposes).

## Approach

multi lingual support is very different when its via CSR / SSR / SSG and we might need to solve for all cases but our priority is SSG since we believe most of the webapp cases in hipi should be addressed with SSG.

via SSG 
- generate multiple versions of pages for each language at build time and all pages to have language as base path in the route
  example - hipi.com/en/recharge,  hipi.com/hi/recharge
  this is so that language specific pages are directly discoverable and shareable

- this is done by adding a base path during running the build script

Following script does the magic

```
 npm run multilingual-build
```

 this creates
 ```
 out/
     /hi
     /bn
     /en
```     

A user journey would look like this
- user lands on the app for the first time (any page)
- app checks if language context exists in the path, if not then checks user pref (local storage), if not checks browser locale. Hence a decision is made for the user as to what is the current language. This should also go as an input to apis
- if the current app env and the selected language from step 2 doesn't match user gets redirected to the respective context
example :
user lands on hipi.com but has the browser locale set to hindi - user will be taken to hipi.com/hi page OR
user lands on hipi.com but has the user pref set to hindi - user will be taken to hipi.com/hi page

- user can switch the language at any point from the app - this sets a local pref and redirects to language context page

## Notes

* for lhci to run locally please do the following
  ```
  npm i -g lhci/ci
  ```

* state sharing via routes
we donot use redux, hence to share data between pages we use route states - but unfortunately nextjs does not support route state i guess this is because they have an isomorphic router they allow data sharing only via query params, now to support route state we have extended the next router to have a method pushState which saves the data to be shared in session storage. And leveraging the getIntialProps lifecycle hook we read the data from storage and pass it on to the respective page (via withRouteState) but this doesn't seem to work by adding a basePath (i think this is because the basepath is not physically present in the pages directory), hence added a hook for to solve for that.
