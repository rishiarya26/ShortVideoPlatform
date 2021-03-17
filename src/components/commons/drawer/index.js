const Drawer = ({
  // eslint-disable-next-line no-unused-vars
  children, title, close, visible, type = 'md'
}) => (
  <div
    data-testid="drawer-container"
    className={`${visible ? 'visible' : 'invisible '} 
    baseContainer z-10 fixed bottom-0 w-full overflow-hidden rounded-t-2xl bg-white h-0`}
  >
    <div className="drawer-header w-full flex-row justify-between p-4">
      <div className="drawer-title text-lg">
        {title}
      </div>
      <img
        data-testid="drawer-close"
        role="presentation"
        src="images/ic_close.svg"
        onClick={() => close()}
        alt="Close Icon"
        className="w-6 h-6 absolute right-8"
      />
    </div>
    <div data-testid="drawer-content w-full">
      {children}
      sfsdfsdfsdf this is sample content
    </div>
  </div>
);
export default Drawer;
