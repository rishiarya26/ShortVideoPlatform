import useMedia, { breakpoints } from '../../../hooks/use-media';

const Dialog = ({
  children, title, close, visible
}) => {
// TODO use the right tailwind class
  const clsComponentWidth = useMedia(breakpoints,
    ['w-3/12', 'w-6/12', 'w-9/12'], 'w-3/12');
  return (
    <div
      className={`${clsComponentWidth || ''} ${visible ? 'visible' : 'invisible'}`}
      data-testid="dialog-container"
    >
      <div data-testid="dialog-header">
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
      <div data-testid="dialog-content">
        {children}
      </div>
    </div>
  );
};
export default Dialog;
