const Dialog = ({
  children, title, close, visible
}) => {
// TODO use the right tailwind class - maybe add another route for desktop to set right defaults
  console.log('inside dialog');
  return (
    <div
      data-testid="dialog-container"
      className={`${visible ? 'block pop_in' : 'hidden pop_out'} 
      z-10 fixed rounded-t-2xl bg-white top-1/2 left-1/2 max-h-10 transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div data-testid="dialog-header flex w-full justify-between ">
        <div data-testid="dialog-title">{title}</div>
        <img
          data-testid="dialog-close"
          role="presentation"
          src="images/ic_close.svg"
          onClick={() => (close())}
          alt="Close Icon"
          width="20px"
          height="20px"
        />
      </div>
      <div data-testid="dialog-content w-full">
        {children}
      </div>
    </div>
  );
};
export default Dialog;
