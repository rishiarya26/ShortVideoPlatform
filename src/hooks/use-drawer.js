import React, { createContext, useContext, useState } from 'react';

import useOverLay from './use-overlay';
import useMedia, { breakpoints } from './use-media';
import Drawer from '../components/commons/drawer';
import Dialog from '../components/commons/dialog';

let DrawerContent = null;

const DrawerContext = createContext({
  close: () => {},
  show: () => {}
});

export const DrawerProvider = ({ children }) => {
  const { show: showOverLay, hide: hideOverLay } = useOverLay();
  const Comp = useMedia(breakpoints, [Dialog, Drawer, Drawer], Drawer);

  const [state, setState] = useState({
    visible: false,
    title: '',
    type: 'md'
  });

  const show = (title, content, type = 'md') => {
    DrawerContent = content;
    showOverLay();
    setState({
      visible: true,
      title,
      type
    });
  };

  const close = () => {
    DrawerContent = null;
    hideOverLay();
    setState({
      visible: false
    });
  };

  return (
    <DrawerContext.Provider value={{ show, close }}>
      {children}
      {
        <Comp
          type={state.type}
          visible={state.visible}
          close={close}
          title={state.title}
        >
          {DrawerContent && <DrawerContent />}
        </Comp>
      }
    </DrawerContext.Provider>
  );
};

export default () => useContext(DrawerContext);
