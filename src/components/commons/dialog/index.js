import useMedia, { breakpoints } from '../../../hooks/use-media';

const Dialog = ({
  children, title, close, visible
}) => {
// TODO use the right tailwind class - maybe add another route for desktop to set right defaults
  const clsComponentWidth = useMedia(breakpoints,
    ['w-3/12', 'w-6/12', 'w-9/12'], 'w-9/12');
  return (
    <div
      data-testid="dialog-container"
      className={`${clsComponentWidth} ${visible ? 'visible' : 'invisible'} fixed z-30 max-h-px500 overflow-y-auto bg-black rounded-sm`}
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
