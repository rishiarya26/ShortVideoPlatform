import React, {
  createContext, useContext, useRef, useState
} from 'react';
import Dialog from '../components/commons/dialog';
import useOverLay from './use-overlay';

let DialogContent = null;

const DialogContext = createContext({
  close: () => {},
  show: () => {}
});

export const DialogProvider = ({ children }) => {
  const [state, setState] = useState({ visible: false, message: '' });
  const { show: showOverLay, hide: hideOverLay } = useOverLay();
  const ComponentProps = useRef({});

  const show = (title, content, props) => {
    ComponentProps.current = props;
    showOverLay();
    DialogContent = content;
    setState({
      title,
      visible: true
    });
  };

  const close = () => {
    hideOverLay();
    DialogContent = null;
    setState({
      title: '',
      visible: false
    });
  };

  return (
    <DialogContext.Provider value={{ show, close }}>
      {children}
      <Dialog visible={state.visible} close={close} title={state.title}>
        {DialogContent && <DialogContent {...ComponentProps.current} />}
      </Dialog>
    </DialogContext.Provider>
  );
};

export default () => useContext(DialogContext);
