import Close from '../svgicons/close';

const Drawer = ({
  // eslint-disable-next-line no-unused-vars
  children, title, close, visible, type = 'md'
}) => (
  <div
    data-testid="drawer-container"
    className={`${visible ? 'h-3/4' : 'h-0'} 
    baseContainer z-10 fixed bottom-0 w-full overflow-hidden rounded-t-2xl bg-white
    transition-all duration-1000`}
  >
    <div className="drawer-header w-full flex-row justify-between p-4">
      <div className="drawer-title text-lg">
        {title}
        {' '}
        <div
          onClick={() => close()}
          alt="Close Icon"
          className="w-6 h-6 absolute right-8"
          data-testid="drawer-close"
          role="presentation"
        >
          <Close />
        </div>
        ght-8" >
        <Close />
      </div>
      v className="drawer-content w-full px-4 flex">
      {children}
      sfsdfsdfsdf this is sample content
    </div>
  </div>
);
export default Drawer;
