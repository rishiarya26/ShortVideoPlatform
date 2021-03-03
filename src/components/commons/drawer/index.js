const Drawer = ({
  // eslint-disable-next-line no-unused-vars
  children, title, close, visible, type = 'md'
}) => (
  <div
    data-testid="drawer-container"
    className={`${visible ? 'visible' : 'invisible'}`}
  >
    <div data-testid="drawer-header">
      <div data-testid="drawer-title">
        {title}
      </div>
      <img
        data-testid="drawer-close"
        role="presentation"
        src="images/ic_close.svg"
        onClick={() => close()}
        alt="Close Icon"
        width="20px"
        height="20px"
      />
    </div>
    <div data-testid="drawer-content">
      {children}
    </div>
  </div>
);
export default Drawer;
