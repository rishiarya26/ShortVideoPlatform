import React, {
  createContext, useContext, useState, useRef
} from 'react';

import useOverLay from './use-overlay';
import useMedia, { breakpoints } from './use-media';
import Drawer from '../components/commons/drawer';
import Dialog from '../components/commons/dialog';
import { getItem } from '../utils/cookie';
import { playerEvents } from '../analytics/conviva/events';

let DrawerContent = null;

const DrawerContext = createContext({
  close: () => {},
  show: () => {}
});

export const DrawerProvider = ({ children }) => {
  const { show: showOverLay, hide: hideOverLay } = useOverLay();
  const ComponentProps = useRef({});
  const isMac = getItem('device-mac') === "yes" ? Dialog : Drawer;
  const Comp = useMedia(breakpoints, [Dialog, isMac, isMac], Drawer);

  const [state, setState] = useState({
    visible: false,
    title: '',
    type: 'small',
  });

  const show = (title, content, type, props) => {
    /* eslint-disable no-param-reassign */
    ComponentProps.current = props;
    DrawerContent = content;
    showOverLay(props?.hideOverLay ? close: null);
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
    playerEvents('waitEnded');
  };


  return (
    <DrawerContext.Provider value={{ show, close }}>
      {children}
      <Comp
        type={state.type}
        visible={state.visible}
        close={close}
        title={state.title}
      >
        {DrawerContent && <DrawerContent {...ComponentProps.current} />}
      </Comp>
    </DrawerContext.Provider>
  );
};

export default () => useContext(DrawerContext);
