import { createContext, useContext } from 'react';
import canUseDom from 'can-use-dom';

const RouteStateContext = createContext({
  get: () => { }
});

export const RouteStateProvider = ({ children }) => {
  const get = () => {
    if (!canUseDom) {
      return {};
    }
    const path = window.location.pathname;
    const routeStateKey = path.replace(/\//g, '');
    const routeState = JSON.parse(window.sessionStorage.getItem(routeStateKey) || {});
    window.sessionStorage.removeItem(routeStateKey);
    return routeState || {};
  };

  return (
    <RouteStateContext.Provider value={{ get }}>
      {children}
    </RouteStateContext.Provider>
  );
};

export default () => useContext(RouteStateContext);

/** example
 * Router.pushState('/user, {name : ankit, age: 31})
 * This will work on any component
 * pages/user.js ----
 * const User = props => {
 *  const { get } = useRouteState()
 *  const {name, age} = get()
 * return (
 *  <div>{name}</div>
 *  <div>{age}</div>
 * )
 * }
 * export default withRouteState(User)
 */
