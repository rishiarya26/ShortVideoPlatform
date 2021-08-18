import Close from '../svgicons/close-black';

const Drawer = ({
  // eslint-disable-next-line no-unused-vars
  children, title, close, visible, type
}) => {
  const design = {
    extraSmall:{
      height: 'h-1/4'
    },
    small: {
      height: 'h-2/5'
    },
    medium: {
      height: 'h-4/5'
    },
    big: {
      height: 'h-5/6'
    }
  };

  return (
    <div
      data-testid="drawer-container"
      className={`${visible ? design[type]?.height : 'h-0'} 
      baseContainer z-10 fixed bottom-0 w-full overflow-hidden rounded-t-2xl bg-white
      transition-all duration-300
      motion-reduce:transition-none motion-reduce:transform-none
    `}
    >
      <div className="drawer-header w-full flex-row justify-between p-4">
        <div className="drawer-title text-sm font-medium text-center">
          {title}
          {' '}
          <div
            onClick={() => close()}
            alt="Close Icon"
            className="w-6 h-6 absolute right-3 top-3"
            data-testid="drawer-close"
            role="presentation"
          >
            <Close />
          </div>
        </div>
      </div>
      <div className="w-full h-full px-4 flex overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
export default Drawer;
