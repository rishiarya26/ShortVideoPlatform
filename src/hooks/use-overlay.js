import React, {
  createContext, useContext, useState
} from 'react';

import OverLay from '../components/commons/overlay';
import useDrawer from './use-drawer';

const OverLayContext = createContext({
  hide: () => { },
  show: () => { }
});

export const OverLayProvider = ({ children }) => {
  const [state, setState] = useState({
    visible: false,
    title: '',
    compClose : null
  });

  const show = ({compClose= null }) => {
    setState({
      visible: true,
      compClose: compClose
    });
  };

  const hide = () => {
    setState({
      visible: false
    });
  };

  return (
    <OverLayContext.Provider value={{ show, hide }}>
      {children}
      <OverLay compClose={state.compClose} visible={state.visible} />
    </OverLayContext.Provider>
  );
};

export default () => useContext(OverLayContext);
