import React, {
  createContext, useContext, useState, useRef
} from 'react';

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
  const ComponentProps = useRef({});
  const Comp = useMedia(breakpoints, [Dialog, Dialog, Drawer], Drawer);

  const [state, setState] = useState({
    visible: false,
    title: '',
    type: {
      width: 'md',
      height: 'h-1/3'
    }
  });

  const chooseDesign = selectedType => {
    let type = {
      width: 'md',
      height: 'h-1/3'
    };
    if (selectedType === 'type1') {
      type = {
        width: 'md',
        height: 'h-4/6'
      };
    }
    if (selectedType === 'type2') {
      type = {
        width: 'md',
        height: 'h-5/6'
      };
    }
    return type;
  };

  const show = (title, content, type, props) => {
    /* eslint-disable no-param-reassign */
    type = chooseDesign(type);
    ComponentProps.current = props;
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
